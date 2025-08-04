import os
from flask import Blueprint, request, render_template_string, redirect, url_for, session
from .models import ContactMessage, PortfolioItem
from . import db

admin_bp = Blueprint('admin', __name__)

print("Loaded admin password:", os.getenv('ADMIN_PASSWORD'))

ADMIN_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; }
        .container { max-width: 1000px; margin: 40px auto; background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px #0001; }
        table { width: 100%; border-collapse: collapse; margin-top: 24px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #eee; }
        .logout { float: right; }
        .responded-row { background-color: #e6ffe6; }
        form { margin: 0; }
        input, textarea { width: 100%; padding: 6px; margin: 4px 0; }
        .section { margin-top: 40px; }
        .media-preview { max-height: 160px; margin-top: 4px; border-radius: 4px; }
        .delete-button { color: red; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Admin Dashboard <a href="{{ url_for('admin.logout') }}" class="logout">Logout</a></h2>

        <div class="section">
            <h3>Contact Messages</h3>
            <table>
                <tr>
                    <th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Timestamp</th><th>Responded</th>
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

        <div class="section">
            <h3>Upload Portfolio Item</h3>
            <form method="POST" action="{{ url_for('admin.upload_portfolio') }}">
                <input type="text" name="title" placeholder="Title" required />
                <textarea name="description" placeholder="Description" required></textarea>
                <input type="text" name="media_url" placeholder="Cloudinary Media URL (.jpg / .mp4)" required />
                <button type="submit">Upload</button>
            </form>
        </div>

        <div class="section">
            <h3>Portfolio Items</h3>
            <table>
                <tr>
                    <th>ID</th><th>Title</th><th>Description</th><th>Media</th><th>Actions</th>
                </tr>
                {% for item in portfolio %}
                <tr>
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        {% if item.media_url.endswith('.mp4') %}
                            <video class="media-preview" src="{{ item.media_url }}" controls></video>
                        {% else %}
                            <img class="media-preview" src="{{ item.media_url }}" />
                        {% endif %}
                    </td>
                    <td>
                        <a href="{{ url_for('admin.delete_portfolio', item_id=item.id) }}" class="delete-button">Delete</a>
                    </td>
                </tr>
                {% endfor %}
            </table>
        </div>
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
        portfolio = PortfolioItem.query.order_by(PortfolioItem.id.asc()).all()
        return render_template_string(ADMIN_TEMPLATE, messages=messages, portfolio=portfolio)
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

@admin_bp.route('/admin/portfolio/upload', methods=['POST'])
def upload_portfolio():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin.admin_login'))
    title = request.form.get('title')
    description = request.form.get('description')
    media_url = request.form.get('media_url')
    new_item = PortfolioItem(title=title, description=description, media_url=media_url)
    db.session.add(new_item)
    db.session.commit()
    return redirect(url_for('admin.admin_login'))

@admin_bp.route('/admin/portfolio/delete/<int:item_id>')
def delete_portfolio(item_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin.admin_login'))
    item = PortfolioItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return redirect(url_for('admin.admin_login'))
