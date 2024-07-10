import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function PrgressCircular() {
    const percentage1 = 66;
    const percentage2 = 50;
    const percentage = 25;

    return (
        <div>

            <div className='row'>
                <div className='p-3 col-12 col-sm-6 col-md-4 col-lg-3 bg-light d-flex flex-column justify-content-center'>
                    <div className='d-flex justify-content-around align-items-center rounded p-4 bg-white border border-secoundary shadow-sm '>
                        <div className=''>
                            <CircularProgressbar
                                value={percentage1}
                                text={`${percentage1}%`}
                                styles={buildStyles({
                                    rotation: 0.50,
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(6, 135, 131, ${percentage1 / 100})`,
                                    textColor: '#000',
                                    trailColor: '#4FF5EF',
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                            <span>Transfer via bank</span>
                        </div>
                    </div>
                </div>
                <div className='p-3 col-12 col-sm-6 col-md-4 col-lg-3 bg-light d-flex flex-column justify-content-center'>
                    <div className='d-flex justify-content-around align-items-center rounded p-4 bg-white border border-secoundary shadow-sm '>
                        <div className=''>
                            <CircularProgressbar
                                value={percentage2}
                                text={`${percentage2}%`}
                                styles={buildStyles({
                                    rotation: 0.25,
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(47, 156, 8, ${percentage2 / 100})`,
                                    textColor: '#000',
                                    trailColor: '#7BFA4C',
                                    backgroundColor: '#3e98c7',
                                })} />
                            <span >Transfer via Investment</span>
                        </div>
                    </div>
                </div>
                <div className='p-3 col-12 col-sm-6 col-md-4 col-lg-3 bg-light d-flex flex-column justify-content-center'>
                    <div className='d-flex justify-content-around align-items-center rounded p-4 bg-white border border-secoundary shadow-sm '>
                        <div className=''>
                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                            <span>Transfer via Expenses</span>
                        </div>
                    </div>
                </div>
                <div className='p-3 col-12 col-sm-6 col-md-4 col-lg-3 bg-light d-flex flex-column justify-content-center'>
                    <div className='d-flex justify-content-around align-items-center rounded p-4 bg-white border border-secoundary shadow-sm '>
                        <div className=''>
                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                            <span>Transfer via others</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PrgressCircular
