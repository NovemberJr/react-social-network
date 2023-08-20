import React, { useState } from 'react';
import './Paginator.css';

type PropsType = {
    totalPages: number,
    currentPageNumber: number,
    pagesGroupSize: number,
    pageCallback: (arg0: any) => void
}

const Paginator: React.FC<PropsType> = ({ totalPages, currentPageNumber = 1, pagesGroupSize = 5, pageCallback }: PropsType) => {
    const pagesToDisplay = [];
    const totalGroups = Math.ceil(totalPages / pagesGroupSize);

    //pages start from 1, page groups start from 0
    const [ currentGroup, setCurrentGroup ] = useState(0);
    const offset = pagesGroupSize * currentGroup;
    
    for (let i = 1; i <= pagesGroupSize; i += 1) {
        const page = offset + i;
        if (page < totalPages) pagesToDisplay.push(page)
    }

    const prevClick = () => {
        setCurrentGroup(currentGroup - 1)
    }

    const nextClick = () => {
        setCurrentGroup(currentGroup + 1)
    }

    const pageClick = (e: any) => {
        pageCallback(+e.target.innerHTML)
    }

    return <div className='paginator'>
        <div>
            {currentGroup > 0 && <button className='paginator__button' onClick={prevClick}>Prev</button>}
        </div>
        <div>
            {pagesToDisplay.map(page => <span className={'paginator__page-link ' + (page === currentPageNumber ? 'active' : '')} key={`goto${page}`} onClick={pageClick}>{page}</span>)}
        </div>
        <div>
            {currentGroup < totalGroups && <button className='paginator__button' onClick={nextClick}>Next</button>}
        </div>
    </div>
}

export default Paginator
