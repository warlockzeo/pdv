import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';

import Clientes from '../Clientes';

import './styles.css';

class ListaClientes extends Component {

    render(){


        return (
            <Fragment>
                <Col md={3}>
                    <Button color='success' className='form-control'><i className="fas fa-plus"></i> Novo</Button>
                </Col>
                <Col md={9}>
                    <input placeholder='Busca' className='form-control' />
                </Col>
                
                <Clientes dados={this.props.dados} />
            </Fragment>
        );
    };
};

export default ListaClientes;