"use strict";

let taskList = [];

if(localStorage.getItem("taskList") !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

let editId;
let isEditTask = false;

const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span");

displayTask("all");

function displayTask(filter) {
    
    let ul = document.getElementById("task-list");
    ul.innerHTML = "";

    if(taskList.length == 0) {
        ul.innerHTML = "<p class='p-3 m-0'>Your task list is empty.</p>"
    } else {
        for(let task of taskList) {

            let completed = task.status == "completed" ? "checked": "";

            if (filter == task.status || filter == "all") {
                
                let li = `
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input type="checkbox" onclick="updateStatus(this)" id="${task.id}" class="form-check-input"${completed}>
                            <label for="${task.id}" class="form-check-label ${completed}">${task.taskName}</label>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a onclick="deleteTask(${task.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Delete</a></li>
                                <li><a onclick='editTask(${task.id}, "${task.taskName}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Edit</a></li>
                            </ul>
                        </div>            
                    </li>
                `;
                ul.insertAdjacentHTML("beforeend", li);
            }
    
        }
    }

    
}

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document.querySelector("#btnAddNewTask").addEventListener("keypress", function() {
    if(event.key == "Enter") {
        document.getElementById("btnAddNewTask").click();
    }
});

for (let span of filters) {
    span.addEventListener("click", function() {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTask(span.id);
    })
}

function newTask(event) {
    
    if(taskInput.value == "") {
        alert("Enter a task name");
    } else {
        if(!isEditTask) {
            // add
            taskList.push({"id": taskList.length + 1, "taskName": taskInput.value, status: "pending"});
        } else {
            // edit
            for(let task of taskList) {
                if(task.id == editId) {
                    task.taskName = taskInput.value;
                }
                isEditTask = false;
            }

        }
        taskInput.value = "";
        displayTask(document.querySelector("span.active").id);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }

    

    event.preventDefault();
}

function deleteTask(id) {
    let deletedId;

    for(let index in taskList) {
        if(taskList[index].id == id) {
            deletedId = index;
        }
    }

    // deletedId = taskList.findIndex(function(task) {
    //     return task.id == id;
    // })

    // deletedId = taskList.findIndex(task => task.id == id);

    taskList.splice(deletedId, 1);
    displayTask(document.querySelector("span.active").id);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = taskName;
    taskInput.focus();
    taskInput.classList.add("active");

    // console.log("Edit id:", editId);
    // console.log("Edit Mode:", isEditTask);
    
}

btnClear.addEventListener("click", function() {
    taskList.splice(0, taskList.length);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTask();
})

function updateStatus(selectedTask) {
    // console.log(selectedTask.parentElement.lastElementChild)
    let label = selectedTask.nextElementSibling;
    let status;

    if(selectedTask.checked) {
        label.classList.add("checked");
        status = "completed";
    } else {
        label.classList.remove("checked");
        status = "pending";
    }

    for (let task of taskList) {
        if (task.id == selectedTask.id) {
            task.status = status
        }
    }

    displayTask(document.querySelector("span.active").id);

    localStorage.setItem("taskList", JSON.stringify(taskList));

}
