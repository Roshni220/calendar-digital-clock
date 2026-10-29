
let current = new Date();
let selected = new Date();
let events = JSON.parse(localStorage.getItem("events") || "{}");

function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleTimeString();

    document.getElementById("date").textContent =
        new Date().toDateString();
}

function showCalendar() {
    let year = current.getFullYear();
    let month = current.getMonth();

    document.getElementById("month").textContent =
        current.toLocaleDateString("en", {
            month: "long",
            year: "numeric"
        });

    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    let first = new Date(year, month, 1).getDay();
    let total = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < first; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= total; day++) {
        let button = document.createElement("button");
        let key = year + "-" + month + "-" + day;

        button.textContent = day;

        if (day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()) {
            button.classList.add("today");
        }

        if (events[key] && events[key].length) {
            button.classList.add("event");
        }

        button.onclick = function () {
            selected = new Date(year, month, day);
            showEvents();
        };

        button.ondblclick = function () {
            selected = new Date(year, month, day);
            addEvent();
        };

        calendar.appendChild(button);
    }
}

function changeMonth(amount) {
    current.setMonth(current.getMonth() + amount);
    showCalendar();
}

function showEvents() {
    let key = selected.getFullYear() + "-" +
        selected.getMonth() + "-" + selected.getDate();

    document.getElementById("selectedDate").textContent =
        selected.toDateString();

    let list = document.getElementById("events");
    list.innerHTML = "";

    (events[key] || []).forEach(function (event, index) {
        let p = document.createElement("p");
        p.textContent = event;

        let button = document.createElement("button");
        button.textContent = "Delete";

        button.onclick = function () {
            events[key].splice(index, 1);
            localStorage.setItem("events", JSON.stringify(events));
            showCalendar();
            showEvents();
        };

        p.appendChild(button);
        list.appendChild(p);
    });
}

function addEvent() {
    let event = prompt("Enter event or reminder:");

    if (!event) return;

    let key = selected.getFullYear() + "-" +
        selected.getMonth() + "-" + selected.getDate();

    if (!events[key]) events[key] = [];

    events[key].push(event);

    localStorage.setItem("events", JSON.stringify(events));

    showCalendar();
    showEvents();
}

setInterval(updateClock, 1000);
updateClock();
showCalendar();
showEvents();
