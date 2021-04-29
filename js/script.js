{
    let tasks = [{
            content: "przerobić lekcje z kursu",
            done: false,
        },
        {
            content: "zjeść makaron z pesto",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent
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
    }

    bindEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });

    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
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

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
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