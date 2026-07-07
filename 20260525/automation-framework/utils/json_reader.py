import json
from pathlib import Path


def read_json(file_path: str):
    path = Path(file_path)

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)