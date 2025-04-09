import os
import json
import httpx
import logging
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Body, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging (minimal logging for green software practices)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        # Use file handler with rotation to minimize storage (green practice)
        logging.FileHandler("api.log", mode="a", encoding="utf-8"),
    ]
)
logger = logging.getLogger("fastapi-service")

# Initialize FastAPI app
app = FastAPI(
    title="Green E-commerce Recommendations and Chat API",
    description="API for eco-friendly product recommendations and sustainable shopping assistant",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development - restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Pydantic Models
# -----------------------------------------------------------------------------

class Product(BaseModel):
    id: str
    name: str
    price: float
    description: Optional[str] = None
    category: str
    image: Optional[str] = None
    carbonFootprint: Optional[float] = 0
    sustainabilityScore: Optional[int] = 50
    recycledMaterials: Optional[bool] = False
    purchaseCount: Optional[int] = 0

class ProductList(BaseModel):
    products: List[Product]

class RecommendationRequest(BaseModel):
    userId: Optional[str] = None
    productId: Optional[str] = None
    category: Optional[str] = None
    sustainableOnly: Optional[bool] = False
    limit: Optional[int] = 5

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    userId: Optional[str] = None
    stream: Optional[bool] = False
    
class ChatResponse(BaseModel):
    response: str
    sustainabilityTips: Optional[List[str]] = None
    recommendedProducts: Optional[List[str]] = None

class ProductDetailsResponse(BaseModel):
    product: Product
    recommendations: List[Product]

# -----------------------------------------------------------------------------
# Helper Functions
# -----------------------------------------------------------------------------

async def call_ollama(prompt: str, system_prompt: str = None) -> str:
    """Forward request to Express backend service"""
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "http://localhost:3000/api/chat/ollama",
                json={
                    "prompt": prompt,
                    "systemPrompt": system_prompt
                }
            )
            
            if response.status_code != 200:
                logger.error(f"Backend API error: {response.text}")
                return "Sorry, I'm having trouble processing your request right now."
            
            result = response.json()
            return result["response"]
    except Exception as e:
        logger.error(f"Error calling backend service: {str(e)}")
        return "Sorry, I couldn't connect to the AI service. Please try again later."

async def get_product_embedding(product: dict) -> str:
    """Generate embedding for a product using backend service"""
    product_text = f"{product['name']} {product['description']} {product['category']}"
    prompt = f"Generate a concise semantic summary of this product: {product_text}"
    return await call_ollama(prompt)

# Mock product database (in production, would fetch from MongoDB)
SAMPLE_PRODUCTS = [
    {
        "id": "1",
        "name": "Eco-friendly Laptop",
        "price": 1200,
        "description": "Energy-efficient laptop made with recycled materials",
        "category": "Electronics",
        "image": "laptop.jpg",
        "carbonFootprint": 80,
        "sustainabilityScore": 85,
        "recycledMaterials": True,
        "purchaseCount": 24
    },
    {
        "id": "2",
        "name": "Organic Cotton T-Shirt",
        "price": 25,
        "description": "Sustainably sourced organic cotton t-shirt",
        "category": "Clothing",
        "image": "tshirt.jpg",
        "carbonFootprint": 5,
        "sustainabilityScore": 90,
        "recycledMaterials": False,
        "purchaseCount": 150
    },
    {
        "id": "3",
        "name": "Recycled Paper Notebook",
        "price": 12,
        "description": "100% recycled paper notebook",
        "category": "Office",
        "image": "notebook.jpg",
        "carbonFootprint": 2,
        "sustainabilityScore": 95,
        "recycledMaterials": True,
        "purchaseCount": 89
    },
    {
        "id": "4",
        "name": "Solar Power Bank",
        "price": 45,
        "description": "Portable power bank with solar charging capabilities",
        "category": "Electronics",
        "image": "powerbank.jpg",
        "carbonFootprint": 10,
        "sustainabilityScore": 80,
        "recycledMaterials": False,
        "purchaseCount": 67
    },
    {
        "id": "5",
        "name": "Bamboo Toothbrush",
        "price": 5,
        "description": "Biodegradable toothbrush with bamboo handle",
        "category": "Health",
        "image": "toothbrush.jpg",
        "carbonFootprint": 1,
        "sustainabilityScore": 98,
        "recycledMaterials": True,
        "purchaseCount": 215
    }
]

