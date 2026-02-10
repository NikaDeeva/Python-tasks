import json
from models import Task

def load_tasks():
    with open("tasks.json","r",encoding="utf-8") as f:
        data = json.load(f)
    return [Task(**item) for item in data]

def save_tasks(tasks):
    with open("tasks.json","w",encoding="utf-8") as f:
        json.dump([task.__dict__ for task in tasks], f, indent=4)


