chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "injectScript") {
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        files: ['contentScript.js']
      }, () => {
        console.log('Content script injected via message');
        sendResponse({ status: 'injected' });
      });
      return true;  // Ensures the message channel stays open for async response
    }
    else if (request.action === "getRecentBookmarks") {
        chrome.bookmarks.getRecent(20, (response) => {
          if (chrome.runtime.lastError) {
            sendResponse({error: chrome.runtime.lastError.message});
          } else {
            sendResponse({bookmarks: response});
          }
        });
        return true; // Indicate that the response will be sent asynchronously
    }
    else if (request.action === "searchByBookmarks"){
      chrome.bookmarks.search(request.strSearch, function(response) {
        sendResponse({bookmarks: response});
      });
      return true; // Indicate that the response will be sent asynchronously
    }
    else if (request.action === "getHistoryLinks"){
        // Define the query parameters
        let query = {
          text: request.strSearch, // Empty string to retrieve all history
          startTime: 0, // Start time in milliseconds since epoch
          maxResults: 20 // Number of results to return
        };

        // Query the history API
        chrome.history.search(query, function(response) {
          if (chrome.runtime.lastError) {
            sendResponse({error: chrome.runtime.lastError.message});
          } else {
            sendResponse({links: response});
          }
          // // Process results
          // response.forEach((entry) => {
          //   console.log(`URL: ${entry.url}, Title: ${entry.title}, Last Visit Time: ${new Date(entry.lastVisitTime)}`);
          // });
        });

        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});
