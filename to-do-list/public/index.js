const newTaskButton = document.getElementById("newTaskButton");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeModalButton = document.querySelector("#modal form box-icon");
const createTaskButton = document.getElementById("createTaskButton");
const modalInputTitle = document.getElementById("id");
const modalInputDescription = document.getElementById("description");
const tasks = document.getElementById("tasks");
const searchInput = document.getElementById("search");
const url = 'http://localhost:3000/tarefas/';

// metodos
const openNewTaskModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeNewTaskModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const fetchTasks = () => {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            renderTasks(json);
        });
}

fetchTasks();

const renderTasks = (jsonTasks) => {
    tasks.innerHTML = "";
    if (jsonTasks.length > 0) {
        jsonTasks.map(tarefa => {
            tasks.innerHTML += `
                <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions">
                        <box-icon name='trash' size="sm" onclick="deleteTask('${tarefa.id}')"></box-icon>
                    </div>
                </li>
                `
        });
    }
}

const clearModal = () => {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}

const createTask = (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const taskData = {
        titulo: title,
        descricao: description,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData), // Converte o objeto JavaScript para uma string JSON
    });

    fetchTasks();
    closeNewTaskModal();
    clearModal();
}

const deleteTask = (id) => {
    const response = fetch(url + id, {
        method: 'DELETE', // Use o método HTTP DELETE para exclusão
        headers: {
            'Content-Type': 'application/json', // Opcional, dependendo da sua API
            // Adicione outros headers de autenticação se necessário
        },
        // Opcional: Você pode enviar um corpo na requisição DELETE se precisar de mais informações
        //  body: JSON.stringify({id: id})
    });
    fetchTasks();
};

const filterCards = () => {
    const text = searchInput.value;
    const taskList = document.querySelectorAll("#tasks li");

    if (text.length > 0){
        taskList.forEach(task =>{
            if(!task.children[0].innerText.includes(text)){
                task.classList.add("hidden")
            } else {
                task.classList.remove("hidden");
            }
        })
    } else {
        fetchTasks();
    }
}

// event listeners
newTaskButton.addEventListener("click", openNewTaskModal);
closeModalButton.addEventListener("click", closeNewTaskModal);
overlay.addEventListener("click", closeNewTaskModal);
createTaskButton.addEventListener("click", createTask);
searchInput.addEventListener("keyup", filterCards);