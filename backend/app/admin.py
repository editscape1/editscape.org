import os
from flask import Blueprint, request, render_template_string, redirect, url_for, session, jsonify
from .models import ContactMessage, PortfolioItem
from . import db

admin_bp = Blueprint('admin', __name__)

print("Loaded admin password:", os.getenv('ADMIN_PASSWORD'))

# --- Templates ---
ADMIN_TEMPLATE = '''...'''  # [your full admin HTML template]
LOGIN_TEMPLATE = '''...'''  # [your full login HTML template]

# --- HTML Admin Panel Routes ---
@admin_bp.route('/admin', methods=['GET', 'POST'])
def admin_login():
    if session.get('admin_logged_in'):
        messages = ContactMessage.query.order_by(ContactMessage.timestamp.asc()).all()
        portfolio = PortfolioItem.query.order_by(PortfolioItem.id.asc()).all()
        return render_template_string(ADMIN_TEMPLATE, messages=messages, portfolio=portfolio)
    error = None
    if request.method == 'POST':
        password = request.form.get('password')
        if password == os.getenv('ADMIN_PASSWORD'):
            session['admin_logged_in'] = True
            return redirect(url_for('admin.admin_login'))
        else:
            error = 'Incorrect password.'
    return render_template_string(LOGIN_TEMPLATE, error=error)

@admin_bp.route('/admin/logout')
def logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin.admin_login'))

@admin_bp.route('/admin/responded/<int:message_id>', methods=['POST'])
def toggle_responded(message_id):
    msg = ContactMessage.query.get_or_404(message_id)
    msg.responded = not msg.responded
    db.session.commit()
    return redirect(url_for('admin.admin_login'))

@admin_bp.route('/admin/portfolio/upload', methods=['POST'])
def upload_portfolio():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin.admin_login'))
    title = request.form.get('title')
    description = request.form.get('description')
    media_url = request.form.get('media_url')
    new_item = PortfolioItem(title=title, description=description, media_url=media_url)
    db.session.add(new_item)
    db.session.commit()
    return redirect(url_for('admin.admin_login'))

@admin_bp.route('/admin/portfolio/delete/<int:item_id>')
def delete_portfolio(item_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin.admin_login'))
    item = PortfolioItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return redirect(url_for('admin.admin_login'))

# --- JSON API Endpoints for React Admin Panel ---
@admin_bp.route('/api/admin/portfolio', methods=['GET'])
def get_portfolio_items_admin():
    items = PortfolioItem.query.order_by(PortfolioItem.id.asc()).all()
    return jsonify([item.to_dict() for item in items])

@admin_bp.route('/api/admin/portfolio', methods=['POST'])
def add_portfolio_item():
    data = request.get_json()
    new_item = PortfolioItem(
        title=data.get('title'),
        description=data.get('description'),
        media_type=data.get('media_type'),
        cloudinary_url=data.get('cloudinary_url'),
        thumbnail_url=data.get('thumbnail_url')
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201

@admin_bp.route('/api/admin/portfolio/<int:item_id>', methods=['DELETE'])
def delete_portfolio_item(item_id):
    item = PortfolioItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted successfully'})
