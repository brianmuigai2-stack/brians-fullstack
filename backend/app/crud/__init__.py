# Optional - can be used to re-export important functions
# Most people keep it empty or very minimal

from .user import (
    get_user_by_email,
    get_user_by_username,
    authenticate_user,
    update_user,
)
from .podcast import (
    get_podcast,
    get_podcasts,
    create_podcast,
    update_podcast,
)
from .comment import (
    get_comments_by_podcast,
    create_comment,
    get_comment,
    delete_comment,
)
from .favorite import (
    get_favorite,
    add_favorite,
    remove_favorite,
    is_podcast_favorited,
    get_user_favorite_podcasts,
)
from .category import (
    get_category,
    get_categories,
    get_category_by_name,
    create_category,
)