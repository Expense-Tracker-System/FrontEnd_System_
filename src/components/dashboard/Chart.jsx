import React from 'react';
import Barchart from './BarChart';
import PieChart from './PieChart'

function Charts() {
    return (
        <div>
            <div className='row'>
                <div className='col-12 col-md-8 p-3'>
                    <Barchart />
                </div>
                <div className='col-12 col-md-4 p-3'>
                    <PieChart />
                </div>
            </div>
        </div>
    )
}

export default Charts
