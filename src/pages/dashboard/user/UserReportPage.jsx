
import ReportPage from "../../../components/ReportComponents/ReportPage";
import Chart from "../../../components/ReportComponents/Chart" ;



const UserReportPage = () => {

   
    return (
        <div className='pageTemplate2'>
            <div className="upper">
         <ReportPage/>
            </div>
        <div className="lower">    
          <Chart/>
            </div>
        </div>
    )
}

export default UserReportPage