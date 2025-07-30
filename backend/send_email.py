import os
from dotenv import load_dotenv
from app import create_app
from app.extensions import mail
from flask_mail import Message

# ✅ Load environment variables from .env file in backend/
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# 🔍 Debugging: Print out loaded values
print("✅ ENV FILE FOUND?", os.path.exists(dotenv_path))
print("📧 MAIL_DEFAULT_SENDER FROM ENV:", os.getenv("MAIL_DEFAULT_SENDER"))
print("🗃️ SQLALCHEMY_DATABASE_URI:", os.getenv("SQLALCHEMY_DATABASE_URI"))

# ✅ Create and push app context
app = create_app()

with app.app_context():
    try:
        sender_email = app.config.get("MAIL_DEFAULT_SENDER")
        print("📧 MAIL_DEFAULT_SENDER from config =", sender_email)

        msg = Message(
            subject="✅ Test Email from Flask",
            sender=sender_email,
            recipients=["editscape.org@gmail.com"],
            body="✅ This is a test email sent via Flask!"
        )

        mail.send(msg)
        print("✅ Email sent successfully!")

    except Exception as e:
        print("❌ Failed to send email:", e)
