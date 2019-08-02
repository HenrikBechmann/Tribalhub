// useraccount.controldata.tsx
// copyright (c) 2019 Henritk Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React, {useState} from 'react'

import UserDataContext from './userdata.context'
import SystemDataContext from './systemdata.context'
import UserAccountPermissionData from './useraccount.activepermissions.data'

const UserAccountActiveControls = (props) => {

    return <SystemDataContext.Consumer>

        {systemdata => (
            
            <UserDataContext.Consumer>

                {(userdata) => (

                    <UserAccountPermissionData systemdata = {systemdata} userdata = {userdata}>
                        { (activeaccountdata, activememberdata) => {

                            console.log('useraccount permissiondata in useraccount controldata',systemdata, userdata,activeaccountdata,activememberdata)
                            return props.children( 
                                systemdata, 
                                userdata,
                                activeaccountdata,
                                activememberdata,
                            )}
                        }
                    </UserAccountPermissionData>

                )}

            </UserDataContext.Consumer>
        )}
    </SystemDataContext.Consumer>

}

export default UserAccountActiveControls