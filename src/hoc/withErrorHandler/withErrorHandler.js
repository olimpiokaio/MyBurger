import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        // ele execulta antes do render
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request
            })
            this.resInterceptor = axios.interceptors.response.use(
                response => response, 
                error => {
                this.setState({error: error});
                }
            )
        }

        // componentWillUnmount utilizado para quando o componente não é mais necessario(depois do render)
        // ele vai cuidar para que não haja vasamento de memoria,
        // ele vai garantir que sempre que criarmos novos interceptors, os antigos já não estaram
        // mais vivendo(não estaram mais em memoria, seram descartados depois de utilizados)
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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