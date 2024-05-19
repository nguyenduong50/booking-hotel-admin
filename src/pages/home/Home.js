import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import httpRequest from "../../utils/http-request";
import { convertDate } from "../../utils/convertDate";
import { tokenLoader } from "../../utils/auth";

const Home = () => {
  const [countUser, setCountUser] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const token = tokenLoader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpRequest.get("home-admin?token=" + token); 
        const data = await response.data;
        setCountUser(data.countUser);
        setCountOrder(data.countOrder);
        setTotalEarning(data.totalEarning);
        setTransactions(data.transactionsLastest);
      } 
      catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row d-flex justify-content-between">
          <div
            className={`${classes["statistical"]} col-md-3 border rounded-3`}
          >
            <div className="text-body-tertiary fw-bold">Users</div>
            <div className="fs-4">{countUser}</div>
            <div className="d-flex justify-content-end">
              <span id={classes["icon-user"]}>
                <i className="fa-regular fa-user"></i>
              </span>
            </div>
          </div>
          <div
            className={`${classes["statistical"]} col-md-3 border rounded-3`}
          >
            <div className="text-body-tertiary fw-bold">Orders</div>
            <div className="fs-4">{countOrder}</div>
            <div className="d-flex justify-content-end">
              <span id={classes["icon-order"]}>
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
            </div>
          </div>
          <div
            className={`${classes["statistical"]} col-md-3 border rounded-3`}
          >
            <div className="text-body-tertiary fw-bold">Earnings</div>
            <div className="fs-4">${totalEarning}</div>
            <div className="d-flex justify-content-end">
              <span id={classes["icon-earning"]}>
                <i className="fa-solid fa-circle-dollar-to-slot"></i>
              </span>
            </div>
          </div>
          <div
            className={`${classes["statistical"]} col-md-3 border rounded-3`}
          >
            <div className="text-body-tertiary fw-bold">Balance</div>
            <div className="fs-4">${totalEarning}</div>
            <div className="d-flex justify-content-end">
              <span id={classes["icon-balance"]}>
                <i className="fa-regular fa-credit-card"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* List Lastest Transaction */}
      <div className="d-flex justify-content-between mt-4 mb-2">
        <h2 className="fs-4 text-secondary">Lastest Transactions</h2>
      </div>
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
              transactions.map((transaction) => (
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
          <span className="me-3">1 - 8 of 8</span>
          <button className="border-0 bg-transparent text-black-50">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="border-0 bg-transparent text-black-50">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
