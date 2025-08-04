import os
from flask import Flask, send_from_directory, jsonify
from flask_migrate import Migrate, upgrade
from flask_cors import CORS
from dotenv import load_dotenv

from app.extensions import db, mail

# === Load environment variables ===
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# === Flask Migrate Setup ===
migrate = Migrate()

def create_app():
    app = Flask(
        __name__,
        static_folder="public",
        static_url_path="/"
    )

    # === Configuration ===
    app.config.from_mapping(
        SECRET_KEY=os.getenv("SECRET_KEY", "changeme"),
        SQLALCHEMY_DATABASE_URI=os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///site.db"),
        SQLALCHEMY_TRACK_MODIFICATIONS=os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", "False") == "True",
        MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
        MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
        MAIL_USE_TLS=os.getenv("MAIL_USE_TLS", "True") == "True",
        MAIL_USERNAME=os.getenv("MAIL_USERNAME", ""),
        MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", ""),
        MAIL_DEFAULT_SENDER=os.getenv("MAIL_DEFAULT_SENDER", ""),
    )

    print("✅ ENV FILE FOUND?", os.getenv("SECRET_KEY") is not None)
    print("📧 MAIL_DEFAULT_SENDER:", app.config["MAIL_DEFAULT_SENDER"])
    print("🗃️ SQLALCHEMY_DATABASE_URI:", app.config["SQLALCHEMY_DATABASE_URI"])

    # === Initialize extensions ===
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    # === Import models ===
    from app.models import PortfolioItem, ContactMessage

    # === Register Blueprints ===
    from app.portfolio.routes import portfolio_bp
    from app.contact import contact_bp
    from app.admin import admin_bp

    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(admin_bp)  # Admin blueprint with no prefix

    # ❌ Removed: setup_admin(app)

    # === CORS Setup ===
    FRONTEND_ORIGIN = os.environ.get("FRONTEND_ORIGIN", "https://editscape-org.vercel.app")

    CORS(app, resources={
        r"/api/*": {"origins": [FRONTEND_ORIGIN]}
    }, supports_credentials=True)

    @app.after_request
    def after_request(response):
        response.headers["Access-Control-Allow-Origin"] = FRONTEND_ORIGIN
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization,X-Requested-With,x-api-key"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
        return response

    # === Serve React Frontend ===
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        full_path = os.path.join(app.static_folder, path)
        if path and os.path.exists(full_path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    # === Health Check ===
    @app.route("/test")
    def test():
        return jsonify({"message": "Backend is working!"})

    # === Run Migrations on Render ===
    @app.route('/run-migrations', methods=['GET'])
    def run_migrations():
        try:
            upgrade()
            return jsonify({"message": "✅ Migrations applied successfully!"}), 200
        except Exception as e:
            return jsonify({"error": f"❌ Failed to apply migrations: {str(e)}"}), 500

    return app
