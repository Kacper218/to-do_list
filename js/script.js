{
    const tasks = [{
            content: "przerobić lekcje z kursu",
            done: false,
        },
        {
            content: "zjeść makaron z pesto",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();

}