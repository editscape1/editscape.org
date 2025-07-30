import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
from .utils import setup_logging

# === Define extensions ===
mail = Mail()
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    # === Load environment variables and logging ===
    load_dotenv()
    setup_logging()

    # === Create Flask app ===
    app = Flask(
        __name__,
        static_folder="public",
        static_url_path="/"
    )

    # === App Configuration ===
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
        CORS_ORIGINS=os.getenv("CORS_ORIGINS", "*")
    )

    # === Initialize extensions ===
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})

    # === Import models AFTER db.init_app ===
    from .models import PortfolioItem, ContactMessage

    # === Register Blueprints ===
    from .portfolio import portfolio_bp
    from .contact import contact_bp
    from .admin import admin_bp
    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(admin_bp)

    # === Serve frontend ===
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        if path.startswith("api/"):
            return ("Not Found", 404)
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    # === Health check route ===
    @app.route("/test")
    def test():
        return "Backend is working!"

    # === Route to manually trigger migrations (for Render) ===
    @app.route('/run-migrations', methods=['GET'])
    def run_migrations():
        try:
            upgrade()
            return {"message": "Database migration successful."}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    # === Create tables (only for SQLite or local testing) ===
    with app.app_context():
        db.create_all()

    return app
