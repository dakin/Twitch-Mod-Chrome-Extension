// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let grabActivityFeed = document.getElementById("grabActivityFeed");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

grabActivityFeed.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getActivityFeed,
    });
});

function setPageBackgroundColor() {
    /*chrome.runtime.sendMessage({}, function(response) {
        console.log("change color");
        console.log(response);
    });*/
    console.log("test");
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function getActivityFeed() {
    // activity-list-layout
    //  activity-base-list-item__title
    //       activity-feed-event--follow

    // activity-list-layout
    //   activity-base-list-item
    //     activity-base-list-item__compact-mode
    //       activity-feed-event--follow
    //       activity-base-list-item__subtitle
    //         button - has username in it
    let activityFeed = document.body.getElementsByClassName("activity-list-layout");
    let compactSearch = document.body.getElementsByClassName("activity-list-layout")[0].querySelectorAll('.activity-base-list-item__compact-mode');
    let compactMode = ((compactSearch.length > 0) ? true : false);

    let prepend = "/ban ";
    let banList = [];
    banList.push(["Command", "TimeStamp", "Banned?"]);

    if (activityFeed.length !== 0) {
        let follows = document.body.getElementsByClassName("activity-list-layout")[0].getElementsByClassName("activity-feed-event--follow");
        for (let follow of follows) {
            if (compactMode) {
                let followContainer = follow.parentElement.getElementsByClassName("activity-base-list-item__subtitle");
                for (let title of followContainer) {
                    let users = title.querySelectorAll('button')
                    //let re = /.*\b(([1-2]) (minutes|minute))\b.*|.*\b(this )(minutes|minute)\b.*/g;
                    let re = /.*\b(([0-9]+) (hours|hour))\b.*|.*\b(this )(hours|hour)\b.*/g;
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

                //let re = /.*\b(([1-2]) (minutes|minute))\b.*|.*\b(this )(minutes|minute)\b.*/g;
                let re = /.*\b(([0-9]+) (hours|hour))\b.*|.*\b(this )(hours|hour)\b.*/g;
                let timeMatch = re.exec(time);

                if (timeMatch) {
                    console.log(prepend + user);
                    banList.push([prepend + user, time, ""]);
                } 
            }
        }
        //console.log(banList);
        let csv = "data:text/csv;charset=utf-8,"
            + banList.map(e => e.join(",")).join("\n");
        console.log(csv);
        //let encodedUri = encodeURI(csv);
        //window.open(encodedUri);
    } else {
        console.log("Not in Mod View");
    }
}