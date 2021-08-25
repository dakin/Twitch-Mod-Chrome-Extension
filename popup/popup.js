let currentTimeContainer = document.getElementById("currentTime");
let grabActivityFeed = document.getElementById("grabActivityFeed");

chrome.storage.sync.get(["maxMinutes"], ({ maxMinutes }) => {
    currentTimeContainer.innerText = "Maximum Minutes: " + maxMinutes;
});

grabActivityFeed.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let downloads = document.getElementById("download");

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getActivityFeed,
    }, (results) => {
        let banList = results[0].result;
        if (banList.length > 1) {
            let csv = "data:text/csv;charset=utf-8," + banList.map(e => e.join(",")).join("\n");
            console.log(csv);
            
            let encodedUri = encodeURI(csv);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "banlist.csv");
            downloads.appendChild(link);

            link.click();
        } else {
            console.log('No users to Ban');
        }
    });
});

function getActivityFeed() {
    let activityFeed = document.body.getElementsByClassName("activity-list-layout");
    let compactSearch = document.body.getElementsByClassName("activity-list-layout")[0].querySelectorAll('.activity-base-list-item__compact-mode');
    let compactMode = ((compactSearch.length > 0) ? true : false);

    let prepend = "/ban ";
    let re = /.*\b(([1-4]) (minutes|minute))\b.*|.*\b(this )(minutes|minute)\b.*/g;
    // Additional RegEx for testing
    //let re = /.*\b(([0-9]+) (hours|hour))\b.*|.*\b(this )(hours|hour)\b.*/g;
    let banList = [];
    banList.push(["Command", "TimeStamp", "Banned?"]);

    if (activityFeed.length !== 0) {
        let follows = document.body.getElementsByClassName("activity-list-layout")[0].getElementsByClassName("activity-feed-event--follow");
        for (let follow of follows) {
            if (compactMode) {
                let followContainer = follow.parentElement.getElementsByClassName("activity-base-list-item__subtitle");
                for (let title of followContainer) {
                    let users = title.querySelectorAll('button');
                    let time = title.querySelectorAll('span')[5].innerText;
                    let timeMatch = re.exec(time);

                    if (timeMatch) {
                        for (let user of users) {
                            console.log(prepend + user.innerText);
                            banList.push([prepend + user.innerText, time, ""]);
                        }
                    } 
                }
            } else {
                let followContainer = follow.parentElement.parentElement;

                let user = followContainer.children[0].children[1].querySelectorAll('button')[0].innerText;
                let time = followContainer.children[1].children[2].innerText;

                let timeMatch = re.exec(time);

                if (timeMatch) {
                    console.log(prepend + user);
                    banList.push([prepend + user, time, ""]);
                } 
            }
        }
        return banList;
    } else {
        console.log("Not in Mod View");
    }
}