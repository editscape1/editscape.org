import gspread
from google.oauth2.service_account import Credentials

def get_google_sheet(sheet_name="Editscape Admin Data", worksheet_name="Sheet1"):
    print(f"📄 Fetching worksheet: {sheet_name} → tab: {worksheet_name}")
    
    try:
        scopes = [
            "https://www.googleapis.com/auth/spreadsheets.readonly",
            "https://www.googleapis.com/auth/drive.readonly"
        ]
        creds = Credentials.from_service_account_file("credentials.json", scopes=scopes)
        client = gspread.authorize(creds)
        print("🔐 Credentials loaded and client authorized.")

        # Open the Google Sheet by its file name
        spreadsheet = client.open(sheet_name)

        # 🔍 Add this to list available worksheet/tab names
        available_sheets = [ws.title for ws in spreadsheet.worksheets()]
        print(f"📑 Available worksheets: {available_sheets}")

        # Access the worksheet/tab by name
        worksheet = spreadsheet.worksheet(worksheet_name)

        return worksheet

    except Exception as e:
        print(f"❌ Error accessing sheet '{sheet_name}', tab '{worksheet_name}': {e}")
        return None
