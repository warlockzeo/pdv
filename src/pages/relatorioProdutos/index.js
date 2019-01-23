import React, {Component, Fragment} from 'react';
import RelatorioBarra from '../../components/RelatorioBarra';

export default class TelaRelatorioProdutos extends Component {
    state = {
        produtos:[],
        datai:'',
        dataf:''
    };

    render() {
        return (
            <Fragment>
                <RelatorioBarra datai={this.state.datai} mudaDatai={this.mudaDatai} mudaDataf={this.mudaDataf} />
                Produts
            </Fragment>
        );
    }
}
