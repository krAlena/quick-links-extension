import React from 'react';
import { getDateTimeInStrFormat, isEmptyObj } from "../../helpers/globalFuncs";
import CopySvgIcon from "../Icons/CopySvgIcon";
import MaximiseSvgIcon from "../Icons/MaximiseSvgIcon";
import GoToSvgIcon from '../Icons/GoToSvgIcon';
import ExportSvgIcon from '../Icons/ExportSvgIcon';
import { LINK_ROW_MODE } from '../../constants/LINK_ROW_MODE';

export default function LinkItem({mode, linkObj}) {

const copyLink = () => {
    let linkUrl = '';

    if (!isEmptyObj(linkObj)){
        linkUrl = linkObj.url;
        navigator.clipboard.writeText(linkUrl);
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
            <CopySvgIcon className='icon' onClick={copyLink}/>
            <ExportSvgIcon className='icon' onClick={goToLink}/>
        </div>
    </div>
  );
}