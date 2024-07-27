import React, { useState } from 'react';
import './Login.css'
import { Link } from "react-router-dom";

function Login() {

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text'  />

                    <h5>Password</h5>
                    <input type='password'  />

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the buyNow Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <Link to='/signup'><button className='login__registerButton'>Create your buyNow Account</button></Link>
                
            </div>
        </div>
    )
}

export default Login