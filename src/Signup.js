import React from 'react'
import { Link } from "react-router-dom";
import './Signup.css'

function Signup() {
    return (
        <div className='signup'>
            <Link to='/'>
                <img
                    className="signup__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>

            <div className='signup__container'>
                <h1>Create Account</h1>

                <form>
                    <h5>Your Name</h5>
                    <input type='text' />

                    <h5>Mobile Number</h5>
                    <input type='text' value='IN +91 ' />
                    

                    <h5>Email</h5>
                    <input type='e-mail' />

                    <h5>Password</h5>
                    <input type='password' placeholder='At least 6 characters' />
                    <h6>Passwords must be at least 6 characters.</h6>

                    <button type='submit' className='signup__Button'>Sign Up</button>
                </form>

                <p>
                To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.
                </p>
                <button className='signup__registerButton'>Create your Amazon Account</button><br />
                <h6>Already have an account? <Link to='/login'>Sign In</Link></h6><br />
                <p>By creating an account or logging in, you agree to Amazon’s Conditions of Use and Privacy Policy.</p>
            </div>
            <h6 className="bottom">
            <a href=""> Conditions of Use </a>
            <a href=""> Privacy Notice</a>
            <a href=""> Help </a>
            </h6>
            <h6><footer>© 1996-2023, Amazon.com, Inc. or its affiliates</footer></h6>
        </div>
    )
}

export default Signup
