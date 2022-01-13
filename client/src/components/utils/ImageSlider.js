/* global location */
/* eslint no-restricted-globals: ["off"] */

import React from 'react'
import { Carousel } from 'antd'

function ImageSlider({ images }) {
    const host = location.origin === "http://localhost:3000" ? "http://localhost:5000" : location.origin;

    return (
        <div>
            <Carousel autoplay>
                {images.map((image, index) => (
                    < div key={index}>
                        <img
                            style={{ width: '100%', height: '18vw' }}
                            src={`${host}/${image}`}
                            alt={image}
                        />
                    </div>
                ))
                }
            </Carousel >
        </div >
    )
}

export default ImageSlider
