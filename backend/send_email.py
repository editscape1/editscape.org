from app import create_app
from flask_mail import Message
from app.extensions import mail

app = create_app()

with app.app_context():
    print("MAIL DEFAULT SENDER:", app.config.get("MAIL_DEFAULT_SENDER"))  # 👈 Add this line

    msg = Message(
        subject="Test Email",
        recipients=["editscape.org@gmail.com"],
        body="This is a test email from Flask app!"
    )
    try:
        mail.send(msg)
        print("✅ Email sent successfully!")
    except Exception as e:
        print("❌ Failed to send email:", e)
