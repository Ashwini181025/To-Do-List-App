function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value;

  if (taskText === "") return;

  let li = document.createElement("li");
  li.textContent = taskText;

  let del = document.createElement("span");
  del.textContent = "❌";
  del.className = "delete";

  del.onclick = function () {
    li.remove();
  };

  li.appendChild(del);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}