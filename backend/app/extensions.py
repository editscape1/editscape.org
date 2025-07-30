from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail  # ✅ Add this

db = SQLAlchemy()
mail = Mail()  # ✅ Add this