def get_products(category: str = None, sustainable_only: bool = False) -> List[Dict]:
    """Get filtered products (mock function)"""
    filtered = SAMPLE_PRODUCTS
    
    if category:
        filtered = [p for p in filtered if p["category"].lower() == category.lower()]
    
    if sustainable_only:
        filtered = [p for p in filtered if p["sustainabilityScore"] >= 70]
    
    return filtered

def get_product_by_id(product_id: str) -> Optional[Dict]:
    """Get product by ID (mock function)"""
    for product in SAMPLE_PRODUCTS:
        if product["id"] == product_id:
            return product
    return None

# -----------------------------------------------------------------------------
# API Endpoints
# -----------------------------------------------------------------------------

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Green E-commerce Recommendations and Chat API is running",
        "version": "1.0.0"
    }

@app.post("/api/recommendations", response_model=ProductList)
async def get_recommendations(request: RecommendationRequest):
    """
    Get AI-powered eco-friendly product recommendations
    """
    logger.info(f"Recommendation request: {request}")
    
    try:
        # Filter initial products
        filtered_products = get_products(
            category=request.category,
            sustainable_only=request.sustainableOnly
        )
        
        if request.productId:
            target_product = get_product_by_id(request.productId)
            if target_product:
                # Get AI-powered product similarity
                target_embedding = await get_product_embedding(target_product)
                
                # Generate recommendations using backend service
                prompt = f"""
                Based on this product: {target_product['name']}
                Category: {target_product['category']}
                Sustainability Score: {target_product['sustainabilityScore']}
                
                Suggest similar sustainable products from this list:
                {[p['name'] for p in filtered_products]}
                
                Consider sustainability scores and product categories.
                Return only product names, one per line.
                """
                
                recommendations = await call_ollama(prompt)
                
                # Filter products based on AI recommendations
                recommended_names = [name.strip() for name in recommendations.split('\n') if name.strip()]
                filtered_products = [
                    p for p in filtered_products 
                    if any(name.lower() in p['name'].lower() for name in recommended_names)
                ]
        
        # Sort by sustainability score and limit results
        filtered_products.sort(
            key=lambda x: (x["sustainabilityScore"], x["purchaseCount"]), 
            reverse=True
        )
        limited_products = filtered_products[:request.limit]
        
        logger.info(f"AI Recommendations generated: {len(limited_products)} products")
        
        return {"products": limited_products}
    
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating recommendations")

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_assistant(request: ChatRequest):
    """
    Chat with the sustainable shopping assistant powered by backend service
    """
    # Extract the user's message
    user_message = request.messages[-1].content if request.messages else ""
    
    try:
        # Call backend service for the chat response
        ai_response = await call_ollama(user_message)
        
        # Extract potential sustainability tips (simple approach)
        sustainability_tips = []
        for line in ai_response.split('\n'):
            if any(keyword in line.lower() for keyword in ["sustainable", "eco", "green", "carbon", "footprint", "environment"]):
                if len(line) > 15 and line not in sustainability_tips:  # Avoid short fragments
                    sustainability_tips.append(line.strip())
        
        # Extract any product recommendations from the message (simplified approach)
        product_recommendations = []
        for product in SAMPLE_PRODUCTS:
            if product["name"].lower() in ai_response.lower():
                product_recommendations.append(product["id"])
        
        # Log minimal information (green practice: reduce log storage)
        logger.info(f"Chat request processed, response length: {len(ai_response)} chars")
        
        return {
            "response": ai_response,
            "sustainabilityTips": sustainability_tips[:3],  # Limit to top 3
            "recommendedProducts": product_recommendations[:2]  # Limit to top 2
        }
    
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing chat request")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    # Green practice: Minimal response to save bandwidth
    return {"status": "ok"}

@app.get("/api/products/{product_id}", response_model=ProductDetailsResponse)
async def get_product_details(product_id: str):
    """Get product details and AI recommendations"""
    try:
        product = get_product_by_id(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Get recommendations
        rec_request = RecommendationRequest(
            productId=product_id,
            category=product["category"],
            limit=4
        )
        recommendations = await get_recommendations(rec_request)
        
        return ProductDetailsResponse(
            product=product,
            recommendations=recommendations.products
        )
        
    except Exception as e:
        logger.error(f"Error fetching product details: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching product details")

# Start server
if __name__ == "__main__":
    import uvicorn
    
    # Green practice: Optimize server workers based on available cores
    # while avoiding excessive resource consumption
    workers = int(os.environ.get("API_WORKERS", "1"))
    
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        workers=workers,
        log_level="error"  # Green practice: Minimal logging
    )