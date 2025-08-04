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

    column_list = ("sr_no", "name", "email", "message", "timestamp", "responded")
    column_sortable_list = ("timestamp", "responded")
    column_searchable_list = ("name", "email", "message")
    column_default_sort = ("timestamp", True)

    column_display_pk = False
    column_editable_list = ['responded']
    form_columns = ("responded",)

    form_overrides = {
        'responded': BooleanField
    }

    page_size = 20

    # ✅ Safe serial number formatter using context
    def _sr_no_formatter(self, context, model, name):
        try:
            row_index = context.get('list_row', 0)
            page = int(request.args.get('page', 0))
            return page * self.page_size + row_index + 1
        except Exception:
            return '-'

    column_formatters = {
        'sr_no': _sr_no_formatter
    }

    column_labels = {
        'sr_no': 'Sr. No.'
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
