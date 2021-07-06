import React from 'react';
import style from '../../styles/Feed.module.css';
import Axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import Menu from '../components/menu'
import Card from 'react-bootstrap/Card'
import { Formik, Field, Form } from 'formik';

class Feed extends React.Component {

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
            return <div className='col-8 mt-2'>
                <Card>
                    <Card.Body>
                        <h4>{servico.user.name.firstName} {servico.user.name.lastName}</h4>
                        <h5>{servico.title} - {servico.category}</h5>
                        <p>{servico.description}</p>
                    </Card.Body>
                </Card>
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

    render(){
        return(
            <div className={style.feed}>
                <Head>
                    <title>Jobify</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Menu></Menu>
                <div className="row mt-4 justify-content-center">
                    <div className='col-8'> 
                        <Card>
                            <Card.Body>
                                <h5 className='d-flex justify-content-center'>Cadastrar Serviço</h5>

                                <Formik
                                initialValues={{
                                    titulo:'',
                                    descricao:''
                                }}
                                onSubmit={this.criarServico}>
                                <Form >
                                <div className='row mt-4'>
                                    <div className='col-6'>
                                        <Field type="text" name="titulo" placeholder="Nome"/>
                                    </div>
                                    <div className='col-6'>
                                        <Field type="text" name="categoria" placeholder="Categoria"/>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col'>
                                        <textarea name="descricao" placeholder="Descricao"/>
                                    </div>
                                </div>
                                <div className='row justify-content-end'>
                                    <div className='col-2'>
                                        <Field type="submit" placeholder="Enviar" name="criarservico"/>
                                    </div>
                                </div>
                                </Form>
                                </Formik>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row mt-4 justify-content-center">
                    {this.renderServicos()}
                </div>
            </div>
        )
    }
}

export default Feed;