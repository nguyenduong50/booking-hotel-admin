import React, {useState} from 'react';
import { convertDate } from '../../utils/convertDate';

const TransactionList = ({transactions}) => {
    const [page, setPage] = useState(0);

    const increasePageHandle = () => {
        if(page >= transactions.length - 1){
            setPage(0);
            return;
        }

        setPage(page + 1);
    };

    const decreasePageHandle = () => {
        if(page === 0){
            setPage(transactions.length - 1);
            return;
        }

        setPage(page - 1);
    };

    return (
        <>
            <div className="d-flex justify-content-between mt-4 mb-2">
                <h2 className="fs-4 text-secondary">Room List</h2>
            </div>
            {/* Transaction list */}
            <div className="border rounded-3 box-shadow-sm mt-2">
                <table className="table mt-1 mb-0">
                    <thead className="">
                        <tr className="">
                        <th scope="col" className="border-end">
                            ID
                        </th>
                        <th scope="col" className="border-end">
                            User
                        </th>
                        <th scope="col" className="border-end">
                            Hotel
                        </th>
                        <th scope="col" className="border-end">
                            Room
                        </th>
                        <th scope="col" className="border-end">
                            Date
                        </th>
                        <th scope="col" className="border-end">
                            Price
                        </th>
                        <th scope="col" className="border-end">
                            Payment Method
                        </th>
                        <th scope="col" className="">
                            Status
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center">
                            <span>No records have been create yet </span>
                            </td>
                        </tr>
                        )}
                        {transactions.length > 0 &&
                        transactions[page].map((transaction) => (
                            <tr key={transaction._id}>
                            <td>{transaction._id}</td>
                            <td>{transaction.user?.username}</td>
                            <td>{transaction.hotel?.name}</td>
                            <td>{transaction.room.toString()}</td>
                            <td>{convertDate(transaction.dateStart)} - {convertDate(transaction.dateEnd)}</td>
                            <td>${transaction.price}</td>
                            <td>{transaction.payment}</td>
                            <td>
                                <span style={{
                                    color: 'green',
                                    backgroundColor: 'rgb(245,184,174)',
                                    borderRadius: '5px',
                                    padding: '5px 10px'
                                }}>
                                    {transaction.status}
                                </span>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end align-items-center me-4 py-2">
                    <span className="me-3">{page + 1} of {transactions.length}</span>
                    <button className="border-0 bg-transparent text-black-50" onClick={decreasePageHandle}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="border-0 bg-transparent text-black-50" onClick={increasePageHandle}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default TransactionList;