from flask_cors import cross_origin
from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import PortfolioItem
from sqlalchemy.exc import SQLAlchemyError
import os
import traceback

portfolio_bp = Blueprint('portfolio', __name__)

# === GET All Portfolio Items ===
@portfolio_bp.route('/', methods=['GET'])
@cross_origin(
    origins=["https://editscape-org.vercel.app", "http://localhost:3000"],
    supports_credentials=True
)
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
                'created_at': item.created_at.isoformat() if item.created_at else None
            } for item in items
        ])
    except SQLAlchemyError as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# === POST (Add Item) ===
@portfolio_bp.route('/', methods=['POST'])
@cross_origin(
    origins=["https://editscape-org.vercel.app", "http://localhost:3000"],
    supports_credentials=True,
    methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "x-api-key"]
)
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
            title=data['title'],
            description=data['description'],
            image_url=data['image_url'],
            link=data['link']
        )
        db.session.add(item)
        db.session.commit()
        return jsonify({'message': 'Portfolio item added', 'id': item.id}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        traceback.print_exc()
        return jsonify({'error': 'Failed to add item.'}), 500

# === PUT (Edit Item) ===
@portfolio_bp.route('/<int:item_id>', methods=['PUT'])
@cross_origin(
    origins=["https://editscape-org.vercel.app", "http://localhost:3000"],
    supports_credentials=True,
    methods=["PUT", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "x-api-key"]
)
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
        traceback.print_exc()
        return jsonify({'error': 'Failed to update item.'}), 500

# === DELETE (Remove Item) ===
@portfolio_bp.route('/<int:item_id>', methods=['DELETE'])
@cross_origin(
    origins=["https://editscape-org.vercel.app", "http://localhost:3000"],
    supports_credentials=True,
    methods=["DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "x-api-key"]
)
def delete_portfolio(item_id):
    item = PortfolioItem.query.get_or_404(item_id)
    try:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Portfolio item deleted'})
    except SQLAlchemyError as e:
        db.session.rollback()
        traceback.print_exc()
        return jsonify({'error': 'Failed to delete item.'}), 500
