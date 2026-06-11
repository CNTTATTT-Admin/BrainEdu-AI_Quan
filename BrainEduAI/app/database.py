import os

from dotenv import load_dotenv

from sqlalchemy import create_engine

from sqlalchemy.orm import (
    sessionmaker,
    declarative_base
)


load_dotenv()


MYSQL_HOST = os.getenv("MYSQL_HOST")

MYSQL_PORT = os.getenv("MYSQL_PORT")

MYSQL_USER = os.getenv("MYSQL_USER")

MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")

MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")


DATABASE_URL = (

    f"mysql+pymysql://"

    f"{MYSQL_USER}:{MYSQL_PASSWORD}"

    f"@{MYSQL_HOST}:{MYSQL_PORT}"

    f"/{MYSQL_DATABASE}"
)


engine = create_engine(

    DATABASE_URL,

    echo=False
)


SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine
)


Base = declarative_base()


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()