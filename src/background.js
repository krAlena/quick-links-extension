chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRecentBookmarks") {
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
      let strSearch = "";
      if ((typeof request === "object") && request.strSearch !== undefined){
        strSearch = request.strSearch;
      }

      chrome.bookmarks.search(strSearch, function(response) {
        sendResponse({bookmarks: response});
      });
      return true; // Indicate that the response will be sent asynchronously
    }
    else if (request.action === "getHistoryLinks"){
        let strSearch = "";
        if ((typeof request === "object") && request.strSearch !== undefined){
          strSearch = request.strSearch;
        }

        // Define the query parameters
        let query = {
          text: strSearch, // Empty string to retrieve all history
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
        });

        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
    else if (request.action === "deleteBookmark") {
      if ((typeof request === "object") && request.id !== undefined){
        chrome.bookmarks.remove(request.id, function(response) {
          sendResponse(true);
        })
      }

      return true;
    }
    if (request.action === "deleteHistoryLink") {
      if ((typeof request === "object") && request.lastVisitTime !== undefined){
        chrome.history.deleteRange({
          startTime: request.lastVisitTime,
          endTime: request.lastVisitTime + 1
        }, function(response) {
          sendResponse(true);
        })
      }
      return true;
    }
});
