import gspread
from google.oauth2.service_account import Credentials

def get_google_sheet(sheet_name):
    scope = ["https://www.googleapis.com/auth/spreadsheets"]
    creds = Credentials.from_service_account_file("backend/google_sheets_credentials.json", scopes=scope)
    client = gspread.authorize(creds)
    sheet = client.open(sheet_name).sheet1  # first sheet
    return sheet
