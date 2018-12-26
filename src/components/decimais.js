import React, {Component} from 'react';

export default class Decimais extends Component {
    render(){
        return(
            this.props.valor.toFixed(2).replace(".",",")
        );
    };
}