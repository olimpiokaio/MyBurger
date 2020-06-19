import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                    return <BurgerIngredients key={igKey + i} type={igKey} />
                } 
            )
        })
        .reduce((err, el) => {
            return err.concat(el);
        }, []);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type={"bread-top"} />
            {transformedIngredients}
            <BurgerIngredients type={"bread-buttom"} />
        </div>
    )
}

export default Burger;