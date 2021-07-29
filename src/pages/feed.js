import React from 'react';
import style from '../../styles/Feed.module.css';
import Axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import Menu from '../components/menu'
import Card from 'react-bootstrap/Card'
import { Formik, Field, Form } from 'formik';
import ServiceModal from '../components/service_modal/service_modal.component'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Feed extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nome: '',
            servicos: [],
            servico: {
                user:{
                    name:{},
                    address:{}
                }
            },
            pagina_atual: 1,
            total_paginas: '',
            esconde_previous: false,
            esconde_next: false,
            descricao: '',
            openServiceModal: false,
            token:''
        }
    }

    async componentDidMount(){
        await this.setState({
            token: localStorage.getItem('token'),
            nome: localStorage.getItem('nome'),
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
        let busca = localStorage.getItem('busca')
        Axios.get('./api/job/get_jobs?page='+pagina_atual+'&limit=5&user=false&busca='+busca, config)
        .then(res =>{
            this.setState({
                servicos: res.data.jobs,
                total_paginas: res.data.maxPage,
                pagina_atual: res.data.curPage
            })
            this.personalizaBotao()
            localStorage.setItem('busca', '')
        })
        .catch(err =>{
            alert(err)
        })
    }

    handleChange = e =>{
        this.setState({
            descricao: e.target.value
        })
    }

    renderServicos = () =>{
        return this.state.servicos.map((servico) => {
            return <div className='col-8 mt-2' key={servico._id}>
                <Card onClick={() => this.mostrarServico(servico)}>
                    <Card.Body className={style.pointer}>
                        <h4>{servico.user.name.firstName} {servico.user.name.lastName}</h4>
                        <h5>{servico.title} - {servico.category}</h5>
                        <p>{servico.description}</p>
                    </Card.Body>
                </Card>
            </div>
        })
    }

    mostrarServico = (servico) =>{
        this.setState({
            servico: servico,
            openServiceModal: true
        })
    }

    closeModal = () =>{
        this.setState({
            openServiceModal:false
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
            description: this.state.descricao,
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

    personalizaBotao = () =>{
        if(this.state.pagina_atual === 1){
            this.setState({esconde_previous : true});
        }else{
            this.setState({esconde_previous : false});
        }

        if(this.state.pagina_atual === this.state.total_paginas){
            this.setState({esconde_next : true});
        }else{
            this.setState({esconde_next : false});
        }
    }

    voltaPagina = () =>{
        if(this.state.pagina_atual !== 1){
            this.setState({
                pagina_atual : this.state.pagina_atual - 1
            },() => this.getServicos());
        }
    }

    proximaPagina = () =>{
        if(this.state.pagina_atual < this.state.total_paginas){
            this.setState({
                pagina_atual : this.state.pagina_atual + 1
            },() => this.getServicos());
        } 
    }

    alterarDados(){
        Router.push('./alterar_dados')
    }

    login(){
        Router.push('./login')
    }

    render(){
        if(this.state.token){
            return(
                <div className={style.feed}>
                    <Head>
                        <title>Jobify</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Menu/>
                    <ServiceModal service={this.state.servico} open={this.state.openServiceModal}/>
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
                                                    <textarea name="descricao" placeholder="Descricao" value={this.state.descricao} onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col'>
                                                    <textarea name="descricao" placeholder="Descricao e Valor" value={this.state.descricao} onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                            <div className='row justify-content-end'>
                                                <div className='col-2'>
                                                    <Field className={style.Botao} type="submit" placeholder="Enviar" name="criarservico"/>
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
                    <div className={style.botaotabela}>
                        <button className={(this.state.esconde_previous ? style.Esconde: style.BotaoSeta)} onClick={this.voltaPagina}>Anterior</button>
                        <h5>Páginas {this.state.pagina_atual} de {this.state.total_paginas}</h5>   
                        <button className={(this.state.esconde_next ? style.Esconde: style.BotaoSeta)} onClick={this.proximaPagina}>Próxima</button>
                    </div>
                </div>
            </div>
        )
        } else {
            return(
                <div className={style.NaoLogado}>
                    <h2>Você precisa fazer login para acessar essa página</h2>
                    <button onClick={this.login}>Login</button>
                </div>
            )
        }
    }
}

export default Feed;