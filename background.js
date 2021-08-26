// Background Service
// background.js

let twitchUser = "";
let currentModChannel = "";
let maxMinutes = 2;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ twitchUser: twitchUser });
    chrome.storage.sync.set({ currentModChannel: currentModChannel });
    chrome.storage.sync.set({ maxMinutes: maxMinutes });
    chrome.storage.sync.set(
        { 
            activityTime: {
                time: 4,
                unit: 'minutes',
                regex: '/.*\b(([1-4]) (minutes|minute))\b.*|.*\b(this )(minutes|minute)\b.*/g'
            }
        }
    );
    console.log('Default minutes: ' + maxMinutes);
});