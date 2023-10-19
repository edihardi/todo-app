const listTask = document.querySelector('.listTask');

function getDataUser() {
    //1.get data localstorage
    //2.Convert data ke object
    //3. display ke dom

    const dataUser = localStorage.getItem('user')

    if (dataUser) {
        const conData = JSON.parse(dataUser)

        const imgElm = document.getElementById('img_user')
        imgElm.src = conData.imgUrl

        const usernameElm = document.getElementById('username')
        usernameElm.innerHTML = conData.username
    } else {
        window.location.href = 'login.html'

    }

}

// get taskData from local storage
let taskData = JSON.parse(localStorage.getItem("taskData")) || []

// DOM
window.addEventListener("DOMContentLoaded", () => {
    showAllTask();
    if (!taskData.length) {
      displayTaskData([]);
    }
  });

//   get unique random ID
const getRandomId = () => {
    return Math.random().toString(36).substring(2, 20);
}

//   push task to Array Object
const addTask = () => {
    let todo = {
        id : getRandomId(),
        task : taskName.value,
        completed : false,
        status : "Pending",
        date : new Date()
    };
    taskData.push(todo)
}

// Adding taskData to page
btnSubmit.addEventListener('click', () => {
    if (taskName.value == '') {
        alert('Task Tidak Boleh Kosong')        
    } else {
        addTask()
        saveToLocalStorage()
        showAllTask()
        taskName.value = ''
        taskName.focus()
        alert('Task Berhasil Ditambahkan')
}})

// Show all task on page
const showAllTask = () => {
    listTask.innerHTML = ""
    if (taskData.length === 0) {
        listTask.innerHTML = `<tr><td colspan="5" class="text-center pt-5">Task Masih Kosong</td></tr>`
        return;
    }

    taskData.forEach((myTask) => {
        listTask.innerHTML += `<tr class="flex flex-row justify-between items-center p-[10px] w-full border-b-[1px]" data-id="${myTask.id}">
        <td class="flex flex-row items-center justify-between w-full h-full">${myTask.task}</td>
        <td class="flex flex-row items-center justify-between w-full h-full">${myTask.date || "No due date"}</td>
        <td class="flex flex-row items-center justify-center w-full h-full">${myTask.status}</td>
        <td class="flex flex-row items-center justify-end w-full h-full">
            <button class="bg-yellow-500 w-auto px-2 py-1 m-1 rounded hover:shadow-lg transition duration-300 ease-in-out group" onclick="editTask('${
              myTask.id
            }')">
                <i class="fa-regular fa-pen-to-square group-hover:text-white transition duration-300 ease-in-out"></i>   
            </button>
            <button class="bg-green-500 w-auto px-2 py-1 m-1 rounded hover:shadow-lg transition duration-300 ease-in-out group" onclick="toggleStatus('${
                myTask.id
            }')">
                <i class="fa-solid fa-check  group-hover:text-white transition duration-300 ease-in-out"></i>   
            </button>
            <button class="bg-rose-500 w-auto px-2 py-1 m-1 rounded hover:shadow-lg transition duration-300 ease-in-out group" onclick="deleteTask('${
                myTask.id
            }')">
                <i class="fa-regular fa-trash-can group-hover:text-white transition duration-300 ease-in-out"></i>
            </button>
        </td>
    </tr>`
    })
}

// Save taskData to local storage
const saveToLocalStorage = () => {
    localStorage.setItem('taskData', JSON.stringify(taskData))
}

// Delete Task
const deleteTask = (id) => {
    taskData = taskData.filter((myTask) => myTask.id != id)
    saveToLocalStorage()
    alert('Task Berhasil Dihapus')
    showAllTask()
}

// Edit Task
const editTask = (id) => {
    let myTask = taskData.find((myTask) => myTask.id === id);
    taskName.value = myTask.task;
    taskData = taskData.filter((myTask) => myTask.id !== id);
    btnSubmit.innerHTML = "<i class='fa-solid fa-check'></i>";
    saveToLocalStorage();
    btnSubmit.addEventListener("click", () => {
        btnSubmit.innerHTML = "<i class='fa-solid fa-plus'></i>";
        alert("Task berhasil diupdate");
  });
}

// Completed Task
const toggleStatus = (id) => {
    let myTask = taskData.find((myTask) => myTask.id === id);
  myTask.completed = !myTask.completed;
  console.log('taskData', myTask);
  saveToLocalStorage();
  displayTaskData(taskData);
}

const displayTaskData = (taskDataArray) => {
    listTask.innerHTML = "";
  if (taskDataArray.length === 0) {
    listTask.innerHTML = `<tr><td colspan="5" class="text-center pt-5">Task Masih Kosong</td></tr>`;
    return;
  }
  taskDataArray.forEach((myTask) => {
    listTask.innerHTML += `
            <tr class="flex flex-row justify-between items-center p-[10px] w-full border-b-[1px]" data-id="${myTask.id}">
                <td class="flex flex-row items-center justify-between w-full h-full">${myTask.task}</td>
                <td class="flex flex-row items-center justify-between w-full h-full">${myTask.date || "No due date"}</td>
                <td class="flex flex-row items-center justify-center w-full h-full">${myTask.completed ? "Selesai" : "Pending"}</td>
                <td class="flex flex-row items-center justify-end w-full h-full">
                <button class="bg-yellow-500 w-auto px-2 py-1 m-1 rounded hover:shadow-lg transition duration-300 ease-in-out group" onclick="editTask('${
                    myTask.id
                  }')">
                      <i class="fa-regular fa-pen-to-square group-hover:text-white transition duration-300 ease-in-out"></i>   
                  </button>
                  <button class="bg-green-500 w-auto px-2 py-1 m-1 rounded hover:shadow-lg transition duration-300 ease-in-out group" onclick="toggleStatus('${
                      myTask.id
                  }')">
                      <i class="fa-solid fa-check  group-hover:text-white transition duration-300 ease-in-out"></i>   
                  </button>
                  <button class="bg-rose-500 w-auto px-2 py-1 m-1 rounded hover:shadow-lg transition duration-300 ease-in-out group" onclick="deleteTask('${
                      myTask.id
                  }')">
                      <i class="fa-regular fa-trash-can group-hover:text-white transition duration-300 ease-in-out"></i>
                  </button>
                </td>
            </tr>
    `;
  })
}

function onLogout() {
    localStorage.removeItem('user')
    window.location.href = 'login.html'
}

function convDate(date) {
    const newDate = date

    const jam = newDate.getHours();
    const menit = newDate.getMinutes();


    const hari = newDate.getDay();
    const bulan = newDate.getMonth();
    const tahun = newDate.getFullYear();
    const hasil = `${hari}-${bulan}-${tahun} ${jam}:${menit}`;

    return hasil
}

function conStatus(status) {
    switch (status) {
        case 'todo':
            return 'Todo'
        case 'on_progress':
            return 'On Progress'
        case 'done':
            return 'Done'

    }
}

function displayData() {
    const bodyTable = document.getElementById('body_table')

    taskData.forEach((item) => {
        const rowTable = document.createElement('tr')

        rowTable.innerHTML = `<tr>
            <th>${item.task}</th>
            <th>${conStatus(item.status)}</th>
            <th>${convDate(item.date)}</th>
        </tr>`
        bodyTable.appendChild(rowTable)

    })
}

getDataUser()

displayData()