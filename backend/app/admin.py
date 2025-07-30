import os
from flask import Blueprint, request, render_template_string, redirect, url_for, session
from .models import ContactMessage
from . import db

print("Loaded admin password:", os.getenv('ADMIN_PASSWORD'))

admin_bp = Blueprint('admin', __name__)

ADMIN_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Contact Messages</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; }
        .container { max-width: 900px; margin: 40px auto; background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px #0001; }
        table { width: 100%; border-collapse: collapse; margin-top: 24px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #eee; }
        .logout { float: right; }
        .responded-row { background-color: #e6ffe6; }  /* light green for responded */
        form { margin: 0; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Contact Messages <a href="{{ url_for('admin.logout') }}" class="logout">Logout</a></h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Timestamp</th>
                <th>Responded</th>
            </tr>
            {% for msg in messages %}
            <tr class="{% if msg.responded %}responded-row{% endif %}">
                <td>{{ msg.id }}</td>
                <td>{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.message }}</td>
                <td>{{ msg.timestamp }}</td>
                <td>
                    <form method="POST" action="{{ url_for('admin.toggle_responded', message_id=msg.id) }}">
                        <input type="checkbox" name="responded" onchange="this.form.submit()" {% if msg.responded %}checked{% endif %}>
                    </form>
                </td>
            </tr>
            {% endfor %}
        </table>
    </div>
</body>
</html>
'''

LOGIN_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; }
        .container { max-width: 400px; margin: 100px auto; background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px #0001; }
        input[type=password] { width: 100%; padding: 8px; margin: 8px 0; }
        button { padding: 8px 16px; }
        .error { color: red; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Admin Login</h2>
        {% if error %}<div class="error">{{ error }}</div>{% endif %}
        <form method="post">
            <input type="password" name="password" placeholder="Admin Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
'''

@admin_bp.route('/admin', methods=['GET', 'POST'])
def admin_login():
    if session.get('admin_logged_in'):
        messages = ContactMessage.query.order_by(ContactMessage.timestamp.asc()).all()
        return render_template_string(ADMIN_TEMPLATE, messages=messages)
    error = None
    if request.method == 'POST':
        password = request.form.get('password')
        if password == os.getenv('ADMIN_PASSWORD'):
            session['admin_logged_in'] = True
            return redirect(url_for('admin.admin_login'))
        else:
            error = 'Incorrect password.'
    return render_template_string(LOGIN_TEMPLATE, error=error)

@admin_bp.route('/admin/logout')
def logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin.admin_login'))

@admin_bp.route('/admin/responded/<int:message_id>', methods=['POST'])
def toggle_responded(message_id):
    msg = ContactMessage.query.get_or_404(message_id)
    msg.responded = not msg.responded
    db.session.commit()
    return redirect(url_for('admin.admin_login'))
