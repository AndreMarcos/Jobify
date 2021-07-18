import React from 'react';
import style from '../../styles/Componente.module.css';
import Axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { Formik, Field, Form } from 'formik';

class Componente extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nome: '',
            servicos: [],
            pagina_atual: 1,
            total_paginas: ''
        }
    }

    componentDidMount(){
        this.setState({
            nome: localStorage.getItem('nome')
        })
        this.getServicos()
    }

    getServicos = () =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        let pagina_atual = this.state.pagina_atual
        Axios.get('./api/job/get_jobs?page='+pagina_atual+'&limit=5&user=false', config)
        .then(res =>{
            this.setState({
                servicos: res.data.jobs,
                total_paginas: res.data.maxPage,
                pagina_atual: res.data.curPage
            })
        })
        .catch(err =>{
            alert(err)
        })
    }

    renderServicos = () =>{
        return this.state.servicos.map((servico) => {
            return <div>
                <h3>{servico.title}</h3>
                <h3>{servico.description}</h3>
                <h3>{servico.category}</h3>
            </div>
        })
    }

    criarServico = e =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        const data = {
            title: e.titulo,
            description: e.descricao,
            category: e.categoria,
        }
        Axios.post('./api/job/create_job', data, config)
        .then(res =>{
            alert("Solicitação enviada com sucesso!")
            location.reload()
        })
        .catch(err =>{
            alert(err)
        })
    }

    alterarDados(){
        Router.push('./alterar_dados')
    }

    sair(){
        localStorage.clear()
        Router.push('./login')
    }

    render(){
        return(
            <div>
                <Head>
                    <title>Jobify</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={style.Conteudo}>
                    <h2>Este é um componente de exemplo</h2>
                    <h2>{this.state.nome} está logado</h2>
                    <h2><a onClick={this.alterarDados}>Alterar Dados</a></h2>
                    <h2><a onClick={this.sair}>Sair</a></h2>
                </div>
                <div className={style.formServico}>
                    <h2>Criar serviço</h2>
                    <Formik
                    initialValues={{
                        titulo:'',
                        descricao:''
                    }}
                    onSubmit={this.criarServico}>
                    <Form >
                        <Field type="text" name="titulo" placeholder="Nome"/>
                        <br/>
                        <Field type="text" name="descricao" placeholder="Descricao"/>
                        <br/>
                        <Field type="text" name="categoria" placeholder="Categoria"/>
                        <br/>
                        <Field type="submit" placeholder="Enviar" name="criarservico"/>
                    </Form>
                    </Formik>
                    {this.renderServicos()}
                </div>
            </div>
        )
    }
}

export default Componente;