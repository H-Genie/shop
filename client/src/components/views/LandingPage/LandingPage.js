import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Icon, Col, Card, Row, Button } from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider'

function LandingPage() {
    useEffect(() => {
        let body = {
            skip,
            limit
        }

        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.productInfo)
                } else {
                    alert("상품들을 가져오는데 실패 했습니다.")
                }
            })
    }, [])

    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(8)

    const loadMoreHandler = () => {

    }

    const renderCards = products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={<ImageSlider images={product.images} />}
                >
                    <Meta
                        title={product.title}
                        description={`$${product.price}`}
                    />
                </Card>
            </Col>
        )
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type='rocket' /></h2>
            </div>

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Button onClick={loadMoreHandler}>더보기</Button>
            </div>
        </div >
    )
}

export default LandingPage
