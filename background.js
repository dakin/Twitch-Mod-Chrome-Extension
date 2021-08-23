// Background Service
// background.js

let twitchUser = "";
let currentModChannel = "";
let maxMinutes = 2;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ twitchUser: twitchUser });
    chrome.storage.sync.set({ currentModChannel: currentModChannel });
    chrome.storage.sync.set({ maxMinutes: maxMinutes });
    console.log('Default minutes: ' + maxMinutes);
});