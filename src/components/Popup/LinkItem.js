import React, { useState } from 'react';
import { getDateTimeInStrFormat, isEmptyObj } from "../../helpers/globalFuncs";
import CopySvgIcon from "../Icons/CopySvgIcon";
import DeleteSvgIcon from "../Icons/DeleteSvgIcon";
import GoToSvgIcon from '../Icons/GoToSvgIcon';
import ExportSvgIcon from '../Icons/ExportSvgIcon';
import { LINK_ROW_MODE } from '../../constants/LINK_ROW_MODE';
import { CHROME_REQUEST } from '../../constants/CHROME_REQUEST';
import { Popup } from 'semantic-ui-react';

export default function LinkItem({mode, linkObj, callbackAfterDel}) {
const [isCopiedLink, setIsCopiedLink] = useState(false);
const [isActiveDelIcon, setIsActiveDelIcon] = useState(false);

const copyLink = () => {
    let linkUrl = '';

    if (!isEmptyObj(linkObj)){
        linkUrl = linkObj.url;
        navigator.clipboard.writeText(linkUrl);
        setIsCopiedLink(true);
        setTimeout(function(){
            setIsCopiedLink(false);
        }, 1000);
    }
}

const goToLink = () => {
    let linkUrl = '';

    if (!isEmptyObj(linkObj)){
        linkUrl = linkObj.url;
        window.open(linkUrl, "_blank");
    }
}

const askBeforeDeleteLink = () => {
    setIsActiveDelIcon(true)
}

const deleteLink = () => {
    setIsActiveDelIcon(false)
    if (!isEmptyObj(linkObj)){
        if (mode === LINK_ROW_MODE.bookmarkLink) {
            chrome.runtime.sendMessage({action: CHROME_REQUEST.deleteBookmark, id: linkObj.id}, (response) => {
                if (response.error) {
                  console.error(response.error);
                } else {
                  callbackAfterDel(linkObj.id);
                }
            });
        }
        else if (mode === LINK_ROW_MODE.historyLink) {
            console.log('del history')
            chrome.runtime.sendMessage({action: CHROME_REQUEST.deleteHistoryLink, lastVisitTime: linkObj.lastVisitTime}, (response) => {
                if (response.error) {
                  console.error(response.error);
                } else {
                  callbackAfterDel(linkObj.id);
                }
            });
        }
    }
}

let isExistTitle = (linkObj.title !== "");
let date = (mode === LINK_ROW_MODE.bookmarkLink) ? linkObj.dateAdded : linkObj.lastVisitTime;
return (
    <div className='link-row flex-row full-width'>
        <div className='flex-col main-info' onClick={goToLink}>
            <div className='title'>{isExistTitle ? linkObj.title : linkObj.url }</div>
            {
                isExistTitle
                    ?   <div className='description'>{linkObj.url}</div>
                    :   null
            }
        </div>
        <div className='time-block'>
            {getDateTimeInStrFormat(date)}
        </div>
        <div className={!isActiveDelIcon ? "icons-block flex-row" : "icons-block active flex-row"}>
            <div className={!isCopiedLink ? "checkmark-parent" : "checkmark-parent visible"}>
                <div class="checkmark"></div>
            </div>
            <CopySvgIcon className='icon' onClick={copyLink}/>
            {/* <ExportSvgIcon className='icon' onClick={goToLink}/> */}
            <Popup
                content='I will not flip!'
                // on='click'
                position='left center'
                pinned
                open={isActiveDelIcon}
                trigger={<DeleteSvgIcon className='icon hover-red del-icon' onClick={askBeforeDeleteLink}/>}
            >
                <Popup.Content>
                    <div className="confirm-del-popup flex-row space-between">
                        <div className='description flex-row center margin-right-big'>Are you sure?</div>
                        <div className='button' onClick={deleteLink}>Yes</div>
                    </div>
                </Popup.Content>
            </Popup>
        </div>
    </div>
  );
}