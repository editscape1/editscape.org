from flask import Blueprint, render_template_string, request, redirect, url_for, session
from app.models import ContactMessage
from app.extensions import db
import os

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Admin - Contact Messages</title>
    <style>
        body {
            font-family: 'Arial';
            background: #f9f9f9;
            padding: 2rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 0.75rem 1rem;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background: #eee;
        }
        .container {
            max-width: 1000px;
            margin: auto;
        }
        h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        form.logout {
            float: right;
        }
        form.delete-form {
            display: inline;
        }
        .btn-delete {
            color: white;
            background-color: #d9534f;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 3px;
        }
        .btn-delete:hover {
            background-color: #c9302c;
        }
    </style>
</head>
<body>
    <div class="container">
        {% if not session.get('logged_in') %}
            <h2>Admin Login</h2>
            <form method="POST">
                <input type="password" name="password" placeholder="Enter admin password" required />
                <button type="submit">Login</button>
            </form>
        {% else %}
            <h2>Contact Messages</h2>
            <form action="{{ url_for('admin.logout') }}" method="POST" class="logout">
                <button type="submit">Logout</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Timestamp</th>
                        <th>Responded</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {% for msg in messages %}
                    <tr>
                        <td>{{ msg.id }}</td>
                        <td>{{ msg.name }}</td>
                        <td>{{ msg.email }}</td>
                        <td>{{ msg.message }}</td>
                        <td>{{ msg.timestamp }}</td>
                        <td><input type="checkbox" {% if msg.responded %}checked{% endif %} disabled></td>
                        <td>
                            <form method="POST" action="{{ url_for('admin.delete_message', message_id=msg.id) }}" class="delete-form">
                                <button type="submit" class="btn-delete">Delete</button>
                            </form>
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        {% endif %}
    </div>
</body>
</html>
"""

@admin_bp.route("/", methods=["GET", "POST"])
def admin():
    if request.method == "POST" and not session.get("logged_in"):
        password = request.form.get("password")
        if password == ADMIN_PASSWORD:
            session["logged_in"] = True
        else:
            return "Incorrect password", 403

    messages = ContactMessage.query.order_by(ContactMessage.id.asc()).all()
    return render_template_string(TEMPLATE, messages=messages)

@admin_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("logged_in", None)
    return redirect(url_for("admin.admin"))

@admin_bp.route("/delete/<int:message_id>", methods=["POST"])
def delete_message(message_id):
    if not session.get("logged_in"):
        return "Unauthorized", 403

    message = ContactMessage.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    return redirect(url_for("admin.admin"))
