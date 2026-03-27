document.addEventListener('DOMContentLoaded', () => {
    const tasksNum = document.getElementById('tasksNum');
    const habitsNum = document.getElementById('habitsNum');
    const notesNum = document.getElementById('notesNum');

    async function getTasksNum(){
        const res = await fetch('/get_tasks');
        const data = await res.json();
        return data.length;
    }

    async function getHabitsNum(){
        const res = await fetch('/get_habits');
        const data = await res.json();
        return data.length;
    }

    async function getNotesNum(){
        const res = await fetch('/get_notes');
        const data = await res.json();
        return data.length;
    }

    async function showData(){
        tasksNum.textContent = await getTasksNum();
        habitsNum.textContent = await getHabitsNum();
        notesNum.textContent = await getNotesNum();
    }

    showData();
});