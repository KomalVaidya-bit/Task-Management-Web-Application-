console.log("script.js loaded");

const API = "http://localhost:5000/api/tasks";
let tasks = [];
let activeFilter = "all";
let editingTaskId = null; 

const modal = document.getElementById("modal");
const emptyState = document.getElementById("emptyState");
const taskGrid = document.getElementById("taskGrid");
const filters = document.getElementById("filters");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  editingTaskId = null;
  document.getElementById("addTaskBtn").innerText = "Add Task";
}

document.getElementById("openModal").onclick = openModal;


async function loadTasks() {
  try {
    const res = await fetch(API);
    tasks = await res.json();
    updateUI();
  } catch (err) {
    console.error("Failed to load tasks", err);
  }
}


function updateUI() {
  if (tasks.length === 0) {
    emptyState.style.display = "block";
    taskGrid.style.display = "none";
    filters.classList.add("hidden");
  } else {
    emptyState.style.display = "none";
    taskGrid.style.display = "grid";
    filters.classList.remove("hidden");
    updateCounts();
    renderTasks();
  }
}

function updateCounts() {
  document.getElementById("count-all").innerText = tasks.length;
  document.getElementById("count-pending").innerText =
    tasks.filter(t => t.status === "Pending").length;
  document.getElementById("count-progress").innerText =
    tasks.filter(t => t.status === "In Progress").length;
  document.getElementById("count-completed").innerText =
    tasks.filter(t => t.status === "Completed").length;
}

// FILTER 
function applyFilter(filter) {
  activeFilter = filter;
  renderTasks();
}

// RENDER
function renderTasks() {
  taskGrid.innerHTML = "";

  const filtered =
    activeFilter === "all"
      ? tasks
      : tasks.filter(t => t.status === activeFilter);

  filtered.forEach(t => {
    taskGrid.innerHTML += `
      <div class="task-card">
        <h4>${t.title}</h4>
        <p>${t.description}</p>

        <span class="badge ${t.status.replace(" ", "-")}">${t.status}</span>

        <div class="actions">
          <button onclick="editTask('${t._id}')">Edit</button>
          <button onclick="deleteTask('${t._id}')">Delete</button>
        </div>
      </div>
    `;
  });
}

// ADD / UPDATE
async function addTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const status = document.getElementById("status").value;

  if (!title || !description) {
    alert("Title and Description required");
    return;
  }

  // EDIT MODE
  if (editingTaskId) {
    await fetch(`${API}/${editingTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status })
    });
  } 
  //  ADD MODE
  else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status })
    });
  }

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("status").value = "Pending";

  closeModal();
  loadTasks();
}

// EDIT 
function editTask(id) {
  const task = tasks.find(t => t._id === id);
  if (!task) return;

  editingTaskId = id;

  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("status").value = task.status;

  document.getElementById("addTaskBtn").innerText = "Update Task";
  openModal();
}

//  DELETE 
async function deleteTask(id) {
  if (!confirm("Delete this task?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTasks();
}

//  EVENTS 
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Initial load
loadTasks();

