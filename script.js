let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function applyFilter(){

let filter = document.getElementById("filterTask").value;

let filteredTasks;

if(filter === "all"){
filteredTasks = tasks;
}
else{
filteredTasks = tasks.filter(task => task.priority === filter);
}

renderTasks(filteredTasks);

}

function renderTasks(list = tasks){

let listElement = document.getElementById("taskList");
listElement.innerHTML = "";

list.forEach(task => {

checkReminder(task);

let index = tasks.indexOf(task);

let li = document.createElement("li");

li.setAttribute("draggable","true");
li.dataset.index = index;

li.addEventListener("dragstart",dragStart);
li.addEventListener("dragover",dragOver);
li.addEventListener("drop",drop);

if(task.completed){
li.classList.add("completed");
}

if(task.priority==="High") li.classList.add("priority-high");
if(task.priority==="Medium") li.classList.add("priority-medium");
if(task.priority==="Low") li.classList.add("priority-low");

li.innerHTML = `
<span onclick="toggleTask(${index})">
${task.text} (${task.priority})
</span>

<span>${task.date}</span>

<span onclick="editTask(${index})">✏️</span>

<span class="delete" onclick="deleteTask(${index})">❌</span>
`;

listElement.appendChild(li);

});

updateProgress();

}

function addTask(){

let text=document.getElementById("taskInput").value;
let priority=document.getElementById("priority").value;
let reminder=document.getElementById("reminder").value;

if(text==="") return;

let task={
text:text,
priority:priority,
reminder:reminder,
completed:false,
date:new Date().toLocaleDateString(),
notified:false
};

tasks.push(task);

document.getElementById("taskInput").value="";

saveTasks();
applyFilter();

}

function editTask(index){

let newTask = prompt("Edit task:", tasks[index].text);

if(newTask !== null && newTask !== ""){
tasks[index].text = newTask;
saveTasks();
applyFilter();
}

}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
applyFilter();

}

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

if(tasks[index].completed){
tasks[index].notified=true;
}

saveTasks();
applyFilter();

}

function clearTasks(){

tasks=[];

saveTasks();
applyFilter();

}

function filterTasks(){
applyFilter();
}

function toggleDarkMode(){

document.body.classList.toggle("dark");

}

function updateProgress(){

let completed = tasks.filter(t=>t.completed).length;

let percent = (completed/tasks.length)*100 || 0;

document.getElementById("progressBar").style.width = percent + "%";

document.getElementById("taskCounter").innerText =
completed + " / " + tasks.length + " tasks completed";

}

function checkReminder(task){

if(!task.reminder || task.notified) return;

let now=new Date();
let currentTime=now.toTimeString().slice(0,5);

if(currentTime===task.reminder && !task.completed){

alert("Reminder: "+task.text);

task.notified=true;

saveTasks();

}

}

/* ---------------- DRAG & DROP ---------------- */

let dragIndex;

function dragStart(e){

dragIndex = this.dataset.index;

}

function dragOver(e){

e.preventDefault();

}

function drop(){

let dropIndex = this.dataset.index;

let draggedTask = tasks[dragIndex];

tasks.splice(dragIndex,1);
tasks.splice(dropIndex,0,draggedTask);

saveTasks();
applyFilter();

}

/* ---------------------------------------------- */

setInterval(applyFilter,60000);

applyFilter();
