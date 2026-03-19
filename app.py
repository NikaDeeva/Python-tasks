from flask import Flask, render_template, jsonify, request
from storage import load_tasks, save_tasks
from models import Task

app = Flask(__name__)

# домашня сторінка
@app.route("/")
def home():
    return render_template("index.html")  # <-- твій HTML файл в templates/


@app.route("/add_task", methods=["POST"])
def add_task():
    data = request.get_json()
    new_task = Task(
        data["name"],
        int(data["difficulty"]),
        int(data["importance"]),
    )
    tasks = load_tasks()
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify({"message": "ok", "id": new_task.id, "completed": False})
    
@app.route("/get_tasks", methods=["GET"])
def get_tasks():
    tasks = load_tasks()
    return jsonify([task.__dict__ for task in tasks])

@app.route("/delete_task/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    tasks = load_tasks()  
    tasks = [t for t in tasks if t.id != task_id]  
    save_tasks(tasks)  
    return jsonify({"message": "task deleted"})

@app.route("/complete_task/<int:task_id>", methods=["PATCH"])
def complete_task(task_id):
    tasks = load_tasks()
    for t in tasks:
        if int(t.id) == task_id:  # <- гарантовано int
            t.completed = True
            break
    save_tasks(tasks)
    return jsonify({"message": "task completed"})

if __name__ == "__main__":
    app.run(debug=True)
