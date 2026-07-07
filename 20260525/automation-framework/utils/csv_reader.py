import csv
from pathlib import Path


def read_csv(file_path: str):
    path = Path(file_path)

    with path.open("r", encoding="utf-8") as file:
        return list(csv.DictReader(file))