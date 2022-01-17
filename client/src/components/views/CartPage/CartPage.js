import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItem } from '../../../_actions/user_actions'

function CartPage(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        let cartItem = []

        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEacg(item => {
                    cartItem.push(item.id)
                })

                dispatch(getCartItems(cartItem, props.user.userData.cart))
            }
        }
    }, [])

    return (
        <div>
            CartPage
        </div>
    )
}

export default CartPage
