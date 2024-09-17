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
});