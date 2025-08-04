from flask_admin import Admin, AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from flask import redirect, url_for, request
from app.extensions import db
from app.models import ContactMessage


class ContactMessageAdmin(ModelView):
    can_create = False      # Disallow creating new entries
    can_edit = False        # Disallow editing entries
    can_delete = True       # ✅ Allow deleting entries
    column_display_pk = True
    page_size = 20

    column_list = ("id", "name", "email", "message", "timestamp", "responded")
    column_filters = ("responded", "timestamp")
    column_searchable_list = ("name", "email", "message")

    # Optional: confirm delete
    def delete_model(self, model):
        try:
            self.session.delete(model)
            self.session.commit()
            return True
        except Exception as e:
            self.session.rollback()
            raise e


class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        return self.render('admin/index.html')


def setup_admin(app):
    admin = Admin(app, name='EDTISCAPE Admin', template_mode='bootstrap4', index_view=MyAdminIndexView())
    admin.add_view(ContactMessageAdmin(ContactMessage, db.session))
