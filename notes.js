const textarea = document.querySelector("textarea");
const form = document.querySelector("form");
const color = document.querySelector("input");
const notesContainer = document.querySelector(".notesContainer");
const message = document.querySelector(".right p");

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const note = document.createElement("div");
    const close = document.createElement("span");

    note.classList.add("note");
    close.classList.add("close");

    note.innerText = textarea.value;
    close.innerHTML = "&times;";

    close.addEventListener("click",(e) =>{
        e.target.closest(".note").remove();
        
        if(notesContainer.children.length === 0){
            message.style.display = "block";
        }
    });

    note.style.backgroundColor = color.value;
    note.append(close);
    notesContainer.append(note);

    message.style.display = "none";
    textarea.value = "";
});