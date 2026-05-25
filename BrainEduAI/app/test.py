import pandas as pd

from app.database import engine


df = pd.read_sql(

    "SELECT 1",

    con=engine
)

print(df)