import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTagsByCategory } from '../../app/api/product';
import { addItem } from '../../app/features/Cart/actions';
import { fetchProducts, setPage, toggleTags } from '../../app/features/Product/actions';
import Pagination from '../Pagination/index';
import CardProduct from './CardProduct'
import Tag from '../Tag/index';


function Product() {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
        getTagsByCategory(products.category)
            .then(({ data }) => setTags(data));
    }, [dispatch, products.currentPage, products.category, products.tags, products.keyword]);


    return (
        <>
            <div className='w-full p-7 min-h-screen'>
                <div className="container mx-auto">
                    <h2 className='font-bold text-2xl mt-11'>New Product</h2>
                    <strong>Tags: </strong> <Tag items={tags} onClick={tag => dispatch(toggleTags(tag))} />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4 lg:grid-cols-5 lg:gap-4">
                        {
                            products.status === 'process' ?
                                Array.from({ length: 8 }).map((_, idx) => (
                                    <div>Loading...</div>
                                )) :
                                products.data.map((product, i) => {
                                    return (
                                        <CardProduct item={product} onAddToCart={() => dispatch(addItem(product))} />
                                    )
                                })
                        }

                    </div>
                </div>
                <Pagination
                    total={Math.ceil(products.totalItems / products.perPage)}
                    active={products.currentPage}
                    onSetPage={page => dispatch(setPage(page))}
                />
            </div>
        </>
    )
}

export default Product