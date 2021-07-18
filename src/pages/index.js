import Router from 'next/router'
import Head from 'next/head'
import Axios from 'axios'
import React from 'react'

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST

export default class Home extends React.Component {

  async componentDidMount(){
    const token = await localStorage.getItem('token')
    if(token){
      Router.push('./feed')
    }else Router.push('./login')
  }

  render(){
    return (
      <div>
        <Head>
            <title>Jobify</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    )
  }
 
}
