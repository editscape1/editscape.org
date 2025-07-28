from . import db
from datetime import datetime

class PortfolioItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)

    # Fields for media content
    image_url = db.Column(db.String(255), nullable=True)
    media_url = db.Column(db.String(255), nullable=True)
    media_type = db.Column(db.String(10), nullable=True)  # 'image' or 'video'
    thumbnail_url = db.Column(db.String(255), nullable=True)

    # Link and timestamp
    link = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
