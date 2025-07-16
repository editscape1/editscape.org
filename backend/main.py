from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from deta import Deta

# Initialize Deta
deta = Deta(os.getenv("DETA_PROJECT_KEY"))
db = deta.Base("main")

app = FastAPI(title="EditScape Backend", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

class PortfolioItem(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    category: str
    technologies: List[str] = []

class ServiceItem(BaseModel):
    title: str
    description: str
    price: Optional[float] = None
    features: List[str] = []

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "EditScape Backend API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Contact endpoints
@app.post("/api/contact")
async def submit_contact(message: ContactMessage):
    try:
        # Store in Deta Base
        contact_data = {
            "name": message.name,
            "email": message.email,
            "message": message.message,
            "timestamp": __import__("datetime").datetime.now().isoformat()
        }
        db.put(contact_data)
        return {"message": "Contact message submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/contact")
async def get_contacts():
    try:
        contacts = db.fetch().items
        return {"contacts": contacts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Portfolio endpoints
@app.post("/api/portfolio")
async def create_portfolio_item(item: PortfolioItem):
    try:
        portfolio_data = {
            "title": item.title,
            "description": item.description,
            "image_url": item.image_url,
            "category": item.category,
            "technologies": item.technologies,
            "timestamp": __import__("datetime").datetime.now().isoformat()
        }
        db.put(portfolio_data)
        return {"message": "Portfolio item created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/portfolio")
async def get_portfolio_items():
    try:
        items = db.fetch().items
        return {"portfolio": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Services endpoints
@app.post("/api/services")
async def create_service_item(item: ServiceItem):
    try:
        service_data = {
            "title": item.title,
            "description": item.description,
            "price": item.price,
            "features": item.features,
            "timestamp": __import__("datetime").datetime.now().isoformat()
        }
        db.put(service_data)
        return {"message": "Service item created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/services")
async def get_service_items():
    try:
        items = db.fetch().items
        return {"services": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 