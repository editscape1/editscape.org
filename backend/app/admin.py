from flask_admin import Admin, expose, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from wtforms import BooleanField  # ✅ Needed for checkbox field
from app.extensions import db
from app.models import ContactMessage


class ContactMessageModelView(ModelView):
    can_create = False
    can_edit = True  # ✅ Allow editing "responded"
    can_delete = True

    column_list = ("id", "name", "email", "message", "timestamp", "responded")
    column_sortable_list = ("id", "timestamp", "responded")
    column_searchable_list = ("name", "email", "message")
    column_default_sort = ("timestamp", True)

    column_display_pk = True
    column_editable_list = ['responded']  # ✅ Make "responded" directly editable from list view
    form_columns = ("responded",)  # ✅ Only allow "responded" field to be edited

    form_overrides = {
        'responded': BooleanField  # ✅ Use checkbox UI
    }

    page_size = 20


class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        return self.render('admin/index.html')


def setup_admin(app):
    admin = Admin(
        app,
        name='EDITSCAPE Admin',
        template_mode='bootstrap4',
        index_view=MyAdminIndexView()
    )
    admin.add_view(ContactMessageModelView(ContactMessage, db.session))
