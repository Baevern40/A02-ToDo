const inputTodo = document.querySelector("#inputTodo");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("ul");
const completed = document.querySelector("#completed");
const errorMsg = document.querySelector("#errorMsg");

let completedTasks = 0;
const myTodo = [];

addBtn.addEventListener("click", function () {
  const text = inputTodo.value;
  if (text.length < 1) {
    errorMsg.innerHTML = "Input must not be empty";
    errorMsg.classList.add("animated")

    setTimeout(function () {
      errorMsg.classList.remove("animated")
    }, 1000)
  } else {
    errorMsg.innerHTML = "";
    const todoObject = {
      text: text,
      completed: false
    };
    myTodo.push(todoObject);

    const listItem = document.createElement("li");
    list.appendChild(listItem);
    listItem.classList.add("animated")

    const itemLabel = document.createElement("span");
    itemLabel.textContent = todoObject.text;
    listItem.appendChild(itemLabel);

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&#128465";
    listItem.appendChild(removeBtn);

    listItem.addEventListener("click", function () {
      todoObject.completed = !todoObject.completed;
      listItem.classList.toggle("checked");
      if (todoObject.completed) {
        completedTasks++;
      } else {
        completedTasks--;
      }
      completed.innerHTML = `${completedTasks} completed`;
    });

    removeBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (todoObject.completed) {
        completedTasks--;
      }
      const index = myTodo.indexOf(todoObject);
      if (index !== -1) {
        myTodo.splice(index, 1);
      }
      listItem.remove();
      completed.innerHTML = `${completedTasks} completed`;
    });
  }

  inputTodo.value = "";
});