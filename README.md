# Twitch-Mod-Chrome-Extension

At the moment, this Chrome Extension pulls the latest followers from the activity feed when you're in moderator view on Twitch. It pulls all follows from the past 4 minutes (customizable in the future). Then, saves them as a .csv file with "/ban {user}" along with a human readable timestamp and a column to mark when banned.

I would like to add richer functionality to make banning easier for mods. And in the future, other tools that mods and content creators can use to keep communities safe.

## How I imagine it can be used. (v 1.0)

The initial idea behind this version is to quickly export a spreadsheet that the mod team can work from.

First, enter follower only mode or sub mode to protect your community. Then user this extension and download a list of followers. Next, you can import that downloaded .csv into a Google Sheet that you have ready and shared with all your mods. Then you can highlight the rows once you've executed the ban command in chat.

## Future Improvements

Some future enhancements I would like to make...in no particular order:

* Make the period of time customizable that it uses to grab followers from the activity feed.
* Clean up the extension's code.
* Make banning happen directly from the extension.
* Future features and enhancements?

## How to Use

Currently this isn't in the Chrome store so you will have to run it in development mode. Getting it added to the Chrome Web Store so you can install it like any other extension.

But if you need to use it now it's pretty easy to download this and run it in development mode.

### Install from the Chrome Web Store:

Coming soon.

### Run in development mode:

Note: These are the instructions from Google's Dev docs: https://developer.chrome.com/docs/extensions/mv3/getstarted/

1. Open the Extension Management page by navigating to `chrome://extensions`.
   * Alternatively, open this page by clicking on the Extensions menu button and selecting Manage Extensions at the bottom of the menu.
   * Alternatively, open this page by clicking on the Chrome menu, hovering over More Tools then selecting Extensions
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the Load unpacked button and select the extension directory.

![Loading an unpacked extension](https://developer-chrome-com.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vOu7iPbaapkALed96rzN.png?auto=format&w=1126)

## Future Development

If you're interested in helping please feel free to pull this repo down and make your changes in a branch. Then submit those changes as a pull request. I will review the changes and fold it in to the master branch, if it includes a feature or enhancement that makes sense for this extension.