def get_active_portfolio_items():
    from app.utils.google import service, SHEET_ID  # Ensure these are correctly imported

    sheet = service.spreadsheets().values().get(
        spreadsheetId=SHEET_ID,
        range="Sheet1"
    ).execute()

    values = sheet.get("values", [])
    if not values or len(values) < 2:
        return []

    header = values[0]
    data_rows = values[1:]

    result = []
    for row in data_rows:
        item = {header[i].strip().lower(): row[i] if i < len(row) else "" for i in range(len(header))}

        if item.get("status", "").lower() == "active":
            result.append({
                "id": item.get("id", ""),
                "title": item.get("title", ""),
                "description": item.get("description", ""),
                "mediaUrl": item.get("mediaurl", ""),
                "type": item.get("type", ""),
            })

    return result
