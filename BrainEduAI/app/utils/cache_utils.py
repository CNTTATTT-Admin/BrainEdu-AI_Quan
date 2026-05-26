# app/utils/cache_utils.py

import pickle
import os

CACHE_FILE = "embedding_cache.pkl"


def load_embedding_cache():

    if os.path.exists(CACHE_FILE):

        with open(
            CACHE_FILE,
            "rb"
        ) as file:

            return pickle.load(file)

    return {}


def save_embedding_cache(cache):

    with open(
        CACHE_FILE,
        "wb"
    ) as file:

        pickle.dump(
            cache,
            file
        )