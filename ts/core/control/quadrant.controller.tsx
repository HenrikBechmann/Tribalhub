// quadrant.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict'

import * as React from 'react'

import QuadOrigin from './views/quadspace/quadorigin.view'
import QuadTitleBar from './views/quadspace/quadtitlebar.view'
import QuadStatusBar from './views/quadspace/quadstatusbar.view'
import QuadBadge from './views/quadspace/quadbadge.view'
import InfiniteScroll from './views/common/infinitescroll.view'
import SwapMenu from './views/quadspace/quadswapmenu.view'
import DataBox from './databox.controller'
import QuadSelector from './views/quadspace/quadselector.view'

class Quadrant extends React.Component<any,any>  {

    state = {
        quadrant:this.props.quadrant,
        data:this.props.data
    }

    sessionid = this.props.sessionid

    componentWillMount() {
        this.calculatePosition(this.state.quadrant)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quadrant != this.state.quadrant) {

            let self = this
            this.calculateTransitionPosition(this.state.quadrant)

            this.forceUpdate(() => {
                setTimeout(()=>{// give time for styles to apply
                        this.calculateTransitionPosition(nextProps.quadrant)
                        this.setState({
                            quadrant:nextProps.quadrant
                        },

                            () => {
                                setTimeout(() => { // give time for animation
                                    self.calculatePosition(this.state.quadrant)
                                    self.forceUpdate()
                                },600)
                            }

                        )
                })
            })
        }
    }

    calculateTransitionPosition = (quadrant) => {
        let top:any = 'auto'
        let left:any = 'auto'
        let bottom:any = 'auto'
        let right:any = 'auto'
        let element = this.element
        switch (quadrant) {
            case "topleft": {
                top = 0
                left = 0
                break;
            }
            case "topright": {
                top = 0
                left = element.parentElement.offsetWidth/2
                break;
            }
            case "bottomleft": {
                top = element.parentElement.offsetHeight/2
                left = 0
                break;
            }
            case "bottomright": {
                top = element.parentElement.offsetHeight/2
                left = element.parentElement.offsetWidth/2
                break;
            }
        }
        this.position = {
            top,
            left,
            bottom,
            right,
        }       
    }

    calculatePosition = (quadrant) => {
        let top:any = 'auto'
        let left:any = 'auto'
        let bottom:any = 'auto'
        let right:any = 'auto'
        switch (quadrant) {
            case "topleft": {
                top = 0
                left = 0
                break;
            }
            case "topright": {
                top = 0
                right = 0
                break;
            }
            case "bottomleft": {
                bottom = 0
                left = 0
                break;
            }
            case "bottomright": {
                bottom = 0
                right = 0
                break;
            }
        }
        this.position = {
            top,
            left,
            bottom,
            right,
        }       
    }

    position = null

    element = null

    getFieldComponents = fields => {

    }

    getProfileComponent = profile => {

    }

    getBacklinks = links => {

    }

    getBoxes = () => {
        let boxes = []
        let { data } = this.state
        if (data) {
            boxes = this.state.data.map((item) => {
                return <DataBox key = {item.sessionid} item = {item}/>
            })
        }

        return boxes
    }

    render() {
        let { color } = this.props
        let { quadrant } = this.state
        let {top, left, bottom, right} = this.position
        return (
            <div 
                style = {
                    {
                        position:'absolute',
                        boxSizing:'border-box',
                        width:'50%',
                        height:'50%',
                        padding:'3px',
                        top,
                        left,
                        bottom,
                        right,
                        border:'1px solid transparent',
                        transition:'all .5s ease'
                    }

                }
                ref = {(element) => {
                    this.element = element
                }}
            >
                <div style = {
                    {
                        boxSizing: 'border-box',
                        border: '3px outset gray',
                        position:'relative',
                        backgroundColor:color,
                        borderRadius:'8px',
                        width:'100%',
                        height:'100%',
                        overflow:'hidden',
                    }
                } >
                    <SwapMenu quadrant = {this.state.quadrant} handleswap = {this.props.handleswap}/>
                    <QuadTitleBar title = {this.props.title}/>
                    <QuadOrigin><QuadBadge quantity = {this.props.badgequantity} /></QuadOrigin>
                    <InfiniteScroll items = {this.getBoxes()}/>
                    <QuadSelector 
                        quadrant = {this.state.quadrant} 
                        split = {this.props.split} 
                        quadselection = {this.props.quadselection}
                    />
                </div>
            </div>
        )
    }
}

export default Quadrant