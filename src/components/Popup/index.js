import React, {useState, useEffect} from 'react';
import {  TabPane, Tab, Button } from 'semantic-ui-react';
import "./popup.sass";
import { CHROME_REQUEST } from '../../constants/CHROME_REQUEST';

export default function Popup({ }) {
  const [arrBookmarks, setArrBookmarks] = useState([]);
  const [arrHistoryLinks, setArrHistoryLinks] = useState([]);

  useEffect(() => {
    injectScript()
  }, [])

  const injectScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let activeTab = tabs[0];
      chrome.runtime.sendMessage({ action: CHROME_REQUEST.injectScript, tabId: activeTab.id}, function(response) {
        getBookmarks();
        getHistory();
      });
    });
  }

  const getHistory = () => {
    chrome.runtime.sendMessage({action: CHROME_REQUEST.getHistoryLinks}, (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        setArrHistoryLinks(response.links);
      }
    });

  };

  const getBookmarks = () => {
    chrome.runtime.sendMessage({action: CHROME_REQUEST.getRecentBookmarks}, (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        setArrBookmarks(response.bookmarks);
      }
    });

  };

  const panes = [
    { menuItem: "Bookmarks", pane: <TabPane>
        <div className="links-list bookmarks">
          {
            Array.isArray(arrBookmarks) && arrBookmarks.length > 0
              ? arrBookmarks.map(el => <div className='link-row'><a href={el.url}>{el.title}</a></div>)
              : null
          }
      </div>
    </TabPane> },
    { menuItem: 'History', pane: <TabPane>
        <div className="links-list bookmarks">
          {
            Array.isArray(arrHistoryLinks) && arrHistoryLinks.length > 0
              ? arrHistoryLinks.map(el => <div className='link-row'><a href={el.url}>{el.title}</a></div>)
              : null
          }
        </div>
      </TabPane>
    }
  ]

  return (
    <Tab panes={panes} renderActiveOnly={false}/>
  );
}
