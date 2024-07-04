import CreateOrganizationPage from '../../../components/OrganizationComponenets/CreateOrganizationPage';
import ViewOrganizations from  '../../../components/OrganizationComponenets/ViewOrganizations';
const UserOrganizationPage = () => {

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'></h1>
            <div>
                <CreateOrganizationPage />
            </div>
            <div>
                 <ViewOrganizations/>
            </div>
        </div>
    )
}

export default UserOrganizationPage