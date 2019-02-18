import React, {Component, Fragment} from 'react';
import RelatorioDevedores from '../../components/RelatorioDevedores';

import './styles.css';

export default class TelaRelatorioDevedores extends Component {
    state = {
        devedores:[],
        datai:'',
        dataf:''
    };

    carregaDevedores(){
        fetch("http://pdv/devedores")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                devedores:responseJson
            });
        })
    }

    componentDidMount(){  
        this.carregaDevedores();
    }

    render() {
        return (
            <Fragment>
                <RelatorioDevedores dados={this.state.devedores}/>
            </Fragment>
        );
    }
}
