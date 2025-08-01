from app.utils.sheets_utils import get_google_sheet  # Adjust if your path differs

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

if __name__ == "__main__":
    items = get_active_portfolio_items()
    if items:
        print("✅ Active Portfolio Items:")
        for i, item in enumerate(items, start=1):
            print(f"{i}. {item}")
    else:
        print("⚠️ No active items found or failed to read sheet.")
