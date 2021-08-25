function getActivityFeed() {
    if (onTwitch()) {
        let activityFeed = document.body.getElementsByClassName("activity-list-layout");
        let hasActivityFeed = ((activityFeed && activityFeed.length > 0) ? true : false);
        
        if (hasActivityFeed) {
            let compactSearch = document.body.getElementsByClassName("activity-list-layout")[0].querySelectorAll('.activity-base-list-item__compact-mode');
            let compactMode = ((compactSearch && compactSearch.length > 0) ? true : false);

            let prepend = "/ban ";
            let re = /.*\b(([1-4]) (minutes|minute))\b.*|.*\b(this )(minutes|minute)\b.*/g;
            // Additional RegEx for testing
            //let re = /.*\b(([0-9]+) (hours|hour))\b.*|.*\b(this )(hours|hour)\b.*/g;
            let banList = [];
            banList.push(["Command", "TimeStamp", "Banned?"]);

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

            let response = createResponse(banList,[]);
            return response;

        } else {
            console.log("No Activity Feed");
            let response = createResponse([],[{ error: 'No Activity Feed' }]);
            return response;
        }
    } else {
        console.log("Not on Twitch");
        let response = createResponse([],[{ error: 'Not on Twitch' }]);
        return response;
    }
}

function onTwitch() {
    return (!['www.twitch.tv','twitch.tv',].includes(window.location.hostname) ? false : true );
}

function createResponse(banList=[],errors=[]) {
    return [{ banList: banList, errors: errors }];
}

getActivityFeed();