import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            // ['salad', 1]
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.onCheckoutCancelled}
                    checkoutContinued={this.onCheckoutContinued} />
                
                {/*A o metodo render() não compartilha os props history, path e etc. 
                Por isso e necessario repassar o props do component Checkout para ContactData*/}    
                <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);