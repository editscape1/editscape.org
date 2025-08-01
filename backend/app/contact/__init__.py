from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
from datetime import datetime
from app.extensions import db, mail
from app.models import ContactMessage
import logging
import re

# === Blueprint Setup ===
contact_bp = Blueprint("contact", __name__)
EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"

# === Email Validation ===
def is_valid_email(email: str) -> bool:
    return bool(re.match(EMAIL_REGEX, email))

# === Route: Submit Contact Message ===
@contact_bp.route("/", methods=["POST"])
def submit_contact():
    """
    POST /api/contact/
    - Validates input fields
    - Saves message to DB
    - Sends notification email to admin
    """
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    # === Input Validation ===
    if not name or not email or not message:
        return jsonify({"error": "Name, email, and message are required."}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email address."}), 400

    try:
        # === Save to Database ===
        contact = ContactMessage(name=name, email=email, message=message)
        db.session.add(contact)
        db.session.commit()
        logging.info(f"✅ Saved contact message from {email}")

        # === Send Notification Email ===
        admin_email = current_app.config.get("MAIL_USERNAME") or current_app.config.get("MAIL_DEFAULT_SENDER")
        if admin_email:
            msg = Message(
                subject=f"📬 New Contact Message from {name}",
                recipients=[admin_email],
                body=(
                    f"Name: {name}\n"
                    f"Email: {email}\n"
                    f"Message:\n{message}\n\n"
                    f"Time: {contact.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
                ),
            )
            mail.send(msg)
            logging.info(f"📧 Email sent to {admin_email}")
        else:
            logging.warning("⚠️ MAIL_USERNAME or MAIL_DEFAULT_SENDER not configured.")

        return jsonify({"message": "✅ Message received. Thank you!"}), 201

    except Exception as e:
        db.session.rollback()
        logging.error(f"❌ Error saving contact message: {e}")
        return jsonify({"error": "Something went wrong. Please try again later."}), 500
