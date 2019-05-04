import React, {Component, Fragment} from 'react';
import RelatorioVendas from '../../components/RelatorioVendas';
import RelatorioBarra from '../../components/RelatorioBarra';

import './styles.css';

export default class TelaRelatorioVendas extends Component {
    state = {
        vendas:[],
        datai:'',
        dataf:''
    };

    carregaVendas(){
        fetch("http://pdv/exibir/vendas/",{
            method:'POST',
            body:JSON.stringify({
                datai:this.state.datai,
                dataf:this.state.dataf
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                vendas:responseJson
            });
        })
    }

    mudaDatai = async(data) => {
        await  this.setState({
            datai:data
        });
        this.carregaVendas();
    }

    mudaDataf = async (data) => {
        await this.setState({
            dataf:data
        });
        this.carregaVendas();
    }

    componentDidMount(){  
        this.carregaVendas();
    }

    render() {
        return (
            <Fragment>
                <RelatorioBarra datai={this.state.datai} mudaDatai={this.mudaDatai} mudaDataf={this.mudaDataf} />
                <RelatorioVendas dados={this.state.vendas} datai={this.state.datai} dataf={this.state.dataf}/>
            </Fragment>
        );
    }
}
