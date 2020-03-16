// cradle.tsx
// copyright (c) 2020 Henrik Bechmann, Toronto, Licence: MIT

import React, { useState, useRef, useContext, useEffect, useCallback, useMemo } from 'react'

import { ViewportContext } from './viewport'

import { 
    setCradleStyles, 
    getUIContentList, 
    calcVisibleItems, 
    getVisibleTargetData, 
    getContentListRequirements,
    setCradleStyleRevisionsForDrop,
    setCradleStyleRevisionsForAdd,
    normalizeCradleAnchors,
    // isCradleInView,
} from './cradlefunctions'

import ScrollTracker from './scrolltracker'

/*

    BUG: interrupts in scroll, resize, pivot. Fix logic in setCradleContent

    2 scrollToItem(index[,alignment]) - alignment = start, center, end, or nearest (default)
    create getContentList:null, getVisibleList:null, 


    1 add examples 1, 2, 3 to control page: 
        - images, scroll and pivot
        - nested lists, scroll and pivot

*/

const Cradle = ({ 
        gap, 
        padding, 
        runwaylength, 
        listsize, 
        offset, 
        orientation, 
        cellHeight, 
        cellWidth, 
        getItem, 
        placeholder, 
        component,
        styles,
    }) => {

    // =============================================================================================
    // --------------------------------------[ initialization ]-------------------------------------

    // initialize window listener
    useEffect(() => {
        viewportData.elementref.current.addEventListener('scroll',onScroll)
        window.addEventListener('resize',onResize)

        // if (component?.elements.hasOwnProperty('cradleRef')) {
        //     component.elements.cradleRef = cradleElementRef
        // } 
        
        if (component?.items.hasOwnProperty('visibleRef')) {
            component.items.visibleRef = visibleListRef
        } 

        if (component?.items.hasOwnProperty('contentRef')) {
            component.items.contentRef = itemElementsRef
        } 

        if (component?.hasOwnProperty('scrollToItem')) {
            component.scrollToItem = scrollToItem
        } 

        return () => {
            viewportData.elementref.current.removeEventListener('scroll',onScroll)
            window.removeEventListener('resize',onResize)
        }
    },[])

    // main control
    const [cradlestate, saveCradleState] = useState('setup')
    const cradlestateRef = useRef(null) // access by closures
    cradlestateRef.current = cradlestate

    // current location
    const [referenceindexdata, saveReferenceindex] = useState({index:Math.min(offset,(listsize - 1)) || 0,scrolloffset:0})
    const referenceIndexDataRef = useRef(null) // access by closures
    referenceIndexDataRef.current = referenceindexdata

    const isCradleInViewRef = useRef(true)

    // console.log('==>> RUNNING Cradle with state ',cradlestate)

    const [dropentries, saveDropentries] = useState(null)

    const [addentries, saveAddentries] = useState(null)

    // const [contentlist,saveContentlist] = useState([])
    const contentlistRef = useRef([])

    const isScrollingRef = useRef(false)

    const isResizingRef = useRef(false)

    const isSettlingRef = useRef(false)

    const viewportData = useContext(ViewportContext)

    const itemobserverRef = useRef(null)

    const cradleobserverRef = useRef(null)

    const cellSpecs = useMemo(() => {
        return {
            cellWidth,cellHeight,gap
        }
    },[cellWidth,cellHeight,gap])
    const cellSpecsRef = useRef(null)
    cellSpecsRef.current = cellSpecs

    const pauseObserversRef = useRef(false)

    const mainConfigDatasetRef = useRef({setup:true})

    const divlinerStylesRef = useRef(Object.assign({
        position: 'absolute',
        backgroundColor: 'blue',
        display: 'grid',
        gridGap: gap + 'px',
        padding: padding + 'px',
        justifyContent:'start',
        alignContent:'start',
        boxSizing:'border-box',

    } as React.CSSProperties,styles?.cradle))

    const orientationRef = useRef(orientation)
    orientationRef.current = orientation // availability in closures

    const divlinerStyleRevisionsRef = useRef(null) // for modifications by observer actions

    const cradleElementRef = useRef(null)

    const viewportDimensions = useMemo(()=>{

        let { viewportRect } = viewportData
        let { top, right, bottom, left } = viewportRect

        let viewportheight = bottom - top
        let viewportwidth = right - left
        return [viewportheight, viewportwidth]

    },[viewportData.viewportRect])

    let [viewportheight,viewportwidth] = viewportDimensions

    const crosscount = useMemo(() => {

        let crosscount
        let size = (orientation == 'horizontal')?viewportheight:viewportwidth
        let crossLength = (orientation == 'horizontal')?cellHeight:cellWidth

        let lengthforcalc = size - (padding * 2) + gap
        crosscount = Math.floor(lengthforcalc/(crossLength + gap))
        return crosscount

    },[
        orientation, 
        cellWidth, 
        cellHeight, 
        gap, 
        padding, 
        viewportheight, 
        viewportwidth,
    ])

    // ==============================================================================================
    // ----------------------------------[ config management ]--------------------------------

    const crosscountRef = useRef(crosscount) // for easy reference by observer
    const previousCrosscountRef = useRef() // available for resize logic
    previousCrosscountRef.current = crosscountRef.current // available for resize logic
    crosscountRef.current = crosscount // available for observer closure

    // capture previous versions for reconfigure calculations above
    const configDataRef:any = useRef({})
    const previousConfigDataRef:any = useRef({})
    const visibleListRef = useRef([])

    configDataRef.current = useMemo(() => {
        
        previousConfigDataRef.current = {previousvisible:[...visibleListRef.current],...configDataRef.current} 

        return {

        cellWidth,
        cellHeight,
        gap,
        padding,
        runwaylength,
        viewportheight,
        viewportwidth,
        crosscount,
        orientation,

    }},[
        cellWidth, 
        cellHeight, 
        gap, 
        padding,
        runwaylength,
        viewportheight, 
        viewportwidth,
        crosscount,
        orientation,
    ])

    divlinerStylesRef.current = useMemo(()=> {

        // merge base style and revisions (by observer)
        let divlinerStyles:React.CSSProperties = Object.assign({...divlinerStylesRef.current},divlinerStyleRevisionsRef.current)
        let styles = setCradleStyles({

            orientation, 
            divlinerStyles, 
            cellHeight, 
            cellWidth, 
            gap,
            crosscount, 
            viewportheight, 
            viewportwidth, 

        })

        return styles
    },[
        orientation,
        cellHeight,
        cellWidth,
        gap,
        padding,
        viewportheight,
        viewportwidth,
        crosscount,
        divlinerStyleRevisionsRef.current
      ])

    const itemElementsRef = useRef(new Map())
    const scrollTimeridRef = useRef(null)

    // =================================================================================
    // -------------------------[ IntersectionObserver support]-------------------------

    // There are two observers, one for the cradle, and another for itemShells; both against
    // the viewport.

    // --------------------------[ cradle observer ]-----------------------------------
    // this sets up an IntersectionObserver of the cradle against the viewport. When the
    // cradle goes out of the observer scope, the "repositioning" cradle state is triggerd.
    useEffect(() => {
        cradleobserverRef.current = new IntersectionObserver(
            cradleobservercallback,
            {root:viewportData.elementref.current}
        )
        cradleobserverRef.current.observe(cradleElementRef.current)
    },[])

    const cradleobservercallback = useCallback((entries) => {
        
        isCradleInViewRef.current = entries[0].isIntersecting

    },[])

    // --------------------------[ item shell observer ]-----------------------------

    /*
        The cradle content is driven by notifications from the IntersectionObserver.
        - as the user scrolls the cradle, which has a runway at both the leading
            and trailing edges, itemShells scroll into or out of the scope of the observer 
            (defined by the width/height of the viewport + the lengths of the runways). The observer
            notifies the app (through itemobservercallback() below) at the crossings of the itemshells 
            of the defined observer cradle boundaries.

            The no-longer-intersecting notifications trigger dropping of that number of affected items from 
            the cradle contentlist. The dropping of items from the trailing end of the content list
            triggers the addition of an equal number of items at the leading edge of the cradle content.

            Technically, the opposite end position spec is set (top or left depending on orientation), 
            and the matching end position spec is set to 'auto' when items are added. This causes items to be 
            "squeezed" into the leading or trailing ends of the ui content (out of view) as appropriate.

            There are exceptions for setup and edge cases.
    */

    // the async callback from IntersectionObserver. this is a closure
    const itemobservercallback = useCallback((entries)=>{

        if (pauseObserversRef.current) {
            return
        }

        if (cradlestateRef.current == 'ready') { // first pass is after setBaseContent, no action required
            let dropentries = entries.filter(entry => (!entry.isIntersecting))
            if (dropentries.length) {

                saveDropentries(dropentries)

            }
        }

    },[])

    // drop scroll content
    useEffect(()=>{
        if (dropentries === null) return

        let sampleEntry = dropentries[0]

        let cradleElement = cradleElementRef.current
        let parentElement = cradleElement.parentElement
        let viewportElement = viewportData.elementref.current

        let scrollforward
        let localContentList

        // -- isolate forward and backward lists
        //  then set scrollforward
        let forwardcount = 0, backwardcount = 0
        for (let droprecordindex = 0; droprecordindex <dropentries.length; droprecordindex++ ) {
            if (orientation == 'vertical') {

                if (sampleEntry.boundingClientRect.y - sampleEntry.rootBounds.y < 0) {
                    forwardcount++
                } else {
                    backwardcount++
                }
            
            } else {
            
                if (sampleEntry.boundingClientRect.x - sampleEntry.rootBounds.x < 0) {
                    forwardcount++
                } else {
                    backwardcount++
                }
            
            }
        }

        let netshift = forwardcount - backwardcount
        if (netshift == 0) return

        scrollforward = (forwardcount > backwardcount)

        netshift = Math.abs(netshift)

        // set localContentList
        let indexoffset = contentlistRef.current[0].props.index
        let pendingcontentoffset
        let newcontentcount = Math.ceil(netshift/crosscountRef.current)*crosscountRef.current
        let headindexcount, tailindexcount

        if (scrollforward) {
            pendingcontentoffset = indexoffset + netshift
            let proposedtailoffset = pendingcontentoffset + newcontentcount + ((contentlistRef.current.length - netshift ) - 1)

            if ((proposedtailoffset) > (listsize -1) ) {
                newcontentcount -= (proposedtailoffset - (listsize -1))
                if (newcontentcount <=0) { // defensive
                    return
                }
            }

            headindexcount = -netshift
            tailindexcount = 0

        } else {

            pendingcontentoffset = indexoffset
            let proposedindexoffset = pendingcontentoffset - newcontentcount
            if (proposedindexoffset < 0) {
                proposedindexoffset = -proposedindexoffset
                newcontentcount = newcontentcount - proposedindexoffset
                if (newcontentcount <= 0) {
                    return 
                }
            }

            headindexcount = 0
            tailindexcount = -netshift

        }

        localContentList = getUIContentList({

            indexoffset,
            localContentList:contentlistRef.current,
            headindexcount,
            tailindexcount,
            callbacksRef,

        })

        let styles = setCradleStyleRevisionsForDrop({ 

            cradleElement, 
            parentElement, 
            scrollforward, 
            orientation 

        })

        // immediate change for modification
        let elementstyle = cradleElementRef.current.style
        elementstyle.top = styles.top
        elementstyle.bottom = styles.bottom
        elementstyle.left = styles.left
        elementstyle.right = styles.right

        // synchronization
        divlinerStyleRevisionsRef.current = styles 

        // saveContentlist(localContentList) // delete entries
        contentlistRef.current = localContentList
        saveDropentries(null)
        saveAddentries({count:newcontentcount,scrollforward,contentoffset:pendingcontentoffset})

    },[dropentries])

    // add scroll content
    useEffect(()=>{
        if (addentries === null) return

        let cradleElement = cradleElementRef.current
        let parentElement = cradleElement.parentElement
        let viewportElement = viewportData.elementref.current

        let { scrollforward } = addentries
        let localContentList

        // set localContentList
        let { contentoffset, count:newcontentcount } = addentries

        let headindexcount, tailindexcount
        if (scrollforward) {

            headindexcount = 0,
            tailindexcount =  newcontentcount

        } else {

            headindexcount = newcontentcount
            tailindexcount = 0

        }

        localContentList = getUIContentList({

            localContentList: contentlistRef.current,
            headindexcount,
            tailindexcount,
            indexoffset: contentoffset,
            orientation,
            cellHeight,
            cellWidth,
            observer: itemobserverRef.current,
            crosscount,
            callbacksRef,
            getItem,
            listsize,
            placeholder,

        })

        let styles = setCradleStyleRevisionsForAdd({

            cradleElement,
            parentElement,
            scrollforward,
            orientation,

        })

        // immediate change for modification
        let elementstyle = cradleElementRef.current.style
        elementstyle.top = styles.top
        elementstyle.bottom = styles.bottom
        elementstyle.left = styles.left
        elementstyle.right = styles.right

        // synchronization
        divlinerStyleRevisionsRef.current = styles

        // saveContentlist(localContentList)
        contentlistRef.current = localContentList
        saveAddentries(null)

    },[addentries])
    // End of IntersectionObserver support

    // ========================================================================================
    // -------------------------------[ Assembly of content]-----------------------------------
    
    // reset cradle
    const setCradleContent = useCallback((cradleState) => {

        let { index: visibletargetindexoffset, 
            scrolloffset: cradletargetindexoffset } = referenceIndexDataRef.current

        // console.log('running setCradleContent with cradleState, visibletargetindexoffset',cradleState, visibletargetindexoffset)

        let localContentList = [] // any duplicated items will be re-used by react

        let {indexoffset, contentCount, scrollblockoffset, calculatedcradleposition} = 
            getContentListRequirements({ // internal
                cellHeight, 
                cellWidth, 
                orientation, 
                viewportheight, 
                viewportwidth, 
                runwaylength, 
                gap,
                padding,
                visibletargetindexoffset,
                targetScrollOffset:cradletargetindexoffset,
                crosscount,
                listsize,
            })

        let childlist = getUIContentList({
            indexoffset, 
            headindexcount:0, 
            tailindexcount:contentCount, 
            orientation, 
            cellHeight, 
            cellWidth, 
            localContentList,
            observer:itemobserverRef.current,
            crosscount,
            callbacksRef,
            getItem,
            listsize,
            placeholder,
        })


        let styles:React.CSSProperties = {}
        let cradleoffset
        if (orientation == 'vertical') {

            styles.top = calculatedcradleposition + 'px'
            styles.bottom = 'auto'
            styles.left = 'auto'
            styles.right = 'auto'

            viewportData.elementref.current.scrollTop = scrollblockoffset

        } else { // orientation = 'horizontal'

            styles.top = 'auto'
            styles.bottom = 'auto'
            styles.left = calculatedcradleposition + 'px'
            styles.right = 'auto'

            viewportData.elementref.current.scrollLeft = scrollblockoffset
        }

        divlinerStyleRevisionsRef.current = styles
        referenceIndexDataRef.current = {
            index:visibletargetindexoffset,
            scrolloffset:cradletargetindexoffset,
        }

        saveReferenceindex(referenceIndexDataRef.current)

        contentlistRef.current = childlist

    },[
        cellHeight,
        cellWidth,
        orientation,
        viewportheight,
        viewportwidth,
        runwaylength,
        gap,
        padding,
        crosscount,
      ]
    )

    // maintain a list of visible items (visibleList) 
    // on shift of state to ready, or trigger next state after repositioning
    // when scroll ends.
    useEffect(() => {

        if (isScrollingRef.current) return

        if (cradlestate == 'ready') {

            if (!isResizingRef.current) { // conflicting responses; resizing needs current version of visible before change

                // console.log('calculating visible item list')
                // update visible list
                let itemlist = Array.from(itemElementsRef.current)

                visibleListRef.current = calcVisibleItems(
                    itemlist,viewportData.elementref.current,cradleElementRef.current, orientation
                )

                normalizeCradleAnchors(cradleElementRef.current, orientation)
                    
            }

        }

    },[cradlestate] ) // , isScrollingRef.current])

    // =====================================================================================
    // ----------------------------------[ state management ]-------------------------------

    const scrollToItem = useCallback((index, alignment = 'nearest') => {
        console.log('requested scrollToItem',index, alignment)
    },[])

    // callback for scroll
    const onScroll = useCallback((e) => {

        if (!isScrollingRef.current)  {

            isScrollingRef.current = true

        }

        clearTimeout(scrollTimeridRef.current)
        scrollTimeridRef.current = setTimeout(() => {
            // console.log('scrolling TIMEOUT with cradleState',cradlestateRef.current)
            isScrollingRef.current = false
            let cradleState = cradlestateRef.current
            switch (cradleState) {

                case 'repositioning': {

                    saveCradleState('reposition')
                    break
                } 

            }

        },250)

        let referenceindex
        if (!isResizingRef.current) {
            let scrollPos, cellLength
            if (orientationRef.current == 'vertical') {
                scrollPos = viewportData.elementref.current.scrollTop
                cellLength = cellSpecsRef.current.cellHeight + cellSpecsRef.current.gap
            } else {
                scrollPos = viewportData.elementref.current.scrollLeft
                cellLength = cellSpecsRef.current.cellWidth + cellSpecsRef.current.gap
            }
            let referencerowindex = Math.ceil(scrollPos/cellLength)
            let referencescrolloffset = -((scrollPos % cellLength) - cellLength)
            referenceindex = referencerowindex * crosscountRef.current

            // console.log('referenceindex, referencescrolloffset',referenceindex, referencescrolloffset)

            referenceIndexDataRef.current = {
                index:referenceindex,
                scrolloffset:referencescrolloffset
            }
            saveReferenceindex(referenceIndexDataRef.current)
        }

        if (!isCradleInViewRef.current && 
            !(cradlestateRef.current == 'repositioning') && 
            !(cradlestateRef.current == 'reposition')) {

            saveCradleState('repositioning')

        }

    },[])

    // set and maintain isResizing flag
    // set below on first window resize notification
    // unset with state change to 'settle' in state engine above
    const resizeTimeridRef = useRef(null)

    const onResize = useCallback((e) => {

        if (!isResizingRef.current) {
            isResizingRef.current = true
            pauseObserversRef.current = true
            saveCradleState('resizing')
        }

        clearTimeout(resizeTimeridRef.current)
        resizeTimeridRef.current = setTimeout(() => {

            saveCradleState('resize')
            isResizingRef.current = false

        },250)

    },[])

    // thia ia the core state engine
    // triggering next state phase: states = setup, pivot, resize, reposition (was run)
    const callingCradleState = useRef(cradlestateRef.current)

    useEffect(()=> {
        switch (cradlestate) {
            case 'setup': 
            case 'resize':
            case 'pivot':
            case 'reposition':

                // console.log('setting cradlestate to settle from', cradlestate)
                callingCradleState.current = cradlestate

                saveCradleState('settle')

                break

            case 'settle':

                setCradleContent(callingCradleState.current)

                if (!isSettlingRef.current) {
                    isSettlingRef.current = true
                    {
                        // console.log('running settle timeout')
                        setTimeout(()=>{ // let everything settle before reviving observer
                            isSettlingRef.current = false
                            pauseObserversRef.current && (pauseObserversRef.current = false)
                        },250) // timeout a bit spooky but gives observer initialization of new items a chance to settle
                    }
                } // observer seems to need up to 2 cycles to settle; one for each side of the cradle.

                saveCradleState('ready')

                break

            case 'ready':
                break
        }
    },[cradlestate])

    // trigger 'resize' cradlestate on change of any parameter
    useEffect(()=>{
        if (cradlestate == 'ready') {

            mainConfigDatasetRef.current = {...previousConfigDataRef.current}
            saveCradleState('resize') // may be called separately if attributes changes without page resize

        }
    },[
        cellWidth, 
        cellHeight, 
        gap, 
        padding,
        runwaylength,
        viewportheight, 
        viewportwidth,
    ])

    // trigger pivot on change in orientation
    useEffect(()=> {

        let rootMargin
        if (orientation == 'horizontal') {
            rootMargin = `0px ${runwaylength}px 0px ${runwaylength}px`
        } else {
            rootMargin = `${runwaylength}px 0px ${runwaylength}px 0px`
        }
        itemobserverRef.current = new IntersectionObserver(
            itemobservercallback,
            {root:viewportData.elementref.current, rootMargin,} 
        )

        contentlistRef.current = []

        if (cradlestate != 'setup') {
            saveCradleState('pivot')
        }

    },[orientation])

    // =============================================================================
    // ------------------------------[ child callbacks ]----------------------------------

    const getItemElementData = useCallback((itemElementData, reportType) => { // candidate to export

        const [index, shellref] = itemElementData

        if (reportType == 'register') {

            itemElementsRef.current.set(index,shellref)

        } else if (reportType == 'unregister') {

            itemElementsRef.current.delete(index)

        }

    },[])

    const callbacksRef = useRef({
        getElementData:getItemElementData
    })

    // =============================================================================
    // ------------------------------[ render... ]----------------------------------

    let divlinerstyles = divlinerStylesRef.current

    let viewportRect = viewportData.elementref.current.getBoundingClientRect()

    // no result if styles not set
    return <>

        { cradlestateRef.current == 'repositioning'
            ?<ScrollTracker 
                top = {viewportRect.top + 3} 
                left = {viewportRect.left + 3} 
                offset = {referenceIndexDataRef.current.index} 
                listsize = {listsize}
                styles = { styles }
            />
            :null}

        <div 
        
            ref = {cradleElementRef} 
            style = {divlinerstyles}
        
        >
        
            {divlinerstyles.width?contentlistRef.current:null}
        
        </div>
        
    </>

} // Cradle


export default Cradle