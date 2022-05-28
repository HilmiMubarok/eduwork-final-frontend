import React from 'react'

function CardProductPlaceholder() {
    return (
        <>
            <div className="flex flex-col p-5">
                <div className="flex-1">
                    <img className="w-full" src='https://via.placeholder.com/400x250' alt='placeholder' />
                </div>
                <div className="mt-5">
                    <div className="font-bold text-xl mb-2"></div>
                    {/* <Tag items={item.tags} onClick={tag => dispatch(toggleTags(tag))} /> */}
                    <div className="flex items-center mt-3">
                        <div className="ml-1 text-3xl"></div>
                    </div>
                </div>
                {/* <button onClick={() => onAddToCart()} className='p-4 rounded-b-lg text-white font-bold overflow-hidden bg-teal-600 w-full'>Add to cart</button> */}
            </div>
        </>
    )
}

export default CardProductPlaceholder