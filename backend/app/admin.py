from flask import redirect, url_for, request
from flask_admin import Admin, expose, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_admin.form.upload import ImageUploadField
from werkzeug.utils import secure_filename
from flask_login import current_user
from app.extensions import db
from app.models import PortfolioItem


class SecureModelView(ModelView):
    can_create = True
    can_edit = True
    can_delete = True
    column_display_pk = True
    page_size = 10

    column_list = ("id", "title", "description", "media_url", "media_type")

    form_columns = ("title", "description", "media_url", "media_type")

    column_searchable_list = ("title", "description")
    column_sortable_list = ("id", "title", "media_type")

    create_modal = True
    edit_modal = True

    # ✅ Optional override to customize how delete works
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
    admin.add_view(SecureModelView(PortfolioItem, db.session))
