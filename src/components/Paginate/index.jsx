import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Paginate({ total, active, onSetPage }) {
    const [activePage, setActivePage] = useState(active);
    const handleClick = page => {
        onSetPage(page);
        setActivePage(page);
    }
    let items = [];
    for (let i = 1; i <= total; i++) {
        items = [...items, <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => handleClick(i)} key={i} > {i} </button>]
    }

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    disabled={activePage === total} onClick={() => setActivePage(activePage + 1)}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div></div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            Previous
                        </button>
                        {items}
                        <button
                            disabled={activePage === total} onClick={() => setActivePage(activePage + 1)}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
            {/* <div disabled={activePage === 1} onClick={() => setActivePage(1)} />
            <div  />
            {items}
            <div  />
            <div disabled={activePage === total} onClick={() => setActivePage(total)} /> */}
        </div>
    )
}
Paginate.propTypes = {
    total: PropTypes.number.isRequired,
    active: PropTypes.number
}

Paginate.defaultProps = {
    active: 1
}
