/* global location */
/* eslint no-restricted-globals: ["off"] */

import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import axios from 'axios'

function FileUpload({ refreshFunction }) {
    const [images, setImages] = useState([])
    const host = location.origin === "http://localhost:3000" ? "http://localhost:5000" : location.origin;

    const dropHandler = files => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...images, response.data.filePath])
                    refreshFunction([...images, response.data.filePath])
                } else {
                    alert("파일을 저장하는데 실패했습니다.")
                }
            })
    }

    const deleteHandler = image => {
        const currentIndex = images.indexOf(image);

        let newImages = [...images];
        newImages.splice(currentIndex, 1); // 시작점, 갯수
        setImages(newImages)
        refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300,
                                height: 240,
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflow: 'auto' }}>
                {images.map((image, index) => (
                    <div key={index} onClick={() => deleteHandler(image)}>
                        <img
                            style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`${host}/${image}`}
                            alt=''
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload
