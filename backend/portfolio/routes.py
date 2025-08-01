from flask import Blueprint, jsonify
from backend.read_sheet import get_active_portfolio_items  # ✅ Correct absolute import

portfolio_bp = Blueprint("portfolio", __name__)

@portfolio_bp.route("/", methods=["GET"])
def get_portfolio_items():
    try:
        data = get_active_portfolio_items()
        return jsonify({"success": True, "data": data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
