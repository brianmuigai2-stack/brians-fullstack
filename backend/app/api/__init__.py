# Import routers from different modules in the project
# These routers define the API endpoints for different parts of the application

from .auth import router as auth_router
# Imports the router from the auth module
# Handles authentication-related endpoints (login, signup, token generation)

from .users import router as users_router
# Imports the router from the users module
# Handles user-related endpoints (profile, update info, list users, etc.)

from .podcasts import router as podcasts_router
# Imports the router from the podcasts module
# Handles podcast-related endpoints (create podcast, list podcasts, etc.)

from .comments import router as comments_router
# Imports the router from the comments module
# Handles endpoints for podcast comments (add comment, view comments, etc.)

from .favorites import router as favorites_router
# Imports the router from the favorites module
# Handles endpoints for favorites (mark podcast as favorite, list favorites, etc.)

from .categories import router as categories_router
# Imports the router from the categories module
# Handles endpoints for podcast categories (list categories, add categories, etc.)
