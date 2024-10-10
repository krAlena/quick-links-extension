import React, { useState } from 'react';
import { getDateTimeInStrFormat, isEmptyObj } from "../../helpers/globalFuncs";
import CopySvgIcon from "../Icons/CopySvgIcon";
import MaximiseSvgIcon from "../Icons/MaximiseSvgIcon";
import GoToSvgIcon from '../Icons/GoToSvgIcon';
import ExportSvgIcon from '../Icons/ExportSvgIcon';
import { LINK_ROW_MODE } from '../../constants/LINK_ROW_MODE';

export default function LinkItem({mode, linkObj}) {
const [isCopiedLink, setIsCopiedLink] = useState(false);

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
        <div className="icons-block flex-row">
            <div className={!isCopiedLink ? "checkmark-parent" : "checkmark-parent visible"}>
                <div class="checkmark"></div>
            </div>
            <CopySvgIcon className='icon' onClick={copyLink}/>
            <ExportSvgIcon className='icon' onClick={goToLink}/>
        </div>
    </div>
  );
}