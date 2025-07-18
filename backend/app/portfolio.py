from flask import Blueprint, request, jsonify, current_app
from . import db
from .models import PortfolioItem
from sqlalchemy.exc import SQLAlchemyError
import os

portfolio_bp = Blueprint('portfolio', __name__)

@portfolio_bp.route('/', methods=['GET'])
def get_portfolio():
    try:
        items = PortfolioItem.query.order_by(PortfolioItem.created_at.desc()).all()
        return jsonify([
            {
                'id': item.id,
                'title': item.title,
                'description': item.description,
                'image_url': item.image_url,
                'link': item.link,
                'created_at': item.created_at.isoformat()
            } for item in items
        ])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error.'}), 500

@portfolio_bp.route('/', methods=['POST'])
def add_portfolio():
    api_key = request.headers.get('x-api-key')
    admin_api_key = os.getenv('ADMIN_API_KEY')
    if api_key != admin_api_key:
        return jsonify({'error': 'Forbidden: Invalid API key'}), 403
    data = request.get_json()
    if not data.get('title') or not data.get('description') or not data.get('image_url') or not data.get('link'):
        return jsonify({'error': 'All fields are required.'}), 400
    try:
        item = PortfolioItem(
            title=data.get('title'),
            description=data.get('description'),
            image_url=data.get('image_url'),
            link=data.get('link')
        )
        db.session.add(item)
        db.session.commit()
        return jsonify({'message': 'Portfolio item added', 'id': item.id}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add item.'}), 500

@portfolio_bp.route('/<int:item_id>', methods=['PUT'])
def edit_portfolio(item_id):
    item = PortfolioItem.query.get_or_404(item_id)
    data = request.get_json()
    try:
        item.title = data.get('title', item.title)
        item.description = data.get('description', item.description)
        item.image_url = data.get('image_url', item.image_url)
        item.link = data.get('link', item.link)
        db.session.commit()
        return jsonify({'message': 'Portfolio item updated'})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update item.'}), 500

@portfolio_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_portfolio(item_id):
    item = PortfolioItem.query.get_or_404(item_id)
    try:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Portfolio item deleted'})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete item.'}), 500 