import pickle
import os

CACHE_PATH = "embedding_cache.pkl"


def load_embedding_cache():

    if not os.path.exists(CACHE_PATH):
        return {}

    with open(CACHE_PATH, "rb") as f:
        return pickle.load(f)



def save_embedding_cache(cache):

    with open(CACHE_PATH, "wb") as f:
        pickle.dump(cache, f)