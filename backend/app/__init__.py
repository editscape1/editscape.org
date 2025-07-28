import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
from .utils import setup_logging

# Extensions
mail = Mail()
db = SQLAlchemy()
migrate = Migrate()


def create_app():
    load_dotenv()
    setup_logging()
    app = Flask(
        __name__,
        static_folder="public",
        static_url_path="/"
    )
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

    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})

    from .portfolio import portfolio_bp
    from .contact import contact_bp
    from .admin import admin_bp
    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(admin_bp)

    # Serve static frontend
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        print(f"serve_frontend called with path: {path}")
        print("app.static_folder:", app.static_folder)
        if path.startswith("api/"):
            return ("Not Found", 404)
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            print("Serving static file:", os.path.join(app.static_folder, path))
            return send_from_directory(app.static_folder, path)
        index_path = os.path.join(app.static_folder, "index.html")
        print("Trying to serve index.html from:", index_path)
        print("Exists?", os.path.exists(index_path))
        return send_from_directory(app.static_folder, "index.html")

    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(rule)

    # Temporary test route
    @app.route("/test")
    def test():
        return "Backend is working!"
        
    return app 
