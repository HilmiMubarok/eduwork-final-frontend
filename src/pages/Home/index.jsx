import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../../components/Navbar'
import { getTagsByCategory } from '../../app/api/product';
import { addItem } from '../../app/features/Cart/actions';
import { fetchProducts, setPage, toggleTags } from '../../app/features/Product/actions';
import CardProduct from '../../components/Product/CardProduct'
import Paginate from '../../components/Paginate';
import Tag from '../../components/Tag';
import BreadCrumb from '../../components/BreadCrumb';
import CardProductPlaceholder from '../../components/Product/CardProductPlaceholder';
// import Product from '../../components/Product'

function Home() {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
        getTagsByCategory(products.category)
            .then(({ data }) => setTags(data));
    }, [dispatch, products.currentPage, products.category, products.tags, products.keyword]);

    const breadcrumb = [
        { label: 'Home', path: '/' },
    ];
    //? DONE: fetch TAGS and BreadCrumb 

    // TODO: display Products
    // ? DONE: display Products

    // TODO : display Card product placeholder
    // ? DONE: display Card product placeholder

    // TODO : display Pagination
    // ? DONE: display Pagination

    // TODO : Styling
    // - Breadcrumb //?DONE
    // - Tag
    return (
        <>
            <Navbar />
            <div className="container mx-auto mb-5">
                <div className='mt-3'>
                    <BreadCrumb items={breadcrumb} />
                    <strong>Tags: </strong> <Tag items={tags} onClick={tag => dispatch(toggleTags(tag))} />
                </div>
                <h2 className='font-bold text-2xl mt-11'>New Product</h2>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mt-4 lg:grid-cols-4 lg:gap-4'>

                    {


                        products.status === 'process' ?
                            Array.from({ length: 8 }).map((_, idx) => (
                                <div key={idx}>
                                    <CardProductPlaceholder />
                                </div>
                            )) :
                            // products.data.map((product, i) => {
                            //     return (
                            //         <div key={i} className="group relative">
                            //             <CardProduct item={product} onAddToCart={() => dispatch(addItem(product))} />
                            //         </div>

                            //     )
                            // })
                            products.length === 0 ?
                                <div>Not</div>
                                :
                                products.data.map((product, i) => {
                                    return (
                                        <div key={i} className="group relative">
                                            <CardProduct item={product} onAddToCart={() => dispatch(addItem(product))} />
                                        </div>

                                    )
                                })
                    }
                </div>

            </div>
            {/* div always on bottom with tailwind */}
            <div className="fixed left-0 right-0 bottom-0">
                <Paginate
                    total={Math.ceil(products.totalItems / products.perPage)}
                    active={products.currentPage}
                    onSetPage={page => dispatch(setPage(page))}
                />
            </div>
        </>
    )
}

export default Home