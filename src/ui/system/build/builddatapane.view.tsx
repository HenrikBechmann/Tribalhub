// quaddatapane.view.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import application from '../../../services/application'
import { toast } from 'react-toastify'

import { 
    GetCollectionMessage,
    DocpackListPayloadMessage,
} from '../../../services/interfaces'

let _ = require('lodash')

const styles = createStyles({
    root:{
        position:'absolute',
        top:'15px',
        right:'6px',
        bottom:'6px',
        left:'6px',
        overflow:'auto',
    },
    content:{
        padding:'3px',
    },
    platform:{
        width:'100%',
        padding:'3px',
    }
})

class BuildDataPane extends React.Component<any,any>  {

    state = {
        open:this.props.open,
        opcode:this.props.dataPaneMessage?this.props.dataPaneMessage.options.opcode:undefined,
        specs:this.props.dataPaneMessage?this.props.dataPaneMessage.options.specs:undefined,
    }

    data = null

    componentDidUpdate() {

        let { open, dataPaneMessage } = this.props

        dataPaneMessage = dataPaneMessage || {docproxy:{},options:{}}

        let { opcode, specs } = dataPaneMessage.options
        if (!_.isEqual(open,this.state.open) || 
            !_.isEqual(opcode,this.state.opcode) ||
            !_.isEqual(specs, this.state.specs)) {

            this.setState({
                open,
                opcode,
                specs,
            },() => {
                this.updateData()
            })
        }
    }

    updateData = () => {
        let { userdata } = this.props
        let superuser = (userdata && userdata.globalrole == 'superuser' )// '0RLrSksoCeYcmnInICk0ia4D40u1'))

        if (this.state.open) {
            if (!superuser) {
                toast.info('Data Drawer data is only available to Henrik Bechmann as this time')
            } else {
                let parm:GetCollectionMessage = {
                    reference:this.state.specs.collection,
                    success:this.dataSuccess,
                    failure:this.dataFailure,
                }
                application.getCollection(parm)
            }
        } else {
            if (superuser) {
                this.data = null
                this.forceUpdate()
            }
        }
    }

    dataSuccess = (payload:DocpackListPayloadMessage) => {
        this.data = payload.docpacklist
        this.forceUpdate()
    }

    dataFailure = (error,reason) => {
        console.log('collection fetch error',error)
        toast.error(error)
    }

    getListItems = () => {
        let items = []
        let data = this.data

        if (!data) return items

        for (let item of data) {
            let logicaltype 

            if (item.document && item.document.control_type_logical) {
                logicaltype = item.document.control_type_logical
            } else {
                logicaltype = 'n/a'
            }
            items.push(
                <ListItem dense key = {item.reference}>
                    <ListItemText primary = {`${item.reference} (${logicaltype})`} />
                </ListItem>
            )
        }
        return items
    }

    render() {
        const { classes, dataspecs } = this.props

        return <Paper className = {classes.root}>
            <div className = { classes.content }>
                <div className = { classes.platform }>
                    <List dense disablePadding >
                        {this.getListItems()}
                    </List>
                </div>
            </div>
        </Paper>
    }

}

export default withStyles(styles)( BuildDataPane )
