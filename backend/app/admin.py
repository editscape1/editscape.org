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

    def _sr_no_formatter(view, context, model, name):
        # Hack: get current page number from query param
        try:
            page = int(request.args.get('page', 0))
        except (TypeError, ValueError):
            page = 0

        # Use offset in query to calculate serial number
        row_index = context.get('list_row_number', 0)
        return page * view.page_size + row_index + 1

    column_formatters = {
        'sr_no': _sr_no_formatter
    }

    column_labels = {
        'sr_no': 'Sr. No.'
    }
