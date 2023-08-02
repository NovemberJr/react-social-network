import React, { useState } from 'react';
import './Paginator.css';

const Paginator = ({ totalPages, currentPage = 1, pagesGroupSize = 5, pageCallback }) => {
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

    const pageClick = (e) => {
        pageCallback(+e.target.innerHTML)
    }

    return <div className='paginator'>
        <div>
            {currentGroup > 0 && <button className='paginator__button' onClick={prevClick}>Prev</button>}
        </div>
        <div>
            {pagesToDisplay.map(page => <span className={'paginator__page-link ' + (page === currentPage ? 'active' : '')} key={`goto${page}`} onClick={pageClick}>{page}</span>)}
        </div>
        <div>
            {currentGroup < totalGroups && <button className='paginator__button' onClick={nextClick}>Next</button>}
        </div>
    </div>
}

export default Paginator
