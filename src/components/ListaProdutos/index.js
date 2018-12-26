import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';

import Produtos from '../Produtos';

import './styles.css';

class ListaProdutos extends Component {

    render(){


        return (
            <Fragment>
                <Col md={3}>
                    <Button color='success' className='form-control'>Novo <i className="fas fa-plus"></i></Button>
                </Col>
                <Col md={9}>
                    <input placeholder='Busca' className='form-control' />
                </Col>
                
                <Produtos dados={this.props.dados} />
            </Fragment>
        );
    };
};

export default ListaProdutos;