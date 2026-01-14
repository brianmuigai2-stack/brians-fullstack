from pydantic import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()  # loads variables from .env file

class Settings(BaseSettings):
    # Required
    SECRET_KEY: str
    DATABASE_URL: str

    # JWT & token settings
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440   # 24 hours

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()