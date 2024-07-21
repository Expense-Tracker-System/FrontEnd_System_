import { flexbox } from '@mui/system';
import CreateOrganizationPage from '../../../components/OrganizationComponenets/CreateOrganizationPage';
import ViewOrganizations from  '../../../components/OrganizationComponenets/ViewOrganizations';
const UserOrganizationPage = () => {

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'></h1>
            <div >
                <CreateOrganizationPage />
            
                 <ViewOrganizations/>
            </div>
        </div>
    )
}

export default UserOrganizationPage