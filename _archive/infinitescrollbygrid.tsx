// iscrollbygrid                                                                                                      .tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React from 'react'

import Viewport from './infinitescrollbygrid/viewport'
import Scrollblock from './infinitescrollbygrid/scrollblock'
import Cradle from './infinitescrollbygrid/cradle'

/*
use IntersectionObserver, getBoundingClientRect, will-change

use transform:translate to extend the cradle when scrolling?

allow list type static or dynamic. Static items can be re-ordered; dynamic items are virtual

allow a position bar at bottom -- scrolling stops (and cradle fades) while 
position bar value is being changed. Position bar gives feedback on location (configureable)

change key for updates

transform out of scope items to blank space

allow for dividers

*/

// ===================================[ INITIALIZE ]===========================

/*
    The only job of IScrollByGrid is to pass paramters to dependents
    Viewport contains the scrollblock (scrolling block)
    Scrollblock represents the entirety of the list, and scrolls
    Cradle contains the list items, and is 'virtualiized' -- it appears as
      though it is the full scrollblock, but in fact it is only slightly larger than
      the viewport.
    - individual items are framed by ItemFrame, managed by Cradle
*/
const InfiniteScrollByGrid = (props) => {
    let { 
        orientation, 
        gap, 
        padding, 
        cellHeight, 
        cellWidth, 
        runway, 
        listsize, 
        offset,
        placeholder,
        getItem,
        preload,
        dense,
        cellSizing,
    } = props
    // console.log('inside Scroller: orientation', orientation)

    if (!['horizontal','vertical'].includes(orientation)) {
        console.warn('invalid value for scroller orientation; resetting to default',orientation)
        orientation = 'horizontal'
    }

    gap !?? (gap = 0)
    padding !?? (padding = 0)
    runway !?? (runway = 800)
    offset !?? (offset = 0)
    listsize !?? (listsize = 0)
    !preload && (dense = false)

    return <Viewport orientation = {orientation}>
        <Scrollblock

            listsize = { listsize }
            cellWidth = { cellWidth }
            cellHeight = { cellHeight }
            gap = { gap}
            padding = { padding }
            orientation = { orientation }

        >

            <Cradle 

                gap = { gap }
                padding = { padding }
                cellWidth = { cellWidth }
                cellHeight = { cellHeight }
                listsize = { listsize }
                offset = { offset }
                orientation = { orientation }
                runway = { runway } 
                dense = { dense }
                preload = { preload }

                placeholder = { placeholder }
                getItem = { getItem }

            />

        </Scrollblock>
    </Viewport>

}

export default InfiniteScrollByGrid
