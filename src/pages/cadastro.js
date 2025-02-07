import React from 'react';
import style from '../../styles/Cadastro.module.css';
import Router from 'next/router';
import Axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Head from 'next/head';

class Cadastro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nome:'',
            sobrenome:'',
            datanascimento:'',
            sexo:'other',
            cpf:'',
            telefone:'',
            cep:'',
            rua:'',
            numero:'',
            complemento:'',
            bairro:'',
            municipio:'',
            estado:'',
            email: '',
            confirmaremail:'',
            senha:'',
            confirmarsenha:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCep = this.onChangeCep.bind(this);
    }

    async handleSubmit(){
        try{          
          const data = {
            name: {
              firstName: this.state.nome,
              lastName: this.state.sobrenome,
            },
            cpf: this.state.cpf,
            phone: this.state.telefone,
            gender: this.state.sexo,
            address:{
              cep: this.state.cep,
              street: this.state.rua,
              number: this.state.numero,
              complement: this.state.complemento,
              district: this.state.bairro,
              city: this.state.municipio,
              state: this.state.estado,
            }, 
            birthDate: this.state.datanascimento,
            email: this.state.email,
            password: this.state.senha,
          };
          
          if(this.state.email == this.state.confirmaremail){
              if(this.state.senha == this.state.confirmarsenha){
                const res = await Axios.post('api/user/signup', data) 
                if(res.request.status == 200){
                    alert("Cadastro realizado com sucesso!")
                    Router.push('./componente')
                }else alert("Ocorreu um erro")
              }else alert("As senhas digitadas não são iguais")
          }else alert("Os e-mails digitados não são iguais")
          
        }catch(error){
            alert(error);
        }
        
    }
    
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value,
        });
    }

    onChangeCep(event){
        this.handleChange(event);
        const { value } = event.target;
        const cep = value?.replace(/[^0-9]/g, '');

        if(cep?.length !== 8){
            this.setState({
                bairro: '',
                estado: '',
                municipio: '',
                rua: ''
            });
        }

        if(cep?.length !== 8){
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
        if(!data.erro){
            this.setState({
                bairro: data.bairro,
                estado: data.uf,
                municipio: data.localidade,
                rua: data.logradouro
            });
        }
        })
        .catch(err=>{
            alert(err.response.data.error)
        })
    }

    inicio(){
        Router.push('./')
    }

    render(){
        return(
            <div className={style.Cadastro}>
                <Head>
                    <title>Job Insider</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={style.HeaderCadastro}>
                    <a onClick={this.inicio}><h3 className={style.TituloSite}>Job Insider</h3></a>   
                </div>
                <h2>Cadastro</h2>
                <Formik
                    initialValues={{
                    nome:'',
                    sobrenome:'',
                    datanascimento:'',
                    sexo:'',
                    cpf:'',
                    telefone:'',
                    cep:'',
                    rua:'',
                    numero:'',
                    complemento:'',
                    bairro:'',
                    municipio:'',
                    estado:'',
                    email: '',
                    confirmaremail:'',
                    senha: '',
                    confirmarsenha:'',
                    }}
                    onSubmit={this.handleSubmit}>
                    <Form className={style.FormularioCadastro}>
                        <Field type="text" placeholder="Nome*" name="nome" size="20" value={this.state.nome} onChange={this.handleChange} required />
                        <Field type="text" placeholder="Sobrenome*" name="sobrenome" size="30" value={this.state.sobrenome} onChange={this.handleChange} required />
                        <br/>
                        <label htmlFor="datanascimento">Data de Nascimento:* </label>
                        <Field type="date" name="datanascimento" value={this.state.datanascimento} onChange={this.handleChange} required />
                        <label htmlFor="sexo">Sexo: </label>
                        <Field type="radio" name="sexo" value="male" checked={this.state.sexo=="male"} onChange={this.handleChange}/>
                        <label htmlFor="sexo">Masculino</label>
                        <Field type="radio" name="sexo" value="female" checked={this.state.sexo=="female"} onChange={this.handleChange}/>
                        <label htmlFor="sexo">Feminino</label>
                        <br/>
                        <Field type="number" placeholder="CPF*" name="cpf" size="11" value={this.state.cpf} onChange={this.handleChange} required />
                        <Field type="text" placeholder="Telefone (Whatsapp)*" name="telefone" size="20" value={this.state.telefone} onChange={this.handleChange} required />
                        <br/>
                        <Field type="number" name="cep" placeholder="CEP*" value={this.state.cep} onChange={(event) => this.onChangeCep(event)} required/>
                        <br/>
                        <Field type="text" name="rua" placeholder="Rua*" value={this.state.rua} onChange={this.handleChange} required/>
                        <Field type="number" name="numero" placeholder="Número*" value={this.state.numero} onChange={this.handleChange} required/>
                        <Field type="text" name="complemento" placeholder="Complemento" value={this.state.complemento} onChange={this.handleChange}/>
                        <br/>
                        <Field type="text" name="bairro" placeholder="Bairro*" value={this.state.bairro} onChange={this.handleChange} required/>
                        <Field type="text" name="municipio" placeholder="Município*" value={this.state.municipio} onChange={this.handleChange} required/>
                        <Field type="text" name="estado" placeholder="Estado*" value={this.state.estado} onChange={this.handleChange} required/>
                        <br/>
                        <Field type="email" placeholder="E-mail*" name="email" size="30" value={this.state.email} onChange={this.handleChange} required />
                        <Field type="email" placeholder="Confirmar E-mail*" name="confirmaremail" size="30" value={this.state.confirmaremail} onChange={this.handleChange} required />
                        <br />
                        <Field type="password" placeholder="Senha*" name="senha" minLength="8" size="30" value={this.state.senha} onChange={this.handleChange} required />
                        <Field type="password" placeholder="Confirmar Senha*" name="confirmarsenha" minLength="8" size="30" value={this.state.confirmarsenha} onChange={this.handleChange} required />
                        <br/>
                        <Field type="submit" className={style.BotaoCadastro} value="Cadastrar" name="botaocadastro"/>
                    </Form>
                </Formik>
            </div>
        );
    }
}
export default Cadastro;