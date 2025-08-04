from flask_admin import Admin, expose, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from wtforms import BooleanField
from flask import request
from app.extensions import db
from app.models import ContactMessage


class ContactMessageModelView(ModelView):
    can_create = False
    can_edit = True
    can_delete = True

    column_list = ("serial_number", "name", "email", "message", "timestamp", "responded")
    column_sortable_list = ("id", "timestamp", "responded")
    column_searchable_list = ("name", "email", "message")
    column_default_sort = ("timestamp", True)

    column_display_pk = False  # Don't show internal ID anymore
    column_editable_list = ['responded']
    form_columns = ("responded",)

    form_overrides = {
        'responded': BooleanField
    }

    page_size = 20

    # ✅ Virtual column for serial number
    def _serial_number(view, context, model, name):
        # Calculate current page and row number
        page = int(request.args.get('page', 0))
        idx = view.get_list(0, view.page_size, None, None, None)[0].index(model)
        return page * view.page_size + idx + 1

    column_formatters = {
        'serial_number': _serial_number
    }

    column_labels = {
        'serial_number': 'Sr. No.'
    }


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
