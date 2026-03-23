import json
from models import Task, Habit

def load_tasks():
    with open("tasks.json","r",encoding="utf-8") as f:
        tasks = json.load(f)
    return [Task(**item) for item in tasks]

def save_tasks(tasks):
    with open("tasks.json","w",encoding="utf-8") as f:
        json.dump([task.__dict__ for task in tasks], f, indent=4)


def load_habits():
    try:
        with open("habits.json","r",encoding="utf-8") as f:
            habits = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        habits = []
    return [Habit(**item) for item in habits]

def save_habits(habits):
    with open("habits.json","w",encoding="utf-8") as f:
        json.dump([habit.__dict__ for habit in habits], f, indent=4)