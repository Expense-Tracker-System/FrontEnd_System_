import React from 'react'
import GetEIDetails  from '../../../components/OrganizationComponenets/GetEIDetails'
import TakeAmount from '../../../components/OrganizationComponenets/TakeAmount'
import Ostatts from '../../../components/OrganizationComponenets/Ostatts'
import Oshares from '../../../components/OrganizationComponenets/Oshares'

function UserOrganizationProfile() {
  return (
    <div style={{width:'110%'}}>
      <div style={{ paddingLeft: '250px',paddingTop: '60px' }}>
       <GetEIDetails/>
      </div>
      <div style={{ paddingLeft: '250px' }}>
       <TakeAmount/>
      </div>
      <div>
        <div>
          <Oshares/>
        </div>
        <div>
          <Ostatts/>
        </div>

      </div>
    </div>
  )
}

export default UserOrganizationProfile
