import React, {useState, useEffect, Fragment} from 'react';
import {  TabPane, Tab, Button, Menu, Input } from 'semantic-ui-react';
import "./popup.sass";
import { CHROME_REQUEST } from '../../constants/CHROME_REQUEST';
import BookmarkBorderSvgIcon from '../Icons/BookmarkBorderSvgIcon';
import HistorySvgIcon from '../Icons/HistorySvgIcon';
import LinkItem from './LinkItem';
import SearchInput from '../Common/SearchInput';
import LinksTab from './LinksTab';
import { LINK_ROW_MODE } from '../../constants/LINK_ROW_MODE';

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

  const getHistory = (strSearch="") => {
    chrome.runtime.sendMessage({action: CHROME_REQUEST.getHistoryLinks, strSearch}, (response) => {
      console.log(response)
      if (response.error) {
        console.error(response.error);
      } else {
        setArrHistoryLinks(response.links);
      }
    });

  };

  const getBookmarks = () => {
    chrome.runtime.sendMessage({action: CHROME_REQUEST.getRecentBookmarks}, (response) => {
      console.log(response)
      if (response.error) {
        console.error(response.error);
      } else {
        setArrBookmarks(response.bookmarks);
      }
    });

  };

  const loadMore = () => {

  }

  const searchBookmarks = (strSearch) => {
    if (strSearch !== ""){
      chrome.runtime.sendMessage({action: CHROME_REQUEST.searchByBookmarks, strSearch}, (response) => {
        console.log(response)
        if (response.error) {
          console.error(response.error);
        } else {
          setArrBookmarks(response.bookmarks);
        }
      });
    }
    else {
      getBookmarks();
    }
  }

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
          <LinksTab arrLinks={arrBookmarks} functionSearch={searchBookmarks} mode={LINK_ROW_MODE.bookmarkLink}/>
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
        <LinksTab arrLinks={arrHistoryLinks} functionSearch={getHistory} mode={LINK_ROW_MODE.historyLink}/>
      </TabPane>
    }
  ]

  return (
    <Tab panes={panes} renderActiveOnly={false}/>
  );
}
