import React, {useState, useEffect} from 'react';
import {  TabPane, Tab, Button, Menu } from 'semantic-ui-react';
import "./popup.sass";
import { CHROME_REQUEST } from '../../constants/CHROME_REQUEST';
import CopySvgIcon from '../Icons/CopySvgIcon';
import BookmarkBorderSvgIcon from '../Icons/BookmarkBorderSvgIcon';
import HistorySvgIcon from '../Icons/HistorySvgIcon';
import LinkItem from './LinkItem';

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
    { menuItem: (
        <Menu.Item key="bookmarksItem">
            <BookmarkBorderSvgIcon className='icon stroke-color'/>
            <div className="tabTitle">Bookmarks</div>
        </Menu.Item>
      ),
      key: "bookmarksTab",
      pane:
        <TabPane>
          <div className="links-list flex-col bookmarks">
            {
              Array.isArray(arrBookmarks) && arrBookmarks.length > 0
                ? arrBookmarks.map(el => <LinkItem linkObj={el}/>)
                : null
            }
          </div>
        </TabPane>
    },
    { menuItem: (
        <Menu.Item key="historyItem">
            <HistorySvgIcon className='icon'/>
            <div className="tabTitle">History</div>
        </Menu.Item>
      ),
      key: "historyTab",
      pane: <TabPane>
        <div className="links-list flex-col bookmarks">
          {
            Array.isArray(arrHistoryLinks) && arrHistoryLinks.length > 0
              ? arrHistoryLinks.map(el => <LinkItem linkObj={el}/>)
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
