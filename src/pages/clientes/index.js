import React, {Component} from 'react';
import ListaClientes from '../../components/ListaClientes';

const clientes = [{
        id: 1,
        nome: "Jonathan",
        endereco: "Rua jose alves dias, 23",
        fone: "99982-3437",
        cpf:'000.000.000-00',
        rg: '766788',
        saldo: 0.0
    }, {
        id: 2,
        nome: "Joana",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 3,
        nome: "Sansão",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 4,
        nome: "Maria",
        endereco: "Rua jose alves dias, 23",
        bairro: "Brasília",
        fone: "99982-3437"
    }, {
        id: 5,
        nome: "Cida",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }];

class TelaClientes extends Component {
    state = {
        clientes :[]
    };

    componentDidMount(){
        this.setState({
            clientes: clientes
        });
    }

    render(){

        
        return (
            <div className="tela-clientes col-md-12">
                <ListaClientes dados={this.state.clientes} />
            </div>
        );
    };
}
    
export default TelaClientes;