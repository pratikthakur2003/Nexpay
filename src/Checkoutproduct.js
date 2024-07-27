import React from 'react'
import './Checkoutproduct.css'
import { useStateValue } from './StateProvider'

function Checkoutproduct({ id, title, image, price, rating }) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket=()=>{
        console.log(id)
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:id,
        })
    }

    return (
        <div className='checkoutProduct'>
            <img className='productImage' src={image} alt="product image" />

            <div className="productInfo">
                <p className="productTitle">{title}</p>
                <p className='productPrice'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="productRating">
                    {Array(rating)
                        .fill()
                        .map((_,i) => (
                            <p>⭐</p>
                        ))}
                </div>
                <button onClick={removeFromBasket}>Remove from cart</button>
            </div>
        </div>
    )
}

export default Checkoutproduct
