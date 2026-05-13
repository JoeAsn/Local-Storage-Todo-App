const input = document.querySelector("input");
const addTask = document.querySelector("#addBtn");
const allTask = document.querySelector(".alltasks");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed") ;
let taskContainer = document.querySelector("#taskList") ;
let allTaskContainer =  document.querySelector(".tasks") ;
const activeList = document.querySelector(".active-list");
const completedList = document.querySelector(".completed-list") ;
let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
function addToTask(){
    console.log(input.value == 0)
    if(input.value == 0){
        return "cannot add an empty strng as a task"
    }
    let isAlready = Tasks.every(
        element => element.task !== input.value.trim()
    )
    if(isAlready){
        let taskelement = document.createElement("li");
        taskelement.innerHTML = '<input type="checkbox" /><span></span><button class="delete">🗑️</button>'
        taskelement.children[1].textContent = `${input.value}`;
        taskelement.classList.add("taskList") ;
        taskContainer.append(taskelement)
        console.log(taskelement.parentElement) ;
        Tasks.push(
            {
                task : input.value ,
                status : "active"
            }
        )
        input.value = "";
        localStorage.setItem("Tasks",JSON.stringify(Tasks));
    }
    else{
        alert(`u have already added ${input.value}`)
    }
}

function remove(e){
    let target = e.target ;
    let parentList = target.parentElement;
    if(target.matches("button")){
        parentList.style.display = "none" ;
        let theTask = parentList.children[1].innerText ;

        Tasks.forEach(element => {
            console.log(element.task);
            console.log(element.task === theTask)
        });

        const index = Tasks.findIndex(element => element.task === theTask); 
        if (index !== -1) {
            Tasks.splice(index, 1);
        }
    }
    localStorage.setItem("Tasks" , JSON.stringify(Tasks))
 
    console.log(Tasks)
}

function complete(e){
    const target = e.target ;
    if(!target.matches("input")){
        return 
    }

    let parentList = target.parentElement;
    let theTask = parentList.children[1].innerText;

    const index = Tasks.findIndex(element => element.task === theTask); 

    console.log(target.checked)

    if(target.checked){
        Tasks[index].status = "completed"
        parentList.style.display = "flex"
        parentList.children[1].style.textDecoration = "line-through";
    }
    else{
        Tasks[index].status = "active"
        parentList.style.display = "flex"
        parentList.children[1].style.textDecoration = "none"
    }
    localStorage.setItem("Tasks" , JSON.stringify(Tasks))

}

function showAll() {
    const allItems = document.querySelectorAll("#taskList li");
    allItems.forEach(item => {
        item.style.display = "flex";
    });
}

function showActive() {
    const allItems = document.querySelectorAll("#taskList li");

    allItems.forEach(item => {
        let taskText = item.children[1].innerText;

        const found = Tasks.find(t => t.task === taskText);

        if (found && found.status === "active") {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

function showCompleted() {
    const allItems = document.querySelectorAll("#taskList li");

    allItems.forEach(item => {
        let taskText = item.children[1].innerText;

        const found = Tasks.find(t => t.task === taskText);

        if (found && found.status === "completed") {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

function loadTasks() {
    Tasks.forEach(taskObj => {
        let taskelement = document.createElement("li");

        taskelement.innerHTML = `
            <input type="checkbox" />
            <span></span>
            <button class="delete">🗑️</button>
        `;

        taskelement.children[1].textContent = taskObj.task;
        taskelement.classList.add("taskList");

        // if completed
        if (taskObj.status === "completed") {
            taskelement.children[0].checked = true;
            taskelement.children[1].style.textDecoration = "line-through";
        }

        taskContainer.append(taskelement);
    });
}
loadTasks()

addTask.addEventListener("click",addToTask) ;
allTaskContainer.addEventListener("click" ,remove);
allTaskContainer.addEventListener("click" ,complete) ;
console.log(Tasks);

allTask.addEventListener("click", showAll);
active.addEventListener("click", showActive);
completed.addEventListener("click", showCompleted);