from flask import Flask, render_template, jsonify, request
from storage import load_tasks, save_tasks, load_habits, save_habits, load_notes, save_notes
from models import Task, Habit, Note

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")  


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


@app.route("/add_habit", methods=["POST"])
def add_habit():
    data = request.get_json()
    new_habit = Habit(
        data["name"],
        data["cathegory"]
    )
    habits = load_habits()
    habits.append(new_habit)
    save_habits(habits)
    return jsonify({"message": "ok", "id": new_habit.id, "completed": False})
    
@app.route("/get_habits", methods=["GET"])
def get_habits():
    habits = load_habits()
    return jsonify([habit.__dict__ for habit in habits])

@app.route("/delete_habit/<int:habit_id>", methods=["DELETE"])
def delete_habit(habit_id):
    habits = load_habits()  
    habits = [h for h in habits if h.id != habit_id]  
    save_habits(habits)  
    return jsonify({"message": "task deleted"})

@app.route("/complete_habit/<int:habit_id>", methods=["PATCH"])
def complete_habit(habit_id):
    habits = load_habits()
    for h in habits:
        if int(h.id) == habit_id:  
            h.completed = True
            break
    save_habits(habits)
    return jsonify({"message": "habit completed"})

@app.route("/add_note", methods=["POST"])
def add_note():
    data = request.get_json()
    new_note = Note(
        data["name"],
    )
    notes = load_notes()
    notes.append(new_note)
    save_notes(notes)
    return jsonify({"message": "ok", "id": new_note.id, "completed": False})
    
@app.route("/get_notes", methods=["GET"])
def get_notes():
    notes = load_notes()
    return jsonify([note.__dict__ for note in notes])

@app.route("/delete_note/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    notes = load_notes()  
    notes = [n for n in notes if n.id != note_id]  
    save_notes(notes)  
    return jsonify({"message": "note deleted"})

if __name__ == "__main__":
    app.run(debug=True)
