"use strict";

let taskList = [
    // {"id":1, "taskName": "Task 1"},
    // {"id":2, "taskName": "Task 2"},
    // {"id":3, "taskName": "Task 3"},
    // {"id":4, "taskName": "Task 4"},
];

let editId;
let isEditTask = false;

let taskInput = document.querySelector("#txtTaskName");

displayTask();

function displayTask() {
    
    let ul = document.getElementById("task-list");

    ul.innerHTML = "";

    for(let task of taskList) {
        let li = `
            <li class="task list-group-item">
                <div class="form-check">
                    <input type="checkbox" id="${task.id}" class="form-check-input">
                    <label for="${task.id}" class="form-check-label">${task.taskName}</label>
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

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document.querySelector("#btnAddNewTask").addEventListener("keypress", function() {
    if(event.key == "Enter") {
        document.getElementById("btnAddNewTask").click();
    }
});

function newTask(event) {
    
    if(taskInput.value == "") {
        alert("Enter a task name");
    } else {
        if(!isEditTask) {
            // add
            taskList.push({"id": taskList.length + 1, "taskName": taskInput.value});
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
        displayTask();
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
    displayTask();
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

