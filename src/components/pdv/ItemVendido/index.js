import React, {Component} from 'react';
import {Col} from 'reactstrap';

export default class ItemVendido extends Component {
    render(){
        return(
            <div className='item' key={this.props.dados.id}>
                <Col md={3} className="lista-itens__descr" >{this.props.dados.descr}</Col>
                <Col md={3} className="lista-itens__quant">{this.props.dados.quant}</Col>
                <Col md={3} className="lista-itens__unit">{parseFloat(this.props.dados.unit).toFixed(2).replace(".",",")}</Col>
                <Col md={3} className="lista-itens__unit">{parseFloat(this.props.dados.subTotal).toFixed(2).replace(".",",")}</Col>
            </div>

        );
    };
}
