// Mina DOM element
const inputTodo = document.querySelector("#inputTodo");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("ul");
const completed = document.querySelector("#completed");
const errorMsg = document.querySelector("#errorMsg");

let completedTasks = 0;
const myTodo = [];

/* Min ToDo function. All logik som sker i samband med min ToDo-list
ska skrivas här inne.*/
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

    // Själva logiken i en Todo. Här skapar jag DOM element som även appendas av parent elementet så det syns i webben.
    const listItem = document.createElement("li");
    list.appendChild(listItem);
    listItem.classList.add("animated")

    const itemLabel = document.createElement("span");
    itemLabel.textContent = todoObject.text;
    listItem.appendChild(itemLabel);

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&#128465";
    listItem.appendChild(removeBtn);

    /* Här ändrar jag min object key. Jag kollar även ifall mitt element har klassen .checked eller inte. För att uppdatera completedTasks.  */
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

    /* När man trycker på papperskorgen tas objektet bort från arrayen.
    För att slippa få en bugg var jag tvungen att använda .stopPropagation(),
    som gör att eventet inte aktiveras på något annat element. */
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