// build.controller.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React, {useState} from 'react'

import InfiniteScroller from '../common/infinitescrollbygrid/infinitescrollbygrid'
import TestOptions from './test/testoptions'

const styles = {
    viewportframe: {
        top:0,
        bottom:0,
        right:0, 
        left:0,
        position:'absolute', 
        margin:'10px', 
        border:'1px solid black'
    },
    framewrapper: {
        position:'relative',
        height:'500px',
    },
    optionswrapper: {
        padding:'8px',
    },
}
    
const Home = (props) => {
    let [orientation, setOrientation] = useState('horizontal')

    const handleOrientationCallback = (orientation) => {
        setOrientation(orientation)
    }

    return <>
        <div style = {styles.optionswrapper as React.CSSProperties} >
            <TestOptions orientationCallback = { handleOrientationCallback }/>
        </div>
        <div style = {
            styles.framewrapper as React.CSSProperties
        }>
            <div style = {
                styles.viewportframe as React.CSSProperties
            }>
                <InfiniteScroller 
                    orientation = { orientation } 
                    gap = {2}
                    padding = {2}
                    cellHeight = {50}
                    cellWidth = {50}
                    runway = {200}
                    offset = {0}
                    listsize = {1000}
                />
            </div>
        </div>
        </>
}

export default Home

