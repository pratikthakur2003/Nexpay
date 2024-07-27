import React from 'react';
import { useStateValue } from './StateProvider';
import './Checkout.css';
import Checkoutproduct from './Checkoutproduct';

function Checkout() {
    const [{ basket }, dispatch] = useStateValue();


    const getBasketTotal = (basket) => 
        basket?.reduce((amount, item) => item.price + amount, 0);

    
    const handleCheckout = () => {
        alert('Proceeding to checkout');
        
    };

    return (
        <div className='checkout'>
            {/* Optional advertisement image */}
            {/* <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkoutAd" /> */}

            {basket?.length === 0 ? (
                <div>
                    <h2>Your Shopping Cart is Empty</h2>
                    <p>
                        You have no items in your cart. To buy one or more items, click "Add to cart" next to the item.
                    </p>
                </div>
            ) : (
                <div>
                    <h2 className='checkout_title'>Your Cart</h2>
                    {basket?.map((item) => (
                        <Checkoutproduct
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                    <div className="checkout_total">
                        <h3>Total: ${getBasketTotal(basket).toFixed(2)}</h3>
                        <button onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;
