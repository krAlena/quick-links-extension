// Listen for messages from the background or popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getHTML') {
    // Send back the current page's HTML content
    sendResponse({ html: document.documentElement.outerHTML });
  }
//   if (request.action === 'getBookmarks') {
//     chrome.bookmarks.getRecent(
//         10,
//         (response) => {
//             console.log("1: " + response)
//             sendResponse(response)
//         }
//     )
//   }
});