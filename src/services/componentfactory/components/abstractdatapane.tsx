// abstractdatapane.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React from 'react'

import ComponentFactory from '../../componentfactory'
import application from '../../../services/application'
import { 
    SetListenerMessage, 
    RemoveListenerMessage, 
    DocpackPairPayloadMessage,
    FactoryMessage,
    PostFormMessage,
    GenericObject,
    ControllerData,
} from '../../../services/interfaces'

interface AbstractDataPaneProps {
    docproxy:GenericObject,
    controller: GenericObject,
    attributes: GenericObject,
}

class AbstractDataPane extends React.Component<AbstractDataPaneProps,any> {

    constructor(props) {

        super(props)

        this.componentfactory = new ComponentFactory()

        let { docproxy, controller, attributes} = this.props

        // new
        this.docProxy = docproxy
        this.options = attributes && attributes.options
        this.attributes = attributes // used for local control

        this.controllerdata = controller

    }

    state = {
        docpack:null,
        typepack:null,
    }

    componentfactory:ComponentFactory = null
    attributes
    options
    docProxy
    controllerdata
    factorycomponent

    componentDidMount() {
        // subscribe to reference
        this.assertListener()
        
    }

    componentWillUnmount() {

        if (this.docProxy) {
            let msg:RemoveListenerMessage = 
            {
                doctoken:this.docProxy.doctoken,
                instanceid:this.docProxy.instanceid,
            }
            application.removeDocpackPairListener(msg)
        }

    }

    private assertListener = () => {

        if (this.docProxy) {
            let parms:SetListenerMessage = 
                {
                    doctoken:this.docProxy.doctoken,
                    instanceid:this.docProxy.instanceid,
                    success:this.successAssertListener,
                    failure:this.failureAssertListener,
                }

            application.setDocpackPairListener( parms )

        } else {
            let { attributes } = this
            let { assertinstance, typereference, collection, customid } = attributes

            if (assertinstance && typereference && collection) {
                let parms = {
                    typereference,
                    collection,
                    customid:customid || null,
                    success:this.successAssertListener,
                    failure:this.failureAssertListener,
                }

                this.docProxy = application.setNewDocpackPairListener( parms )

            } else {

                console.log('unable to create content props',this.props)
                this.factorycomponent = <div>unable to create content</div>
                this.forceUpdate()

            }

        }
    }

    private successAssertListener = (parmblock:DocpackPairPayloadMessage) => {

        let {docpack, typepack, reason} = parmblock

        if ( !this.componentfactory ) {
            this.componentfactory = new ComponentFactory()
        }

        // reformat for componentfactory
        let factoryMessage:FactoryMessage = 
            this.componentfactory.assembleFactoryMessage({
                // new
                docproxy:this.docProxy,
                options:this.options,
                docpack,
                typepack,
                controller:this.controllerdata,
            })

        this.factorycomponent = this.componentfactory.createUISelection(factoryMessage)

        this.setState({
            docpack,
            typepack,
        })

    }

    private failureAssertListener = (error,reason) => {
        console.log('abstractdatapane failureAssertListener',error,reason)
    }

    render() {

        return this.factorycomponent || null
        
   }

}

export default AbstractDataPane
