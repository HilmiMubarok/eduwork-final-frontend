import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function BreadCrumb({ items }) {
    const navigate = useNavigate();

    return (
        <>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {
                        items.map((item, i) => (
                            <li className="inline-flex items-center" key={i}>
                                <button
                                    onClick={() => i + 1 !== items.length ? navigate(item.path) : null} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    {item.label}
                                </button>
                            </li>
                        ))
                    }
                </ol>
            </nav>
        </>
    )
}

BreadCrumb.propTypes = {
    items: PropTypes.array.isRequired
}

export default BreadCrumb

