import React from 'react';
import style from '../../styles/Servicos.module.css';
import Axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import Menu from '../components/menu'
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import Switch from "react-switch";

class Servicos extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            servicos: [],
            servicoscontratados: [],
            solicitacoesservicos: [],
            pagina_atual: 1,
            total_paginas: '',
            esconde_previous: false,
            esconde_next: false,
            pagina_atual1: 1,
            total_paginas1: '',
            esconde_previous1: false,
            esconde_next1: false,
            pagina_atual2: 1,
            total_paginas2: '',
            esconde_previous2: false,
            esconde_next2: false,
            descricao: '',
            token:''
        }
    }

    async componentDidMount(){
        await this.setState({
            token: localStorage.getItem('token')
        })
        this.getServicos()
        this.getServicosContratados()
        this.getSolicitacoesServicos()
    }

    getServicos = () =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        let pagina_atual = this.state.pagina_atual
        Axios.get('./api/job/get_jobs?page='+pagina_atual+'&limit=5&user=true', config)
        .then(res =>{
            this.setState({
                servicos: res.data.jobs,
                total_paginas: res.data.maxPage,
                pagina_atual: res.data.curPage
            })
            this.personalizaBotao()
        })
        .catch(err =>{
            alert(err)
        })
    }

    getServicosContratados = () =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        let pagina_atual = this.state.pagina_atual1
        Axios.get('./api/contract/get_contracts?page='+pagina_atual+'&limit=5&user=true', config)
        .then(res =>{
            this.setState({
                servicoscontratados: res.data.contracts,
                total_paginas1: res.data.maxPage,
                pagina_atual1: res.data.curPage
            })
            this.personalizaBotao()
        })
        .catch(err =>{
            alert(err)
        })
    }

    getSolicitacoesServicos = () =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        let pagina_atual = this.state.pagina_atual2
        Axios.get('./api/contract/get_contracts?page='+pagina_atual+'&limit=5&user=false', config)
        .then(res =>{
            this.setState({
                solicitacoesservicos: res.data.contracts,
                total_paginas2: res.data.maxPage,
                pagina_atual2: res.data.curPage
            })
            this.personalizaBotao()
        })
        .catch(err =>{
            alert(err)
        })
    }

    handleChange(id) {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        const data = {
            jobId: id
        }
        Axios.put('./api/job/switch_job_status', data, config)
        .then(res => {
            this.getServicos();
        })
        .catch(err => {
            alert(err)
        })
    }

    handleChangeStatus(id) {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        const data = {
            contractId: id,
            contractStatus: event.target.value
        }
        Axios.put('./api/contract/change_contract_status', data, config)
        .then(res => {
            this.getSolicitacoesServicos();
        })
        .catch(err => {
            alert(err)
        })
    }

    renderServicosAtivos = () =>{
        return this.state.servicos.map((servico) => {
            return <div className='col-8 mt-2' key={servico._id}>
                <Card>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-10'>
                                <h5>{servico.title} - {servico.category}</h5>
                            </div>
                            <div className='col-2'>
                            <Switch onChange={() => this.handleChange(servico._id)} checked={servico.status === "open"} />
                            </div>
                        </div>
                        <p>{servico.description}</p>
                    </Card.Body>
                </Card>
            </div>
        })
    }

    renderServicosContratados = () =>{
        return this.state.servicoscontratados.map((servico) => {       
            return <div className='col-8 mt-2' key={servico._id}>
                <Card>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-9'>
                                <h5>{servico.jobTitle} - {servico.jobCategory}</h5>
                            </div>
                            <div className='col-3'>
                            {servico.status}
                            </div>
                        </div>
                        <p>{servico.jobDescription}</p>
                        <p><b>Autor</b>: {servico.jobUserName}</p>
                    </Card.Body>
                </Card>
            </div>
        })
    }

    renderServicosSolicitados = () =>{
        return this.state.solicitacoesservicos.map((servico) => {
            return <div className='col-8 mt-2' key={servico._id}>
                <Card>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-9'>
                                <h5>{servico.jobTitle} - {servico.jobCategory}</h5>
                            </div>
                            <div className='col-3'>
                            <select name="status" id="status" form="carform" value={servico.status} onChange={() => this.handleChangeStatus(servico._id)}>
                                <option value="Aguardando">Aguardando</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Recusado">Recusado</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                            </div>
                        </div>
                        <p>{servico.description}</p>
                        <p><b>Contratado por</b>: {servico.user.name.firstName} {servico.user.name.lastName}{" "}</p>
                    </Card.Body>
                </Card>
            </div>
        })
    }

    personalizaBotao = () =>{
        if(this.state.pagina_atual === 1){
            this.setState({esconde_previous : true});
        }else{
            this.setState({esconde_previous : false});
        }

        if(this.state.pagina_atual === this.state.total_paginas || this.state.total_paginas === 0){
            this.setState({esconde_next : true});
        }else{
            this.setState({esconde_next : false});
        }

        if(this.state.pagina_atual1 === 1){
            this.setState({esconde_previous1 : true});
        }else{
            this.setState({esconde_previous1 : false});
        }

        if(this.state.pagina_atual1 === this.state.total_paginas1 || this.state.total_paginas1 === 0){
            this.setState({esconde_next1 : true});
        }else{
            this.setState({esconde_next1 : false});
        }

        if(this.state.pagina_atual2 === 1){
            this.setState({esconde_previous2 : true});
        }else{
            this.setState({esconde_previous2 : false});
        }

        if(this.state.pagina_atual2 === this.state.total_paginas2 || this.state.total_paginas2 === 0){
            this.setState({esconde_next2 : true});
        }else{
            this.setState({esconde_next2 : false});
        }
    }

    voltaPagina = (num) =>{
        if(num==1){
            if(this.state.pagina_atual !== 1){
                this.setState({
                    pagina_atual : this.state.pagina_atual - 1
                },() => this.getServicos());
            }
        }else if(num==2){
            if(this.state.pagina_atual1 !== 1){
                this.setState({
                    pagina_atual1 : this.state.pagina_atual1 - 1
                },() => this.getServicosContratados());
            }
        }else if(num==3){
            if(this.state.pagina_atual2 !== 1){
                this.setState({
                    pagina_atual2 : this.state.pagina_atual2 - 1
                },() => this.getSolicitacoesServicos());
            }
        }
    }

    proximaPagina = (num) =>{
        if(num==1){
            if(this.state.pagina_atual < this.state.total_paginas){
                this.setState({
                    pagina_atual : this.state.pagina_atual + 1
                },() => this.getServicos());
            }
        }else if(num==2){
            if(this.state.pagina_atual1 < this.state.total_paginas1){
                this.setState({
                    pagina_atual1 : this.state.pagina_atual1 + 1
                },() => this.getServicosContratados());
            }
        }else if(num==3){
            if(this.state.pagina_atual2 < this.state.total_paginas2){
                this.setState({
                    pagina_atual2 : this.state.pagina_atual2 + 1
                },() => this.getSolicitacoesServicos());
            }
        } 
    }

    alterarDados(){
        Router.push('./alterar_dados')
    }

    render(){
        if(this.state.token){
            return(
                <div className={style.servicos}>
                    <Head>
                        <title>Jobify</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Menu/>
                    <div className="row mt-4 justify-content-center">
                        <div className='col-8'> 
                        <Tabs defaultActiveKey="ativos" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="ativos" title="Meus Serviços">
                            <div className="row mt-4 justify-content-center">
                                {this.renderServicosAtivos()}
                                <div className={style.botaotabela}>
                                    <button className={(this.state.esconde_previous ? style.Esconde: style.BotaoSeta)} onClick={() => this.voltaPagina(1)}>Anterior</button>
                                    <h5 className={(this.state.total_paginas == 0 ? style.Esconde: '')}>Página {this.state.pagina_atual} de {this.state.total_paginas}</h5>   
                                    <button className={(this.state.esconde_next ? style.Esconde: style.BotaoSeta)} onClick={() => this.proximaPagina(1)}>Próxima</button>
                                </div>
                            </div>
                            </Tab>
                            <Tab eventKey="contratados" title="Contratados">
                            <div className="row mt-4 justify-content-center">
                                {this.renderServicosContratados()}
                                <div className={style.botaotabela}>
                                    <button className={(this.state.esconde_previous1 ? style.Esconde: style.BotaoSeta)} onClick={() => this.voltaPagina(2)}>Anterior</button>
                                    <h5 className={(this.state.total_paginas1 == 0 ? style.Esconde: '')}>Página {this.state.pagina_atual1} de {this.state.total_paginas1}</h5>   
                                    <button className={(this.state.esconde_next1 ? style.Esconde: style.BotaoSeta)} onClick={() => this.proximaPagina(2)}>Próxima</button>
                                </div>
                            </div>
                            </Tab>
                            <Tab eventKey="solicitacoes" title="Solicitações">
                            <div className="row mt-4 justify-content-center">
                                {this.renderServicosSolicitados()}
                                <div className={style.botaotabela}>
                                    <button className={(this.state.esconde_previous2 ? style.Esconde: style.BotaoSeta)} onClick={() => this.voltaPagina(3)}>Anterior</button>
                                    <h5 className={(this.state.total_paginas2 == 0 ? style.Esconde: '')}>Página {this.state.pagina_atual2} de {this.state.total_paginas2}</h5>   
                                    <button className={(this.state.esconde_next2 ? style.Esconde: style.BotaoSeta)} onClick={() => this.proximaPagina(3)}>Próxima</button>
                                </div>
                            </div>
                            </Tab>
                        </Tabs>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className={style.NaoLogado}>
                    <h2>Você precisa fazer login para acessar essa página</h2>
                    <button onClick={this.login}>Login</button>
                </div>
            )
        } 
    }
}

export default Servicos;