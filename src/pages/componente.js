import React from 'react';
import style from '../../styles/Componente.module.css';
import Axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';

class Componente extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nome: ''
        }
    }

    componentDidMount(){
        this.setState({
            nome: localStorage.getItem('nome')
        })
    }

    alterarDados(){
        Router.push('./alterar_dados')
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
                    <h2>{this.state.nome} está logado</h2>
                    <h2><a onClick={this.alterarDados}>Alterar Dados</a></h2>
                </div>
            </div>
        )
    }
}

export default Componente;