import React from 'react';
import classes from './Auth.module.css';
import {Form, json, useActionData, redirect } from 'react-router-dom';

const Auth = () => {
    const data = useActionData();

    return (
        <>         
            <div className={classes['auth-container']}>
                <Form method="POST" className={classes['form-auth']}>
                    <p className={classes.title}>Login</p>
                    {data && data.message && <p className={classes.error}>{data.message}</p>}
                    <input type="text" name="email" placeholder='Enter email' value="duongnnfx21064@funix.edu.vn" />
                    <input type="password" name="password" placeholder='Enter password' value="123456789" />
                    <button className={classes['btn-submit']}>
                        Login
                    </button>
                </Form>
            </div>
        </>
    );
};

export default Auth;

export async function action ({request}) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode');

    if(mode !== 'login'){
        throw json({message: 'Unsupported mode'}, {status: 422});
    }

    //Get data from Form
    const data = await request.formData();
    const authData = {
      email: data.get('email'),
      password: data.get('password'),
      mode: mode
    }

    //fetch auth    
    const response = await fetch(
        'http://localhost:5000/api/auth/auth-admin',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        }
    );

    if(response.status === 422  || response.status === 401){
        return response;
    }
    
    if(response.status === 400){
        return {
            message: 'Wrong email or password'
        }
    }
    
    if(!response.ok){
        throw json({message: 'Could not authenticate User'}, {status: 500});
    }

    const resData = await response.json();

    if(resData.message){
        return {
            message: resData.message
        };
    }
    if(resData.token){
        localStorage.setItem('token', resData.token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());
    }

    return redirect('/');
}