chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'injectContentScript') {
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        files: ['contentScript.js']
      }, () => {
        console.log('Content script injected via message');
        sendResponse({ status: 'injected' });
      });
      return true;  // Ensures the message channel stays open for async response
    }
    else if (request.action === 'getRecentBookmarks') {
        chrome.bookmarks.getRecent(10, (response) => {
          if (chrome.runtime.lastError) {
            sendResponse({error: chrome.runtime.lastError.message});
          } else {
            sendResponse({bookmarks: response});
          }
        });
        return true; // Indicate that the response will be sent asynchronously
      }
});
