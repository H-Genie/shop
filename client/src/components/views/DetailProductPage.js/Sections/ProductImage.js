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
                    thumbnail: `${host}/${item}`,
                    sizes: '100px'
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={images} s />
        </div>
    )
}

export default ProductImage
