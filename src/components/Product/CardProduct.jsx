import React from 'react'
import { config } from '../../config'
import Tag from '../Tag'
import { useDispatch } from 'react-redux'
import { toggleTags } from '../../app/features/Product/actions'
import { formatRupiah } from '../../utils'

export default function CardProduct({ item, onAddToCart }) {
    const dispatch = useDispatch();
    return (
        <>
            <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 transition-all duration-200 group-hover:scale-105 lg:h-80 lg:aspect-none">
                <img src={`${config.api_host}/images/products/${item.image_url}`} alt={item.image_url}
                    className="w-full h-full group-hover:object-cover transition-all duration-200 object-scale-down lg:w-full lg:h-full"
                />
            </div>
            <div className="mt-5 p-3 flex flex-col justify-between min-h-[200px]">
                <h3 className="text-lg mb-3 font-bold text-gray-700">
                    <a href='#!'>
                        {item.name}
                    </a>
                </h3>
                <div className='flex mb-4'>
                    <Tag items={item.tags} onClick={tag => dispatch(toggleTags(tag))} />
                </div>
                <p className="text-sm mb-4 font-medium text-gray-900">Description : {item.description}</p>
                <p className="text-md font-medium text-gray-900">{formatRupiah(item.price)}</p>
            </div>
            <div className="mt-4">
                <button onClick={() => onAddToCart()} className='p-4 rounded-b-lg text-white font-bold overflow-hidden bg-teal-600 w-full'>Add to cart</button>
            </div>
        </>
    )
}
