import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { NextResponse, NextRequest } from 'next/server'
import Router from 'next/router'

const LoginHeader = dynamic(() => import('../../src/components/layout/loginheader'))

const Login = () => {
    const data = {};
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(event.target.email.value == '' && event.target.password.value == ''){
            alert("Please fill up all required field");
        }else{
            data = {
                email: event.target.email.value,
                password: event.target.password.value,
            }
        }
        
        const JSONdata = JSON.stringify(data)
        const endpoint = 'http://127.0.0.1:8000/api/login'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        if(typeof result.success !== 'undefined'){
            localStorage.setItem("token", result.success.token)
            localStorage.setItem("name", result.user.name)
            Router.push('/dashboard')
        }else{
            console.log(result.error);
        }
    }
    return (
        <div>
            <LoginHeader />
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">

                                <div className="text-center mt-4">
                                    <h1 className="h2">Welcome back, Charles</h1>
                                    <p className="lead">
                                        Sign in to your account to continue
                                    </p>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <div className="text-center">
                                                <img src="/img/avatars/avatar.jpg" alt="Charles Hall" className="img-fluid rounded-circle" width="132" height="132" />
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password"  required />
                                                    <small>
                                                        <a href="index.html">Forgot password?</a>
                                                    </small>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <button className="btn btn-lg btn-primary" type="submit">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
               
            </main>
        </div>
    )
}

export default Login

