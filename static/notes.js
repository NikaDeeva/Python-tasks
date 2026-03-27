document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('notesBtn');
     fetch('/get_notes')
    .then(res => res.json())
    .then(data => {
        data.forEach(note => addNoteToList(note.name, note.id));
    });
    saveBtn.addEventListener('click', () => {
        const noteName = document.getElementById('notesInput').value;
        const noteInput = document.getElementById('notesInput');
        if (noteName !== ''){
            fetch("/add_note", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: noteName,
        })
    })
    .then(res => res.json())
    .then(data => {
        addNoteToList(noteName, data.id);
        noteInput.value = '';
    });
    
            
        }
        else{
        alert('Please, enter a note')
    }
         
});
function addNoteToList(name, id){
    const notesNum = document.getElementById('notesNum');
const notesList = document.getElementById('notesList');
const li = document.createElement('li');
li.className = 'notes__item';
li.innerHTML = `<p class="notes__text">${name}</p>
 <button class="note__delete">Delete</button>`;
li.setAttribute('data-id', id);
 li.querySelector(".note__delete").addEventListener("click", () => {
        const noteId = li.getAttribute("data-id");
        fetch(`/delete_note/${noteId}`, { method: "DELETE" })
            .then(() => li.remove())
            .then(() => getNotesNum().then(num => notesNum.textContent = num));
    });
    notesList.appendChild(li);
    getNotesNum().then(num => notesNum.textContent = num);
      
}
    });
    async function getNotesNum(){
        const res = await fetch('/get_notes');
        const data = await res.json();
        return data.length;
    };