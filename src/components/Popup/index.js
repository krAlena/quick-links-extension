import React, {useState, useEffect} from 'react';


export default function Popup({ }) {
  const [arrBookmarks, setArrBookmarks] = useState([]);
  useEffect(() => {
    injectScript()
  }, [])

  const injectScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let activeTab = tabs[0];
      chrome.runtime.sendMessage({ action: 'injectContentScript', tabId: activeTab.id}, function(response) {
        getBookmarks()
      });
    });
  }

  const getBookmarks = () => {
    chrome.runtime.sendMessage({action: 'getRecentBookmarks'}, (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        setArrBookmarks(response.bookmarks)
        console.log(response.bookmarks);
        // Update the popup UI with the bookmarks
      }
    });

  };

  return (
    <div style={{width: '500px'}}>
      {
        Array.isArray(arrBookmarks) && arrBookmarks.length > 0
          ? arrBookmarks.map(el => <p>{el.url}</p>)
          : null
      }
      {/* <button onClick={getBookmarks}></button> */}
    </div>
  );
}
