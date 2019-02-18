import {Component} from 'react';

export default class DataBrasil extends Component {
    render(){

        const dataFormatada = (suaData,br) => { 
            var data ;   
            if (suaData){
                if(suaData.length > 10) {
                    data = suaData.substring(0,10).split('-');
                    //console.log(data);
                } 
                if(suaData.length <=10){
                    if(suaData.indexOf("/") !== -1)
                        data = suaData.split('/');
                    else 
                        data = suaData.split('-');
                    //console.log(data);
                }
                if(typeof data == "undefined"){
                    data = new Date(suaData);
                    data = [data.getDate(), data.getMonth()+1, data.getFullYear()];
                    //console.log(data);
                }
                //console.log(data.join('-'));
                if(typeof br == "undefined"){
                    return data.reverse().join('-'); //saida: ano/mes/dia
                } else {
                    return data.reverse().join('/'); //saida: ano/mes/dia
                }
                    
            }
        }

        return(dataFormatada(this.props.data, 'br'));
    }
}
