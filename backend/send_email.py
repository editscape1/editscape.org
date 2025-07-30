import os
from dotenv import load_dotenv
from app import create_app
from app.extensions import mail
from flask_mail import Message

# ✅ Load environment variables from .env
load_dotenv()

app = create_app()

with app.app_context():
    print("MAIL DEFAULT SENDER:", app.config.get("MAIL_DEFAULT_SENDER"))

    msg = Message(
        subject="Test Email",
        sender=app.config["MAIL_DEFAULT_SENDER"],  # ✅ Add this line
        recipients=["editscape.org@gmail.com"],
        body="This is a test email from Flask app!"
    )
    try:
        mail.send(msg)
        print("✅ Email sent successfully!")
    except Exception as e:
        print("❌ Failed to send email:", e)
