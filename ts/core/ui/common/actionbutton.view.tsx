// actionbutton.view.tsx

// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict'

import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import { withStyles, createStyles } from '@material-ui/core/styles'

const styles = createStyles({
    defaultButtonStyle:{
        padding:'0',
        width:'32px',
        height:'32px',
        float:'right',
        verticalAlign:'bottom',
        marginRight:'3px'
    },

    defaultIconStyle:{
        width:'1em'
    },

})

interface propsInterface {
    buttonStyle?:React.CSSProperties,
    iconStyle?:React.CSSProperties
    action?:Function,
    icon?:string,
    img?:string,
    component?:any,
    disabled?:boolean,
    badgequantity?:number,
    classes:any,
}

const ActionButton = (props:propsInterface) => {

    let {buttonStyle, iconStyle, action, icon, img, component, disabled, classes} = props

    let localiconstyle
    if (!icon) { // it's an image, manual opacity required
        localiconstyle = {
            verticalAlign:'middle',
            opacity:disabled?.26:.54 // material ui values: TODO: take these settings from theme
        }
    }
    let iconcomponent = icon?<Icon 
        className = {classes.defaultIconStyle}
        style = {{...localiconstyle,...iconStyle}} >{icon}</Icon>:
    img?<img className = {classes.defaultIconStyle}
        style = {{...localiconstyle,...iconStyle}} src = {img} />:component
    let onClickVal = 
        (action && !disabled)
            ?() => {action()}
            :() => {}
    return (
        <IconButton
            className = {classes.defaultButtonStyle}
            style = {buttonStyle}
            onClick = {onClickVal}
            disabled = {disabled}
        >
            {iconcomponent}
        </IconButton>
    )
}

export default withStyles(styles)(ActionButton)
