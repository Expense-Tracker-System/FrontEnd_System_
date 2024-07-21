import React from 'react'
import GetEIDetails  from '../../../components/OrganizationComponenets/GetEIDetails'
import TakeAmount from '../../../components/OrganizationComponenets/TakeAmount'
import Oshares from '../../../components/OrganizationComponenets/Oshares'
import Balance from '../../../components/OrganizationComponenets/Balance'
import Ostatts from '../../../components/OrganizationComponenets/Ostatts'
import Organizationname from '../../../components/OrganizationComponenets/Organizationname'

import { useLocation } from 'react-router-dom'

function UserOrganizationProfile() {
  const location = useLocation()

  // console.log(location.state.id);

  return (
    <div style={{width:'110%'}}>
      <div style={{ paddingLeft: '250px' }}>
       <Organizationname/>
      </div>
      <div style={{ paddingLeft: '250px',paddingTop: '60px' }}>
       <GetEIDetails/>
      </div>
      <div style={{ paddingLeft: '250px' }}>
       <TakeAmount/>
      </div>
      
        <div style={{ paddingLeft: '250px',marginTop:'10px' }}>
          <Oshares />
       </div>

       <div style={{ paddingLeft: '250px',paddingTop: '25px' }}>
          <Balance/>
       </div>
       <div style={{ paddingLeft: '250px',paddingTop: '25px' }} >
          <Ostatts/>            
       </div>
       <div>
       
       </div>
    </div>
  )
}

export default UserOrganizationProfile
