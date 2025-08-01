from app.utils.sheets_utils import get_google_sheet  # adjust if your utils are elsewhere

def get_active_portfolio_items():
    """
    Fetches all active portfolio items from the Google Sheet.
    Filters out rows where Status is not 'active'.
    """
    try:
        sheet = get_google_sheet("Editscape Portfolio Admin")
        data = sheet.get_all_records()
        active_items = [
            item for item in data
            if item.get("Status", "").strip().lower() == "active"
        ]
        return active_items
    except Exception as e:
        print(f"❌ Error reading sheet: {e}")
        return []
