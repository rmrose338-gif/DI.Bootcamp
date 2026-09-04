const tasks = [];
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const listTasks = document.querySelector(".listTasks");
const formMessage = document.querySelector("#form-message");
const taskCount = document.querySelector("#task-count");

function updateTaskCount() {
	const count = tasks.length;
	taskCount.textContent = `${count} ${count === 1 ? "task" : "tasks"}`;
}

function renderTasks() {
	listTasks.replaceChildren();
	if (tasks.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.className = "empty-state";
		emptyMessage.textContent = "Your task list is clear.";
		listTasks.append(emptyMessage);
		updateTaskCount();
		return;
	}

	tasks.forEach((task) => {
		const taskElement = document.createElement("div");
		taskElement.className = `task-item${task.done ? " completed" : ""}`;
		taskElement.dataset.taskId = task.task_id;

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = task.done;
		checkbox.id = `task-${task.task_id}`;
		checkbox.addEventListener("change", () => doneTask(task.task_id));

		const label = document.createElement("label");
		label.className = "task-label";
		label.htmlFor = checkbox.id;
		label.textContent = task.text;

		const deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.className = "delete-button";
		deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
		deleteButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true">&#10005;</i>';
		deleteButton.addEventListener("click", () => deleteTask(task.task_id));

		taskElement.append(checkbox, label, deleteButton);
		listTasks.append(taskElement);
	});
	updateTaskCount();
}

function addTask(event) {
	event.preventDefault();
	const text = taskInput.value.trim();
	if (!text) {
		formMessage.textContent = "Please enter a task first.";
		taskInput.focus();
		return;
	}

	tasks.push({ task_id: tasks.length, text, done: false });
	taskInput.value = "";
	formMessage.textContent = "";
	renderTasks();
	taskInput.focus();
}

function doneTask(taskId) {
	const task = tasks.find((item) => item.task_id === taskId);
	if (task) {
		task.done = !task.done;
		renderTasks();
	}
}

function deleteTask(taskId) {
	const taskIndex = tasks.findIndex((task) => task.task_id === taskId);
	if (taskIndex !== -1) {
		tasks.splice(taskIndex, 1);
		renderTasks();
	}
}

taskForm.addEventListener("submit", addTask);
renderTasks();
