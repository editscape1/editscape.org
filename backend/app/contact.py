from flask import Blueprint, request, jsonify, current_app
from . import db, mail
from .models import ContactMessage
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
    if not name or not email or not message:
        return jsonify({'error': 'Name, email, and message are required.'}), 400
    if not is_valid_email(email):
        return jsonify({'error': 'Invalid email address.'}), 400
    contact = ContactMessage(name=name, email=email, message=message)
    db.session.add(contact)
    db.session.commit()
    # Send email notification
    try:
        msg = Message(
            subject=f"New Contact Message from {name}",
            recipients=[current_app.config.get('MAIL_USERNAME')],
            body=f"Name: {name}\nEmail: {email}\nMessage: {message}\nTime: {contact.timestamp}"
        )
        mail.send(msg)
    except Exception as e:
        logging.error(f"Failed to send email: {e}")
        return jsonify({'error': 'Message saved, but failed to send email.'}), 500
    # Log the message
    logging.info(f"Contact message from {name} <{email}> at {contact.timestamp}")
    return jsonify({'message': 'Message received. Thank you!'}), 201 