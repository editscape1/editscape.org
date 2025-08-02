from app.utils.sheets_utils import get_google_sheet

def get_active_portfolio_items():
    try:
        # Pass both the spreadsheet name and tab name
        worksheet = get_google_sheet("Editscape Portfolio Admin", "Sheet1")
        data = worksheet.get_all_records()  # ✅ FIXED: changed from `sheet` to `worksheet`
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
