const textarea = document.querySelector("textarea");
const form = document.querySelector("form");
const color = document.querySelector("input");
const notesContainer = document.querySelector(".notesContainer");
const message = document.querySelector(".right p");
const undo = document.querySelector(".undo");
const createdNotes = [];
const deletedNotes = [];
undo.style.cssText = "padding:5px; font-weight:400; font-size:12px; position:absolute;"

window.addEventListener("load", undoButtonStatus);

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const newNote = {
        text: textarea.value,
        color: color.value,
        timestamp: new Date().toLocaleString(),
        position : Date.now()
    };

    createdNotes.push(newNote);
    displayNotes();
    message.style.display = "none";
    textarea.value = "";
    textarea.focus();
});

function displayNotes(){
    if(createdNotes.length === 0){
        message.style.display = "block";
    }else{
        message.style.display = "none";
    }
    notesContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    createdNotes.forEach((note) =>{
        const noteParentDiv = document.createElement("div");
        noteParentDiv.classList.add("parentDiv");
        noteParentDiv.style.backgroundColor = `${note.color}`;

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerText = `${note.text}`;

        const close = document.createElement("span");
        close.classList.add("close");
        close.innerHTML = "&times;";

        const editableContent = document.createElement("input");
        editableContent.value = noteDiv.innerText;
        editableContent.classList.add("edit-content");
        editableContent.style.display = "none";
        const edit = document.createElement("span");
        edit.classList.add("edit");
        
        edit.innerText = "edit";

        edit.addEventListener("click", () =>{
            const displayValue = editableContent.style.display;
            if(displayValue === "none"){
                editableContent.style.display = "block";
                edit.innerText = "save";
            }else{
                noteDiv.innerText = editableContent.value;
                note.text = editableContent.value;
                editableContent.style.display = "none";
                edit.innerText = "edit";
            }  
        });

        close.addEventListener("click", (e) =>{
            const indexToDeleted = createdNotes.findIndex((n) =>{
                return n.position === note.position;
            });

            deletedNotes.push(...createdNotes.splice(indexToDeleted,1));
            e.target.closest(".parentDiv").remove();
            if(notesContainer.children.length === 0){
                message.style.display = "block";
            }
            undoButtonStatus();
        });

        const timestamp = document.createElement("span");
        timestamp.classList.add("timestamp");
        timestamp.innerText = `${note.timestamp}`;
        
        noteParentDiv.append(noteDiv, close, timestamp, editableContent, edit);
        fragment.append(noteParentDiv);
        
    });
    notesContainer.append(fragment);
}

undo.addEventListener("click", (e) =>{
    const lastDeletedNotes = deletedNotes.pop();
    createdNotes.push(lastDeletedNotes);

    createdNotes.sort((a,b) =>{
        return a.position - b.position;
    });

    displayNotes();
    undoButtonStatus();
})

function undoButtonStatus(){
    undo.disabled = deletedNotes.length === 0 ? true : false;
}
