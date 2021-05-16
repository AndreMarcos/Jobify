import React from 'react';
import style from '../../styles/Componente.module.css';
import Axios from 'axios';
import Head from 'next/head';

class Componente extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mensagem: ''
        }
    }

    getData = () =>{
        Axios.get('http://localhost:3000/api/hello')
        .then( res =>{
            this.setState({
                mensagem: res.data.message
            })
        })
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        return(
            <div>
                <Head>
                    <title>Componente exemplo</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={style.Conteudo}>
                    <h2>Este é um componente de exemplo</h2>
                    <h2>{this.state.mensagem}</h2>
                </div>
            </div>
        )
    }
}

export default Componente;