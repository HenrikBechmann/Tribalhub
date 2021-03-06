// quadbasket.view.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later
'use strict'

import React from 'react'
import OriginMenu from './quadoriginmenu.view'
import QuantityBadge from '../common/quantitybadge.view'

import { withStyles, createStyles } from '@material-ui/core/styles'

const styles = createStyles({
    root:{
        position:'absolute',
        top:'24px',
        left:'0',
        width:'40px',
        height:'60px',
        backgroundColor:'green',
        borderRadius:'8px',
        zIndex:5,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    moniker:{
        opacity:0.5,
        fontSize:'.7em',
    },
    icon:{
        position:'absolute',
        margin:'auto',
        top:'10px',
        left:'0',
        opacity:.3,
        width:'100%',
        textAlign:'center',
        cursor:'pointer',
    },
    image:{width:'40px'},

})

let QuadOriginBase = withStyles(styles)(
    (props:any) => {

    const { 
        classes, 
        stackdepth, 
        stackpointer, 
        itemdepth, 
        haspeers,
        incrementStackSelector,
        decrementStackSelector, 
    } = props

    let originextent = itemdepth?stackdepth:0
    let origindepth = originextent?stackpointer + 1:0

    return (
        <div 
            className = {classes.root}
            ref = {props.forwardedRef}
        >
            <QuantityBadge quantity = {originextent} />
            <QuantityBadge quantity = {origindepth} 
                style = {{
                    top:'auto',
                    bottom:'0',
                    right:'auto',
                    left: '0',
                    backgroundColor:'red',
                    color:'white',
               }}
            />
            <div className = { classes.moniker }>STACK</div>
            <div className = { classes.icon }
            >
                <img className = {classes.image} src = '/public/icons/OriginStack.svg' />
            </div>
            <OriginMenu 
                haspeers = {haspeers}
                stackdepth = {stackdepth}  
                stackpointer = {stackpointer}
                incrementStackSelector = {incrementStackSelector}
                decrementStackSelector = {decrementStackSelector}
            />
        </div>    
    )
})

const QuadOrigin = React.forwardRef((props:any,ref:any) => {
    return <QuadOriginBase {...props} forwardedRef = {ref} />
})

export default QuadOrigin
