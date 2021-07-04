import React from 'react';
import style from '../../styles/Menu.module.css';
import Axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import Feed from '../components/feed'

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class Menu extends React.Component {

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
            <div className='container-fluid'>
                <Head>
                    <title>Jobify</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className='row'>
                    <Navbar expand="lg" className='p-2' className={style.HeaderComponent}>
                        <Navbar.Brand href="#home" className='col-7'><span className={style.HeaderJobify}>Jobify</span> </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav.Link href="#home" className='col-1 text-white'>Feed</Nav.Link>
                            <Nav.Link href="#link" className='col-3 text-white'>Meus Serviços</Nav.Link>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="dark">Search</Button>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className='row mt-2'>
                    <Feed></Feed>
                </div>
            </div>
        );
    }
}

export default Menu;