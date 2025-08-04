from flask_admin import Admin, expose, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from wtforms import BooleanField
from flask import request
from app.extensions import db
from app.models import ContactMessage


# ✅ Function to generate serial number
def _get_serial_number(view, context, model, index):
    page = int(request.args.get('page', 0))
    return page * view.page_size + index + 1


class ContactMessageModelView(ModelView):
    can_create = False
    can_edit = True
    can_delete = True

    # ✅ Add "Sr. No." as a virtual column
    column_list = ("sr_no", "name", "email", "message", "timestamp", "responded")
    column_sortable_list = ("timestamp", "responded")
    column_searchable_list = ("name", "email", "message")
    column_default_sort = ("timestamp", True)

    column_display_pk = False  # Hide internal DB ID
    column_editable_list = ['responded']
    form_columns = ("responded",)

    form_overrides = {
        'responded': BooleanField
    }

    # ✅ Custom formatters
    column_formatters = {
        'sr_no': _get_serial_number
    }

    # ✅ Rename column header
    column_labels = {
        'sr_no': 'Sr. No.'
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
