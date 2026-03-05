let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

let list=document.getElementById("taskList");
list.innerHTML="";

tasks.forEach((task,index)=>{

let li=document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

if(task.priority==="High") li.classList.add("priority-high");
if(task.priority==="Medium") li.classList.add("priority-medium");
if(task.priority==="Low") li.classList.add("priority-low");

li.innerHTML=`
<span onclick="toggleTask(${index})">
${task.text} (${task.priority})
</span>

<span>${task.date}</span>

<span class="delete" onclick="deleteTask(${index})">❌</span>
`;

list.appendChild(li);

checkReminder(task);

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
date:new Date().toLocaleDateString()
};

tasks.push(task);

document.getElementById("taskInput").value="";

saveTasks();
renderTasks();
}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
renderTasks();
}

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

saveTasks();
renderTasks();
}

function clearTasks(){

tasks=[];

saveTasks();
renderTasks();
}

function searchTask(){

let search=document.getElementById("searchInput").value.toLowerCase();

let items=document.querySelectorAll("#taskList li");

items.forEach(item=>{

let text=item.innerText.toLowerCase();

item.style.display=text.includes(search)?"flex":"none";

});

}

function toggleDarkMode(){

document.body.classList.toggle("dark");

}

function updateProgress(){

let completed=tasks.filter(t=>t.completed).length;

let percent=(completed/tasks.length)*100 || 0;

document.getElementById("progressBar").style.width=percent+"%";

}

function checkReminder(task){

if(!task.reminder) return;

let now=new Date();
let currentTime=now.toTimeString().slice(0,5);

if(currentTime===task.reminder && !task.completed){

alert("Reminder: "+task.text);

}

}

setInterval(renderTasks,60000);

renderTasks();
