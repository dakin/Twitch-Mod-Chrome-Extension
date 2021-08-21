// Background Service
// background.js

let color = '#3aa757';
let twitchUser = "";
let currentModChannel = "";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
    chrome.storage.sync.set({ twitchUser });
    chrome.storage.sync.set({ currentModChannel });
});