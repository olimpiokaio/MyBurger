import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request
            })
            axios.interceptors.response.use(
                response => response, 
                error => {
                this.setState({error: error});
                }
            )
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        <h3 style={{color: 'darkred', textAlign: 'center'}}>
                            {this.state.error ? this.state.error.message : null}
                        </h3>   
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;