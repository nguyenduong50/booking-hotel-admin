import React, {Suspense} from 'react';
import {defer, json, useLoaderData, Await} from 'react-router-dom';
import httpRequest from '../../utils/http-request';
import TransactionList from './TransactionList';
import { tokenLoader } from '../../utils/auth';

const Transaction = () => {
    const {transactions} = useLoaderData();
    const textLoading = <p style={{textAlign: 'center'}}>Loading hotels ...</p>;

    return (
        <>
            <Suspense fallback={textLoading}>
                <Await resolve={transactions}>
                    {(transactions => <TransactionList transactions={transactions} />)}
                </Await>
            </Suspense>
        </>
    );
};

export default Transaction;

const loadTransactions = async() => {
    const token = tokenLoader();
    try{
        const response = await httpRequest.get('transactions?token=' + token);
        const data = await response.data;
        return data;
    }
    catch(error){
        throw json(
            {message: error},
            {status: 500}
        )
    }
};

export const loader = async() => {
    return defer({
        transactions: await loadTransactions()
    });
};
