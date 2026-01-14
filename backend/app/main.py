from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import user, podcast, comment, category, favorite

from app.api import (
    auth_router,
    users_router,
    podcasts_router,
    comments_router,
    favorites_router,
    categories_router,
)

app = FastAPI(
    title="Podcast Platform API",
    description="Backend API for Podcast / Audio Content Platform",
    version="0.1.0"
)

# Allow frontend to connect (update origins later for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(podcasts_router, prefix="/podcasts", tags=["Podcasts"])
app.include_router(comments_router, prefix="/comments", tags=["Comments"])
app.include_router(favorites_router, prefix="/favorites", tags=["Favorites"])
app.include_router(categories_router, prefix="/categories", tags=["Categories"])


@app.get("/")
def root():
    return {
        "message": "Podcast Platform API",
        "routes": {
            "auth": {
                "register": "POST /auth/register",
                "login": "POST /auth/login"
            },
            "users": {
                "me": "GET /users/me",
                "update": "PUT /users/me"
            },
            "podcasts": {
                "list": "GET /podcasts/",
                "get": "GET /podcasts/{id}",
                "create": "POST /podcasts/",
                "update": "PUT /podcasts/{id}"
            },
            "categories": {
                "list": "GET /categories/",
                "get": "GET /categories/{id}",
                "create": "POST /categories/"
            },
            "comments": {
                "list": "GET /comments/podcast/{podcast_id}",
                "create": "POST /comments/",
                "delete": "DELETE /comments/{id}"
            },
            "favorites": {
                "list": "GET /favorites/",
                "add": "POST /favorites/{podcast_id}",
                "remove": "DELETE /favorites/{podcast_id}"
            },
            "docs": "GET /docs",
            "redoc": "GET /redoc"
        }
    }