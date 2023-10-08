window.addEventListener('load', (e) => {
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector("#new-task-input")
    const listEl = document.querySelector("#tasks")

    function createTaskElement(task) {
        const taskEl = document.createElement("div")
        taskEl.classList.add("task")

        const taskContentEl = document.createElement("div")
        taskContentEl.classList.add("content")
        
        taskEl.appendChild(taskContentEl)

        const taskInputEl = document.createElement("input")
        taskInputEl.classList.add("text")
        taskInputEl.type = "text"
        taskInputEl.value = task
        taskInputEl.setAttribute("readonly", "readonly")
        taskContentEl.appendChild(taskInputEl)

        const taskActionEl = document.createElement("div")
        taskActionEl.classList.add("actions")
        taskEl.appendChild(taskActionEl)

        const taskEdit = document.createElement("button")
        taskEdit.classList.add("edit")
        taskEdit.textContent = "edit"

        taskActionEl.appendChild(taskEdit)

        const taskDelete = document.createElement("button")
        taskDelete.classList.add("delete")
        taskDelete.textContent = "delete"

        taskActionEl.appendChild(taskDelete)

        taskDelete.addEventListener('click', () => {
            listEl.removeChild(taskEl)
            storeTasks()
        })

        taskEdit.addEventListener('click', (e) => {
            if (taskEdit.textContent == "edit") {
                taskInputEl.removeAttribute("readonly")
                taskInputEl.style.backgroundColor = "var(--darker)"
                taskEdit.textContent = "save"
                storeTasks()
            } else {
                taskInputEl.setAttribute("readonly", "readonly")
                taskEdit.textContent = "edit"
                taskInputEl.style.backgroundColor = "transparent"
                storeTasks()
            }
        })


        listEl.appendChild(taskEl);
    }

    let saveTasks = JSON.parse(localStorage.getItem("tasks"))
    console.log(saveTasks)
    if (saveTasks) {
        saveTasks.forEach(task => {
            createTaskElement(task);
        });
    }

    function storeTasks() {
        const tasks = Array.from(listEl.children).map((task) => task.querySelector(".text").value)

        localStorage.setItem("tasks", JSON.stringify(tasks))

        input.value = " "
    }

    form.addEventListener('submit', (e1) => {
        e1.preventDefault()


        const task = input.value
        createTaskElement(task)

        if (!task) {
            alert("Please enter a task")
        }

        storeTasks()


    })
})
