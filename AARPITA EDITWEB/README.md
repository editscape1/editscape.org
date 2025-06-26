# AARPITA EDITWEB

A complete Flask backend for the Editscape portfolio frontend.

## Features
- Contact form with message storage and email notification
- Easy updating of portfolio items (CRUD API)
- Full integration with LOVABLE AI frontend
- Ready for public deployment and SEO under the name "Editscape"

## Project Structure
```
AARPITA EDITWEB/
├── app/                # Application code (models, routes, blueprints, utils)
├── migrations/         # Database migrations (Flask-Migrate)
├── run.py              # App entry point
├── requirements.txt    # Python dependencies
├── .env       # Example environment variables
├── README.md           # This file
```

## Setup
1. Clone/download this folder.
2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env` and fill in your secrets and email config.
5. Initialize the database:
   ```bash
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```
6. Run the app:
   ```bash
   flask run
   ```

## Local Development
- You can override any variable by creating a `.env.local` file (if supported by your environment) or by editing `.env` temporarily.
- For local testing, you can set `CORS_ORIGINS=*` and `FLASK_ENV=development` in `.env.local`.

## Deployment
- Compatible with Render, Heroku, Railway, or any VPS.
- Set environment variables as in `.env`.
- Use `gunicorn` or similar WSGI server for production.
- On platforms like Render, Railway, Heroku, etc., set your environment variables in their dashboard using the values from your `.env` file.

## API Endpoints
- `GET /api/portfolio` — List all portfolio items
- `POST /api/portfolio` — Add a new item
- `PUT /api/portfolio/<id>` — Edit an item
- `DELETE /api/portfolio/<id>` — Delete an item
- `POST /api/contact` — Submit contact form (saves and emails)

## Frontend Integration
- Place your static frontend build in the appropriate static folder.
- All non-API routes fallback to `index.html` for SPA support.

## Admin Usage
- Use Postman or similar tools to manage portfolio items via API.
- You can add a simple HTML admin page later if needed.

## Admin Password Setup
To access the admin page, set your admin password in the `.env` file:

```
ADMIN_PASSWORD=yourpassword
```

- Replace `yourpassword` with a strong password of your choice.
- Never share your real password or commit it to version control.
- After changing the password, restart your Flask server.

## License
MIT

## Running the Project Locally

### 1. Start the Backend (Flask)
```sh
cd AARPITA\ EDITWEB
source venv/bin/activate
flask run --port=5001
```

### 2. Start the Frontend (Vite/React)
```sh
cd ..
npm install  # or yarn install
npm run dev  # or yarn dev
```

- Frontend: http://localhost:5173 (default)
- Backend: http://127.0.0.1:5000 (default)

### 3. Test Integration
- Open the frontend in your browser.
- Use the contact form and portfolio features.
- All actions should be reflected in the backend (DB/email).
