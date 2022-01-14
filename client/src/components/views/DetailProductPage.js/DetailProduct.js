import React, { useEffect } from 'react'
import axios from 'axios'

function DetailProduct(props) {
    const productId = props.match.params.productId

    useEffect(() => {
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    alert("상세 정보를 불러오는데 실패했습니다.")
                }
            })
    }, [])

    return (
        <div>
            DetailProduct
        </div>
    )
}

export default DetailProduct
