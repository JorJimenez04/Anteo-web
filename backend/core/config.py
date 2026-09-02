import os
from functools import lru_cache


class Settings:
    """Configuración de la aplicación cargada desde variables de entorno."""

    cors_origins: list[str]

    def __init__(self) -> None:
        origins_env = os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,https://anteo.vercel.app",
        )
        self.cors_origins = [origin.strip() for origin in origins_env.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
