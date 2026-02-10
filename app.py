from flask import Flask, render_template, jsonify, request
from storage import load_tasks, save_tasks
from models import Task

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
        

@app.route("/tasks", methods=["GET", "POST"])
def tasks_route():
    if request.method == "POST":
        data = request.get_json()
        new_task = Task(
            data["name"],
            int(data["difficulty"]),
            int(data["importance"])
        )
        tasks = load_tasks()
        tasks.append(new_task)
        save_tasks(tasks)
        return jsonify({"message": "Task added"})
    else:  
        tasks = load_tasks()
        return jsonify([task.__dict__ for task in tasks])

