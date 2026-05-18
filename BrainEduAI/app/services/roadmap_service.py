import json


def load_roadmaps():

    with open(
        "datasets/career_roadmaps.json",
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)