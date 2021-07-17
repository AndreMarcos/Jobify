import React from 'react';
import style from '../../styles/Login.module.css';
import Axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Router from 'next/router';
import Head from 'next/head';

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    handleSubmitLogin = e => {
        const data = {
          email: e.emaillogin,
          password: e.senhalogin
        }
        Axios.post('api/user/login', data)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('nome', res.data.firstName);
            Router.push('./feed');
        })
        .catch(err => {
            alert(err);
        })
    }

    cadastro = e =>{
        e.preventDefault();
        Router.push('./cadastro')
    }

    esqueceuasenha(){
        alert("Que pena")
    }

    render(){
        return(
            <div className={style.Login}>
                <Head>
                    <title>Jobify</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={style.HeaderLogin}>
                    <h3>jobify</h3>
                </div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                    emaillogin: '',
                    senhalogin: '',
                    }}
                    onSubmit={this.handleSubmitLogin}>
                    <Form className={style.FormularioLogin}>
                        <Field type="email" id="emaillogin" placeholder="E-mail" name="emaillogin" size="20" required />
                        <br />
                        <Field type="password" id="senhalogin" placeholder="Senha" name="senhalogin" minLength="8" size="20" required />
                        <br />
                        <button type="button" className={style.BotaoTexto} onClick={this.esqueceuasenha}>Esqueceu a sua senha?</button>
                        <br />
                        <p>Ainda não possui cadastro? <button className={style.BotaoTexto} onClick={this.cadastro}>Cadastrar</button></p>
                        <Field type="submit" className={style.BotaoLogin} value="Entrar" name="botaologin" />
                    </Form>
                </Formik>
            </div>
        );
    }
}
export default Login;