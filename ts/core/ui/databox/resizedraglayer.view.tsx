// resizedraglayer.view.tsx

// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict'

import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'
import { DragLayer } from 'react-dnd'

const styles = createStyles({
    frame:{
        border:'5px solid silver',
        position:'absolute',
        top:-6,
        borderRadius:12,
    },
})

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentDifference: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging()
}))
class ResizeDragLayer extends React.Component<any,any> {

    constructor(props) {
        super(props)
        this.previewElement = React.createRef()
    }

    state = {
        width:this.props.offsetWidth,
        left:-6,
    }

    previewElement

    startingwidth = this.props.offsetWidth
    startingleft = -6

    lastoffset = 0

    render() {
        const { classes } = this.props
        // console.log('custom drag layer',this.lastoffset/2, this.state.width,this.state.left,this.props)

        if (this.previewElement.current) {

            let diff = this.props.currentDifference.x
            if (Math.abs(this.lastoffset - diff) > 1) {
                this.lastoffset = diff
                let shift = diff /2

                let widthnumber = this.startingwidth + (diff * 2)

                if (widthnumber >= 300 && widthnumber <= 600) {

                    let width = (widthnumber) + 'px'
                    let left = (this.startingleft - diff) + 'px'

                    this.previewElement.current.style.width = width
                    this.previewElement.current.style.left = left

                }
            }
        }

        const framestyles:React.CSSProperties = {
            height:this.props.offsetHeight,
        }
        return <div 
            ref = {this.previewElement}
            className = {classes.frame} 
            style = {framestyles}
        ></div>
    }

}

export default withStyles(styles)(ResizeDragLayer)