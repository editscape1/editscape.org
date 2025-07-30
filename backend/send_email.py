from app import create_app
from flask_mail import Message
from app.extensions import mail

app = create_app()

with app.app_context():
    msg = Message(
        subject="Test Email",
        sender=app.config["MAIL_USERNAME"],
        recipients=["editscape.org@gmail.com"],
        body="This is a test email from Flask app!"
    )
    try:
        mail.send(msg)
        print("✅ Email sent successfully!")
    except Exception as e:
        print("❌ Failed to send email:", e)
