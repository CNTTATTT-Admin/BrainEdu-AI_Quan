from fastapi import FastAPI

from app.routes.recommend import (
    router as recommend_router
)

app = FastAPI()

app.include_router(
    recommend_router
)