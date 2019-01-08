import React, {Component, Fragment} from 'react';
import {Col} from 'reactstrap';

export default class ItemVendido extends Component {
    render(){
        return(
            <Fragment key={this.props.dados.id}>
                <Col md={4} className="lista-itens__descr" >{this.props.dados.descr}</Col>
                <Col md={4} className="lista-itens__quant">{this.props.dados.quant}</Col>
                <Col md={4} className="lista-itens__unit">{this.props.dados.unit}</Col>
            </Fragment>

        );
    };
}
