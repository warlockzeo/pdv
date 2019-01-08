import React, {Component} from 'react';
import ListaClientes from '../../components/ListaClientes';

class TelaClientes extends Component {
    state = {
        clientes: []
    };

    exibirClientes(){
        fetch("http://pdv/exibir/clientes/")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                clientes:responseJson
            });
        })
    }

    componentDidMount(){
        this.exibirClientes();
    }

    gravar = (cliente) => {
        fetch(`http://pdv/gravar/clientes/`,{
            method:'POST',
            body:JSON.stringify({
                nome:cliente.nome,
                endereco:cliente.endereco,
                cpf:cliente.cpf,
                rg:cliente.rg,
                fone:cliente.fone,
                saldo:cliente.saldo,
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            //console.log(responseJson);
            //console.log(cliente);
            if(responseJson.resp==='ok'){
                this.exibirClientes();
            }
        })
    }

    atualizar = (cliente) => {
        fetch(`http://pdv/atualizar/clientes/`,{
            method:'POST',
            body:JSON.stringify({
                id:cliente.id,
                nome:cliente.nome,
                endereco:cliente.endereco,
                cpf:cliente.cpf,
                rg:cliente.rg,
                fone:cliente.fone,
                saldo:cliente.saldo,
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            //console.log(responseJson);
            //console.log(cliente);
            if(responseJson.resp==='ok'){
                this.exibirClientes();
            }
        })
    }

    excluir = (cliente) => {
        if (window.confirm("Confirma exclusão?")) {
            fetch(`http://pdv/apagar/clientes/${cliente.cliente}`)
            .then((response)=>response.json())
            .then((responseJson)=>
            {
                if(responseJson.resp==='ok'){
                    this.exibirClientes();
                }
            })
        }
    }

    render(){
        return (
            <div className="tela-clientes col-md-12">
                <ListaClientes dados={this.state.clientes} gravar={this.gravar} atualizar={this.atualizar} excluir={this.excluir} />
            </div>
        );
    };
}
    
export default TelaClientes;