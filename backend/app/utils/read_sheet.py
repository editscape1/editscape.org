def get_active_portfolio_items():
    from app.utils.google import service, SHEET_ID  # ✅ Ensure correct import

    sheet = service.spreadsheets().values().get(
        spreadsheetId=SHEET_ID,
        range="Sheet1"
    ).execute()

    values = sheet.get("values", [])
    if not values or len(values) < 2:
        print("⚠️ Sheet is empty or only contains header.")
        return []

    header = values[0]
    data_rows = values[1:]

    result = []
    for row in data_rows:
        item = {
            header[i].strip().lower(): row[i].strip() if i < len(row) else "" 
            for i in range(len(header))
        }

        # 🔍 Debug output
        print(f"🔍 Row: {item}")

        if item.get("status", "").strip().lower() == "active":
            try:
                result.append({
                    "id": int(item.get("id", "0")),
                    "title": item.get("title", ""),
                    "description": item.get("description", ""),
                    "image_url": item.get("mediaurl", ""),
                    "type": item.get("type", ""),
                    "link": item.get("link", "#"),
                    "created_at": item.get("createdat", ""),
                })
            except Exception as e:
                print(f"⚠️ Skipping row due to error: {e}")

    print(f"✅ {len(result)} active items found.")
    return sorted(result, key=lambda x: x["id"], reverse=True)
