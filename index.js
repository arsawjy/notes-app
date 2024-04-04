const addBox = document.querySelector("add-box");
const popUpBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const addBtn = popUpBox.querySelector("button");
const popupTitle = document.querySelector("header p");
const wrapper = document.querySelector(".wrapper");
const note =document.querySelector(".note");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let isUpdate = false;
let UpdateId;

addBox.addEventListener("click", function(){
    titleTag.focus();
    popUpBox.classList.add("show");
});

closeIcon.addEventListener("click", ()=>{
    popUpBox.classList.remove("show");
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;
    if (noteTitle || noteDesc){
        let dateObj = new Date();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes(); 
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let notesData = {
            id: `note-${Date.now()}`,
            title: noteTitle,
            description: noteDesc,
            date: `${hours}:${minutes} ${month} ${day} ${year}` 
        };  
        if(!isUpdate){
            notes.push(notesData);
        } else {
            isUpdate = false;
            notes[UpdateId] = notesData;
        } 
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

function showNotes(filteredNotes = notes) {
    document.querySelectorAll(".note").forEach(note => note.remove());
    filteredNotes.forEach((note, index) => {
        let liTag = `  
        <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();


closeIcon.addEventListener("click", ()=>{
    titleTag.value = "";
    descTag.value = "";
});

window.showMenu = function(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

window.updateNote = function(noteId, title, desc) {
    isUpdate = true;
    UpdateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}

window.deleteNote = function(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this item?");
    if (!confirmDel) return;

    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}