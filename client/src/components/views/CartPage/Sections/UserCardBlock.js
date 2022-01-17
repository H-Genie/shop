/* global location */
/* eslint no-restricted-globals: ["off"] */

import React from 'react'
import './UserCardBlock.css'

function UserCardBlock(props) {
    const renderCartImage = images => {
        const host = location.origin === "http://localhost:3000" ? "http://localhost:5000" : location.origin;

        if (images.length > 0) {
            let image = images[0];
            return `${host}/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img
                        style={{ width: '70px' }}
                        alt='product'
                        src={renderCartImage(product.images)}
                    />
                </td>
                <td>
                    {product.quantity}
                </td>
                <td>
                    {product.price}
                </td>
                <td>
                    <button>remove</button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove form Cart</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
