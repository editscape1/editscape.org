from flask import Blueprint, request, jsonify, current_app
from app.extensions import db, mail
from app.models import ContactMessage
from flask_mail import Message
from datetime import datetime
import logging
import re

contact_bp = Blueprint('contact', __name__)
EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"

def is_valid_email(email):
    return re.match(EMAIL_REGEX, email)

@contact_bp.route('/', methods=['POST'])
def submit_contact():
    """
    Handle POST requests to /api/contact/
    - Validates input
    - Saves contact message to the database
    - Sends notification email to admin
    """
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # === Input Validation ===
    if not name or not email or not message:
        return jsonify({'error': 'Name, email, and message are required.'}), 400

    if not is_valid_email(email):
        return jsonify({'error': 'Invalid email address.'}), 400

    try:
        # === Save to Database ===
        contact = ContactMessage(name=name, email=email, message=message)
        db.session.add(contact)
        db.session.commit()
        logging.info(f"✅ Saved contact message from {email} to database.")

        # === Send Notification Email ===
        admin_email = current_app.config.get('MAIL_USERNAME') or current_app.config.get('MAIL_DEFAULT_SENDER')
        if admin_email:
            msg = Message(
                subject=f"📬 New Contact Message from {name}",
                recipients=[admin_email],
                body=f"Name: {name}\nEmail: {email}\nMessage:\n{message}\n\nTime: {contact.timestamp}"
            )
            mail.send(msg)
            logging.info(f"📧 Notification email sent to {admin_email}")
        else:
            logging.warning("⚠️ MAIL_USERNAME or MAIL_DEFAULT_SENDER not set; email not sent.")

        return jsonify({'message': '✅ Message received. Thank you!'}), 201

    except Exception as e:
        db.session.rollback()
        logging.error(f"❌ Error processing contact message: {e}")
        return jsonify({'error': 'Something went wrong. Please try again later.'}), 500
