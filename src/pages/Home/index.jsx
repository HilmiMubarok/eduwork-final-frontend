import React from 'react'

import Navbar from '../../components/Navbar'
import Product from '../../components/Product'
import Pagination from '../../components/Pagination'

function Index() {
    return (
        <>
            <Navbar />
            <Product />
            <Pagination />
        </>
    )
}

export default Index