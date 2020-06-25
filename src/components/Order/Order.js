import React from 'react';

import classes from './Orders.module.css';

const Order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: salad(1)</p>
            <p>Price: <strong>USD 5.45</strong></p>
        </div>
    )   
}

export default Order;