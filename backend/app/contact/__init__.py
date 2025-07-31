from flask import Blueprint, request, jsonify, current_app
from app.extensions import db, mail  # ✅ Use extensions.py for db and mail
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
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Basic validation
    if not name or not email or not message:
        return jsonify({'error': 'Name, email, and message are required.'}), 400
    if not is_valid_email(email):
        return jsonify({'error': 'Invalid email address.'}), 400

    try:
        # Save to database
        contact = ContactMessage(name=name, email=email, message=message)
        db.session.add(contact)
        db.session.commit()
        logging.info(f"Saved contact message from {email} to database.")

        # Send notification email
        admin_email = current_app.config.get('MAIL_USERNAME')
        if admin_email:
            msg = Message(
                subject=f"New Contact Message from {name}",
                recipients=[admin_email],
                body=f"Name: {name}\nEmail: {email}\nMessage: {message}\nTime: {contact.timestamp}"
            )
            mail.send(msg)
            logging.info(f"Notification email sent to {admin_email}")
        else:
            logging.warning("MAIL_USERNAME not configured; email not sent.")

        return jsonify({'message': 'Message received. Thank you!'}), 201

    except Exception as e:
        logging.error(f"Error processing contact message: {e}")
        return jsonify({'error': 'Something went wrong. Please try again later.'}), 500
