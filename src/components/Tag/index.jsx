import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function Tag({ items, onClick }) {
    const products = useSelector(state => state.products);

    return (
        <>
            {
                items.map((item, i) => (
                    <button
                        className={'mx-1 cursor-pointer text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full' + (products.tags.includes(item.name) ? ' bg-teal-500 text-teal-100' : 'bg-teal-100 text-teal-500')}
                        bg={products.tags.includes(item.name) ? 'warning' : 'secondary'}
                        key={i}
                        onClick={() => onClick(item.name)}
                    >
                        {item.name}
                    </button>
                ))
            }
        </>
    )
}

Tag.propTypes = {
    items: PropTypes.array.isRequired
}

export default Tag