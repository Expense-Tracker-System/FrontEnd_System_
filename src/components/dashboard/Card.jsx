import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cards() {
    return (
        <div>
            <div className='row'>
                <div className='p-3 col-12 col-sm-7 col-md-5 col-lg-4 bg-light'>
                    <div className='d-flex justify-content-around align-items-center p-4 bg-white border border-secoundary shadow-sm '>
                        <i className="bi bi-currency-dollar fs-1 text-primary"></i>
                        <div>
                            <span>Current Balance</span>
                            <h2>2000</h2>
                        </div>
                    </div>

                </div>
                <div className='p-3 col-12 col-sm-7 col-md-5 col-lg-4 bg-light'>
                    <div className='d-flex justify-content-around align-items-center p-4 bg-white border border-secoundary shadow-sm '>
                        <i className="bi bi-currency-dollar fs-1 text-success"></i>
                        <div>
                            <span>Total Income</span>
                            <h2>2000</h2>
                        </div>
                    </div>

                </div>
                <div className='p-3 col-12 col-sm-7 col-md-5 col-lg-4 bg-light'>
                    <div className='d-flex justify-content-around align-items-center p-4 bg-white border border-secoundary shadow-sm '>
                        <i className="bi bi-currency-dollar fs-1 text-warning"></i>
                        <div>
                            <span>Total Expense</span>
                            <h2>2000</h2>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cards
