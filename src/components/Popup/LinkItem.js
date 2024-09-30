import React from 'react';
import { isEmptyObj } from "../../helpers/globalFuncs";
import CopySvgIcon from "../Icons/CopySvgIcon";
import MaximiseSvgIcon from "../Icons/MaximiseSvgIcon";
import GoToSvgIcon from '../Icons/GoToSvgIcon';

export default function LinkItem({linkObj}) {

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

return (
    <div className='link-row flex-row full-width space-between'>
        <div className='title'>{linkObj.title}</div>
        <div className="icons-block flex-row">
            <CopySvgIcon className='icon' onClick={copyLink}/>
            <GoToSvgIcon className='icon' onClick={goToLink}/>
        </div>
    </div>
  );
}