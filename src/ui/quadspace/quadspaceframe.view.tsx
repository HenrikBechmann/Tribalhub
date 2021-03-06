// quadframe.view.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later
'use strict'

import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'

const styles = createStyles({
    root: {
        position:'fixed',
        height:'100%',
        width:'100%',
        backgroundColor:'silver',
    },
})

const QuadSpaceFrame = props => {
    let { classes } = props
    return (
        <div 
            id = "quadframe" 
            className = { classes.root }
        >
            { props.children }
        </div>        
    )
}

export default withStyles(styles)(QuadSpaceFrame)