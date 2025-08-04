from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import PortfolioItem

portfolio_bp = Blueprint("portfolio", __name__)

# === GET: Fetch All Portfolio Items ===
@portfolio_bp.route("/portfolio", methods=["GET"])
def get_portfolio_items():
    try:
        items = PortfolioItem.query.order_by(PortfolioItem.id.asc()).all()
        data = [
            {
                "id": item.id,
                "title": item.title,
                "description": item.description,
                "media_url": item.media_url,
            }
            for item in items
        ]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === POST: Add New Portfolio Item ===
@portfolio_bp.route("/portfolio", methods=["POST"])
def add_portfolio_item():
    try:
        data = request.get_json()
        title = data.get("title", "").strip()
        description = data.get("description", "").strip()
        media_url = data.get("media_url", "").strip()

        if not title or not description or not media_url:
            return jsonify({"error": "All fields are required."}), 400

        new_item = PortfolioItem(
            title=title,
            description=description,
            media_url=media_url
        )
        db.session.add(new_item)
        db.session.commit()

        return jsonify({"message": "✅ Portfolio item added successfully."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"❌ Failed to add item: {e}"}), 500

# === DELETE: Remove Portfolio Item ===
@portfolio_bp.route("/portfolio/<int:item_id>", methods=["DELETE"])
def delete_portfolio_item(item_id):
    try:
        item = PortfolioItem.query.get(item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404

        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "🗑️ Portfolio item deleted."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"❌ Failed to delete item: {e}"}), 500
