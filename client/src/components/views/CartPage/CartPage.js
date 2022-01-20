import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import Paypal from '../../utils/Paypal'
import { Empty } from 'antd'

function CartPage(props) {
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)
    const [showTotal, setShowTotal] = useState(false)

    useEffect(() => {
        let cartItems = []

        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => {
                        calculateTotal(response.payload)
                    })
            }
        }
    }, [props.user.userData])

    const calculateTotal = cartDetail => {
        let total = 0;
        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })
        setTotal(total)
        setShowTotal(true)
    }

    const removeFromCart = productId => {
        dispatch(removeCartItem(productId))
            .then(response => {
                if (response.payload.cartDetail.length <= 0) {
                    setShowTotal(false)
                }
            })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>

            <div>
                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />
            </div>

            {
                showTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total Amount : ${total}</h2>
                    </div>
                    :
                    <>
                        <br />
                        <br />
                        <Empty description={false} />
                    </>
            }

            {showTotal && <Paypal total={total} />}
        </div>
    )
}

export default CartPage
