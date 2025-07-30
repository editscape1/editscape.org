import os
from dotenv import load_dotenv
from app import create_app
from app.extensions import mail
from flask_mail import Message

# ✅ Load .env
load_dotenv()

# 🔍 Debug: check if .env is being loaded correctly
print("ENV FILE FOUND?", os.path.exists("backend/.env"))
print("MAIL_DEFAULT_SENDER FROM ENV:", os.getenv("MAIL_DEFAULT_SENDER"))

# Create and push app context
app = create_app()
with app.app_context():
    try:
        sender_email = app.config["MAIL_DEFAULT_SENDER"]
        print("📧 MAIL_DEFAULT_SENDER from config =", sender_email)

        msg = Message(
            subject="✅ Test Email from Flask",
            sender=sender_email,  # ✅ Explicitly set sender
            recipients=["editscape.org@gmail.com"],
            body="✅ This is a test email sent via Flask!"
        )

        mail.send(msg)
        print("✅ Email sent successfully!")

    except Exception as e:
        print("❌ Failed to send email:", e)
