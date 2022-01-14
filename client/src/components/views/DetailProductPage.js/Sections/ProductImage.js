/* global location */
/* eslint no-restricted-globals: ["off"] */

import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {
    const [images, setImages] = useState([])
    const host = location.origin === "http://localhost:3000" ? "http://localhost:5000" : location.origin;

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images.map(item => {
                images.push({
                    original: `${host}/${item}`,
                    htumbnail: `${host}/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div style={{ width: '100%' }}>
            <ImageGallery items={images} />
        </div>
    )
}

export default ProductImage
