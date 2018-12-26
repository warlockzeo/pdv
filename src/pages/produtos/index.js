import React, {Component} from 'react';
import ListaProdutos from '../../components/ListaProdutos';

import './styles.css';

const produtos = [
    {id:1,descr:'pulseira',preco: 20.00},
    {id:2,descr:'anel',preco: 15.35},
    {id:3,descr:'boné',preco: 16.50},
    {id:4,descr:'camisa',preco: 19.00}
];


class TelaProdutos extends Component {
    state = {
        produtos :[]
    };

    componentDidMount(){
        this.setState({
            produtos: produtos
        });
    }

    render(){

        
        return (
            <div className="tela-clientes col-md-12">
                <ListaProdutos dados={this.state.produtos} />
            </div>
        );
    };
}
    
export default TelaProdutos;