import React, { useEffect } from 'react';
import Header from '../../components/header/Header';
import { Outlet, useSubmit } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { tokenLoader, getTokenDuration } from '../../utils/auth';

const RootLayout = () => {
    const token = tokenLoader();
    const submit = useSubmit();
  
    useEffect(() => {
      if(!token){
        return;
      }
  
      if(token === 'EXPIRED'){
        submit(null, {action: '/logout', method: 'post'});
        return;
      }
  
      const tokenDuration = getTokenDuration();
      //console.log(tokenDuration);
  
      setTimeout(() => {
        submit(null, {action: '/logout', method: 'post'});
      }, tokenDuration)
    }, [token, submit]);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default RootLayout;