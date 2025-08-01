import os
from flask import Flask, send_from_directory
from flask_migrate import Migrate, upgrade
from flask_cors import CORS
from dotenv import load_dotenv

from app.utils import setup_logging
from app.extensions import db, mail

# === Load environment variables from .env ===
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# === Flask Migrate Setup ===
migrate = Migrate()

def create_app():
    setup_logging()

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

    # === Import models (for migrations and admin usage) ===
    from app.models import PortfolioItem, ContactMessage

    # === Register Blueprints ===
    from app.portfolio import portfolio_bp
    from app.contact import contact_bp
    from app.admin import admin_bp

    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(admin_bp)

    # === CORS Setup ===
    CORS(app, supports_credentials=True, resources={
        r"/api/*": {
            "origins": [
                "https://editscape-org.vercel.app",
                "http://localhost:3000"
            ],
            "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
    })

    # === Serve React Frontend ===
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        full_path = os.path.join(app.static_folder, path)
        if path and os.path.exists(full_path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    # === Health check ===
    @app.route("/test")
    def test():
        return "Backend is working!"

    # === Run migrations endpoint (for Render) ===
    @app.route('/run-migrations', methods=['GET'])
    def run_migrations():
        try:
            upgrade()
            return {"message": "Database migration successful."}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    # === Create DB tables in local development ===
    if app.config["SQLALCHEMY_DATABASE_URI"].startswith("sqlite"):
        with app.app_context():
            db.create_all()

    return app
