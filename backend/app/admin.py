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

    # ✅ Inject serial number dynamically
    def get_list(self, page, sort_field, sort_desc, search, filters, execute=True):
        count, data = super().get_list(page, sort_field, sort_desc, search, filters, execute)
        for i, item in enumerate(data):
            item.sr_no = page * self.page_size + i + 1
        return count, data

    column_formatters = {
        'sr_no': lambda v, c, m, p: getattr(m, 'sr_no', '')
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
