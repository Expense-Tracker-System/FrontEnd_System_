import React from 'react'
import GetEIDetails  from '../../../components/OrganizationComponenets/GetEIDetails'
import TakeAmount from '../../../components/OrganizationComponenets/TakeAmount'
import Oshares from '../../../components/OrganizationComponenets/Oshares'
import Balance from '../../../components/OrganizationComponenets/Balance'
import Ostatts from '../../../components/OrganizationComponenets/Ostatts'

function UserOrganizationProfile() {
  return (
    <div style={{width:'110%'}}>
      <div style={{ paddingLeft: '250px',paddingTop: '60px' }}>
       <GetEIDetails/>
      </div>
      <div style={{ paddingLeft: '250px' }}>
       <TakeAmount/>
      </div>
      
        <div style={{ paddingLeft: '250px' }}>
          <Oshares/>
       </div>

       <div style={{ paddingLeft: '250px' }}>
          <Balance/>
       </div>
       <div>
<Ostatts />
       </div>
       <div>
       
       </div>
    </div>
  )
}

export default UserOrganizationProfile
