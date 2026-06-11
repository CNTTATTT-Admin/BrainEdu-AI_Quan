import math
import numpy as np

def sanitize_json(obj):

    if isinstance(obj, dict):
        return {
            k: sanitize_json(v)
            for k, v in obj.items()
        }

    if isinstance(obj, list):
        return [
            sanitize_json(v)
            for v in obj
        ]

    if isinstance(obj, tuple):
        return tuple(
            sanitize_json(v)
            for v in obj
        )

    if isinstance(obj, np.integer):
        return int(obj)

    if isinstance(obj, np.floating):

        if np.isnan(obj):
            return None

        if np.isinf(obj):
            return None

        return float(obj)

    if isinstance(obj, float):

        if math.isnan(obj):
            return None

        if math.isinf(obj):
            return None

        return obj

    return obj