let currentTimeContainer = document.getElementById("currentTime");
let grabActivityFeed = document.getElementById("grabActivityFeed");
let downloads = document.getElementById("download");
let notificationList = document.getElementById("notifications");


chrome.storage.sync.get(["maxMinutes"], ({ maxMinutes }) => {
    let timeButton = document.createElement("button");
    //currentTimeContainer.innerText = "Maximum Minutes: " + maxMinutes;
    timeButton.innerHTML = '<span class="material-icons">history</span>' + 4 + ' mins';
    timeButton.classList.add('light');
    currentTimeContainer.appendChild(timeButton);
});

chrome.storage.sync.get(["activityTime"], ({ activityTime }) => {
    //console.log(activityTime);
});

grabActivityFeed.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["popup/js/activity.js"],
    }, handleActivityResults);
});

function handleActivityResults(results) {
    let result = results[0].result[0];
    //console.log(results);

    let errors = result.errors;
    let banList = result.banList;

    //console.log(errors);
    //console.log(banList);
    clearNotifications();
    
    if (errors && errors.length > 0) {
        for (let error of errors) {
            console.log(error.error);
            addNotification(error.error);
        }
    } else if (banList && banList.length > 1) {
        let csv = "data:text/csv;charset=utf-8," + banList.map(e => e.join(",")).join("\n");
        console.log(csv);
        
        let encodedUri = encodeURI(csv);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "banlist.csv");
        downloads.appendChild(link);

        link.click();
        addNotification('Downloading CSV with ' + (banList.length - 1) + ' users.');
    } else {
        console.log('No users to Ban');
        addNotification('No Users to Ban');
    }
}

function addNotification(message) {
    let notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = message;
    notificationList.appendChild(notification);
}

function clearNotifications() {
    notificationList.innerHTML = "";
}