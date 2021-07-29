import React from 'react';
import style from '../../styles/Menu.module.css';
import Axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import Feed from '../pages/feed'

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nome: '',
            busca: ''
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

    sair(){
        localStorage.clear()
        Router.push('./login')
    }

    handleChange = e =>{
        this.setState({
            busca : e.target.value
        })
    }

    buscar = () =>{
        localStorage.setItem('busca', this.state.busca)
        location.reload()
        Router.push('./feed')
    }

    render(){
        return(
            <div className='container-fluid'>
                <Head>
                    <title>Jobify</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className='row'>
                    <Navbar expand="lg" className='p-2' className={style.HeaderComponent}>
                        <Navbar.Brand href="/feed" className='col-6'><span className={style.HeaderJobify}>Jobify</span> </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav.Link href="/feed" className={style.MenuLink}>Feed</Nav.Link>
                            <Nav.Link href="/servicos" className={style.MenuLink}>Meus Serviços</Nav.Link>
                            <Nav.Link href="/alterar_dados" className={style.MenuLink}>Alterar Dados</Nav.Link>
                            <FormControl type="text" className="mr-sm-2" value={this.state.busca} onChange={this.handleChange}/>
                            <Button variant="dark" onClick={this.buscar}>Buscar</Button>
                        </Navbar.Collapse>
                        <Nav.Link onClick={this.sair} className='col-1 text-white'>Sair</Nav.Link>
                    </Navbar>
                </div>
            </div>
        );
    }
}

export default Menu;