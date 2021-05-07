{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const clearFormText = () => {
        const formText = document.querySelector(".js-newTask");
        formText.value = "";
        formText.focus();
    };

    bindRemoveEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    bindAddEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });

    };

    const renderTasks = () => {
        let htmlTasksString = "";

        if (hideDoneTasks === false) {
            for (const task of tasks) {
                htmlTasksString += `
            <span class="list__item">
            <button class="list__buttonToggle js-done">
            ${task.done ? "✔" : ""}
            </button>
            <li class="list__text js-text
            ${task.done ? "list-text--done" : ""}
            " 
            >
            ${task.content}
            </li>
            <button class="list__buttonRemove js-remove">🗑️</button>
            </span>
            `;
            };
            document.querySelector(".js-tasks").innerHTML = htmlTasksString;
        } else {
            for (const task of tasks.filter(({ done }) => !done)) {
                htmlTasksString += `
            <span class="list__item">
            <button class="list__buttonToggle js-done">
            ${task.done ? "✔" : ""}
            </button>
            <li class="list__text js-text
            ${task.done ? "list-text--done" : ""}
            " 
            >
            ${task.content}
            </li>
            <button class="list__buttonRemove js-remove">🗑️</button>
            </span>
            `;
            };
            document.querySelector(".js-tasks").innerHTML = htmlTasksString;

        }

    };
    const renderButtons = () => {
        let sectionContainer = document.querySelector(".js-sectionContainer");

        let htmlHeaderString = `
        <h2 class = "section__header">Lista zadań</h2>
        `;

        let htmlButtonString = "";

        switch (tasks.length) {
            case 0:
                sectionContainer.innerHTML = htmlHeaderString;
                htmlButtonString += `
                <button class="section__button--none" disabled></button>
                <button class="section__button--none" disabled></button>
        `
                sectionContainer.innerHTML += htmlButtonString;
                break;
            case 1:
                sectionContainer.innerHTML = htmlHeaderString;
                htmlButtonString += `
                <button class="section__button js-hideDone ">Ukryj ukończone</button>
                <button class="section__button js-markDoneAll">Ukończ wszystkie</button>
        `
                sectionContainer.innerHTML += htmlButtonString;
                break;
        };
    };

    const toggleMarkDoneAllButton = (markDoneAllButton) => {

        let isEveryTaskDone = tasks.every(({ done }) => done);

        if (tasks.length > 0) {
            if (isEveryTaskDone === true) {
                return markDoneAllButton.disabled = true;
            } else {
                return markDoneAllButton.disabled = false;
            };
        }
    }
    const bindButtonEvents = () => {

        const hideDoneButton = document.querySelector(".js-hideDone");
        const markDoneAllButton = document.querySelector(".js-markDoneAll");

        switch (tasks.length) {
            case 0:
                break;
            case 1:
                markDoneAllButton.addEventListener("click", () => {
                    tasks.forEach((task, taskIndex) => {
                        if (task.done === false) {
                            toggleTaskDone(taskIndex);
                        }
                    });
                });

                hideDoneButton.addEventListener("click", () => {
                    hideDoneTasks = !hideDoneTasks;
                    hideDoneTasks === false ? hideDoneButton.innerText = "Ukryj ukończone" : hideDoneButton.innerText = "Pokaż ukończone";
                    render();
                });

                break;
        };

    };

    const render = () => {

        renderTasks();
        renderButtons();

        toggleMarkDoneAllButton(document.querySelector(".js-markDoneAll"));

        bindRemoveEvents();
        bindAddEvents();
        bindButtonEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            const formText = document.querySelector(".js-newTask");
            formText.focus();
            return;
        };

        addNewTask(newTaskContent);

        clearFormText();

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();


}