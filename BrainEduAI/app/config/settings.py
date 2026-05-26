from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict
)


class Settings(BaseSettings):

    APP_NAME: str = "BrainEdu AI"

    EMBEDDING_MODEL: str = (
        "all-MiniLM-L6-v2"
    )

    TOP_K_RECOMMENDATIONS: int = 5

    CACHE_FILE: str = (
        "embedding_cache.pkl"
    )

    GROQ_API_KEY: str

    MYSQL_HOST: str

    MYSQL_PORT: int

    MYSQL_USER: str

    MYSQL_PASSWORD: str

    MYSQL_DATABASE: str

    model_config = SettingsConfigDict(

        env_file=".env",

        extra="ignore"
    )


settings = Settings()