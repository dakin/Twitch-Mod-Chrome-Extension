let minuteSelect = document.getElementById("minutes");
let selectedClassName = "current";
const presetMinutes = [1, 2, 5, 10, 15];

/*function handleButtonClick(event) {
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    let minutes = event.target.dataset.mins;

    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ maxMinutes:minutes });
}

function constructOptions(buttonMinutes) {
    chrome.storage.sync.get(["maxMinutes"], (data) => {
        let currentMinutes = data.maxMinutes;
        console.log(data.maxMinutes);

        for (let buttonMinute of buttonMinutes) {
            let button = document.createElement("button");
            button.innerText = buttonMinute + " Min";
            button.dataset.mins = buttonMinute;

            //console.log("buttonMinute: " + buttonMinute);
            //console.log("currentMinutes: " + currentMinutes);

            if (buttonMinute === currentMinutes) {
                console.log("selected");
                button.classList.add(selectedClassName);
            }

            button.addEventListener("click", handleButtonClick);
            minuteSelect.appendChild(button);
        }
    });
}

constructOptions(presetMinutes);*/