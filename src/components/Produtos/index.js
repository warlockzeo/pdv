import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';

import './styles.css';

class Produtos extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const decimais = (numero) => numero.toFixed(2).replace(".",",");

        const produtos = this.props.dados.map((produto) => 

        <tr key={produto.id}>
            <td className='text-left'>{produto.descr}</td>
            <td className='text-left'>{produto.estoque}</td>
            <td className='d-xs-none text-right'>{decimais(produto.preco)}</td>
            <td className='text-right'>
                <Button color='danger'><span className='d-xs-none'>Excluir</span> <i className="fas fa-minus  d-sm-none"></i></Button>
            </td>
        </tr>
    );
        return(
            <Fragment>
            <table className="table-produtos table table-sm table-hover">
                <thead className='thead-dark'>
                    <tr>
                        <th className='text-left'>Descrição</th>
                        <th className='text-left'>Estoque</th>
                        <th className='d-xs-none text-right'>Preço</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos}
                </tbody>
            </table>
            </Fragment>
        );
    };
};

export default Produtos;