import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Icon, Col, Card, Row, Button } from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import { continents, price } from './Sections/Datas'

function LandingPage() {
    useEffect(() => {
        let body = {
            skip,
            limit
        }
        getProduct(body)
    }, [])

    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(8)
    const [postSize, setPostSize] = useState(0)
    const [filters, setFilters] = useState({
        continents: [],
        price: []
    })

    const getProduct = body => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는데 실패 했습니다.")
                }
            })
    }

    const loadMoreHandler = () => {
        let body = {
            skip: skip + limit, // 최초 0 + 8, 두번째 8 + 8, 세번째 16 + 8
            limit,
            loadMore: true // 더보기 버튼을 눌렀다는 정보
        }
        getProduct(body)
        setSkip(skip)
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

    const showFilteredResults = filters => {
        let body = {
            skip: 0, // 아무것도 가져오지 않음
            limit,
            filters
        }
        getProduct(body)
        setSkip(0)
    }

    const handleFielters = (filters, category) => {
        const newFilters = { ...filters }
        newFilters[category] = filters

        showFilteredResults(newFilters)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type='rocket' /></h2>
            </div>


            {/* filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFielters={filters => handleFielters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFielters={filters => handleFielters(filters, "price")} />
                </Col>
            </Row>


            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>


            {postSize >= limit &&
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            }
        </div >
    )
}

export default LandingPage
