import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'


function DetailProduct(props) {
    const productId = props.match.params.productId
    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    }, [])

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <ProductImage detail={product} />
                </Col>
                <Col lg={12} sm={24}>
                    <ProductInfo detail={product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProduct
