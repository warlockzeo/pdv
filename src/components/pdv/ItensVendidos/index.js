import React, {Component, Fragment} from 'react';
import ItemVendido from '../ItemVendido';

import './styles.css';
export default class ItensVendidos extends Component {    
    render(){
        const total = (this.props.dados.length)?
            this.props.dados
                .map(item => item.subTotal)
                .reduce((a, s)=>a + s).toFixed(2).replace(".",",")
            :'0,00';

        return(
            <Fragment>
                <div className='lista-itens'>
                    {this.props.dados.map(item => <ItemVendido key={item.id} dados={item} />)}
                </div>
                
                <div className='total'><span className='total__legenda'>Total:</span><input className='form-control total__input' type='text' id='total' value={total} disabled /></div>
            </Fragment>
        );
    };
}
