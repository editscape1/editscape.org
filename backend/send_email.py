import os
from dotenv import load_dotenv
from app import create_app
from app.extensions import mail
from flask_mail import Message

# Load environment variables
load_dotenv()

# Create and push app context
app = create_app()
with app.app_context():
    try:
        sender_email = app.config["MAIL_DEFAULT_SENDER"]
        print("📧 MAIL_DEFAULT_SENDER =", sender_email)

        msg = Message(
            subject="✅ Test Email from Flask",
            sender=sender_email,  # ✅ Set sender explicitly
            recipients=["editscape.org@gmail.com"],
            body="✅ This is a test email sent via Flask!"
        )

        mail.send(msg)
        print("✅ Email sent successfully!")

    except Exception as e:
        print("❌ Failed to send email:", e)
