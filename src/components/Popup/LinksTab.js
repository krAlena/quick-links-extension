import React, { Fragment } from 'react';
import { isArrWithContent, isEmptyObj } from "../../helpers/globalFuncs";
import SearchInput from '../Common/SearchInput';
import LinkItem from './LinkItem';


export default function LinksTab({arrLinks, functionSearch, functionDelLink, mode}) {
    return(
        <>
            <div className='search-bar full-width'>
                <SearchInput searchAction={strSearch => functionSearch(strSearch)}/>
            </div>
            <div className="links-list flex-col history-links">
                {
                    isArrWithContent(arrLinks)
                        ?   <Fragment>
                                {arrLinks.map(el => <LinkItem mode={mode} linkObj={el} callbackAfterDel={functionDelLink}/>)}
                                {/* <div className='load-more flex-row'>
                                <div className='button' onClick={loadMore}>Load more</div>
                                </div> */}
                            </Fragment>
                        : null
                }
            </div>
        </>
    )
}