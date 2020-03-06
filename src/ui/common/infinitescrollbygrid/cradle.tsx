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
    assertCradleIsInView,
} from './cradlefunctions'

import ItemShell from './itemshell'

import ScrollTracker from './scrolltracker'

/*

    4 implement getItem

    3 scrollToItem(index[,alignment]) - alignment = start, end, center, auto (default)
    - callbacks in general

    2 add examples 1, 2, 3 to control page: 
        - small 100x100 images, scroll and rotate
        - vertical scroll items inside horizontal scroll, with ability to flip them
        - track movement on large lists

    1 options (like styles)

*/

const Cradle = (props) => {

    const { gap, padding, runwaylength, listsize, offset, orientation, cellHeight, cellWidth, getItem } = props

    // =============================================================================================
    // --------------------------------------[ initialization ]-------------------------------------

    const [cradlestate, saveCradleState] = useState('setup')
    const cradlestateRef = useRef(null) // for observer call closure
    cradlestateRef.current = cradlestate // most recent value

    const [contentlist,saveContentlist] = useState([])

    const [dropentries, saveDropentries] = useState(null)

    const [addentries, saveAddentries] = useState(null)

    const viewportData = useContext(ViewportContext)

    const itemobserverRef = useRef(null)

    const cradleobserverRef = useRef(null)

    const [currentScrollPos, saveCurrentScrollPos] = useState(0)
    const cellSpecs = useMemo(() => {
        return {
            cellWidth,cellHeight,gap
        }
    },[cellWidth,cellHeight,gap])
    const cellSpecsRef = useRef(null)
    cellSpecsRef.current = cellSpecs

    const pauseObserverForReconfigurationRef = useRef(false)

    const mainConfigDatasetRef = useRef({setup:true})

    const divlinerStylesRef = useRef({
        position: 'absolute',
        backgroundColor: 'blue',
        display: 'grid',
        gridGap: gap + 'px',
        padding: padding + 'px',
        justifyContent:'start',
        alignContent:'start',
        boxSizing:'border-box',

    } as React.CSSProperties)

    const orientationRef = useRef(orientation)
    orientationRef.current = orientation // availability in closures

    const divlinerStyleRevisionsRef = useRef(null) // for modifications by observer actions

    const contentOffsetForActionRef = useRef(Math.min(offset,(listsize - 1)) || 0) // used for contentList creation; used for orientation change, and resize

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
    const [isScrolling,saveIsScrolling] = useState(false)
    const isScrollingRef = useRef(isScrolling)
    isScrollingRef.current = isScrolling // for observer
    const scrollTimeridRef = useRef(null)

    // =====================================================================================
    // ----------------------------------[ state management ]-------------------------------

    useEffect(() => {
        viewportData.elementref.current.addEventListener('scroll',onScroll)
        window.addEventListener('resize',onResize)
        return () => {
            viewportData.elementref.current.removeEventListener('scroll',onScroll)
            window.removeEventListener('resize',onResize)
        }
    },[])

    const onScroll = useCallback((e) => {

        if (cradlestateRef.current == 'repositioning') {
            let scrollPos, cellLength
            if (orientationRef.current == 'vertical') {
                scrollPos = viewportData.elementref.current.scrollTop
                cellLength = cellSpecsRef.current.cellHeight + cellSpecsRef.current.gap
            } else {
                scrollPos = viewportData.elementref.current.scrollLeft
                cellLength = cellSpecsRef.current.cellWidth + cellSpecsRef.current.gap
            }
            let repositionrowindex = Math.ceil(scrollPos/cellLength)
            let repositionindex = repositionrowindex * crosscountRef.current
            saveCurrentScrollPos(repositionindex)
        }

        if (!isScrollingRef.current) {
            // console.log('setting isScrolling to true')
            saveIsScrolling(true)
            assertCradleIsInView(viewportData.elementref.current, cradleElementRef.current, orientationRef.current)
        }
        if (isScrollingRef.current) {
            clearTimeout(scrollTimeridRef.current)
            scrollTimeridRef.current = setTimeout(() => {
                // console.log('setting isScrolling to false')
                saveIsScrolling(false)
                setTimeout(()=>{

                    assertCradleIsInView(viewportData.elementref.current, cradleElementRef.current, orientationRef.current)

                })
            },200)
        }

    },[])

    const isResizingRef = useRef(false)
    // const resizeTimeridRef = useRef(null)

    const onResize = useCallback((e) => {

        if (!isResizingRef.current) {
            isResizingRef.current = true
        }

    },[])

    // triggering next state phase: states = setup, pivot, resize, scroll (was run)
    useEffect(()=> {
        switch (cradlestate) {
            case 'setup': 
                saveCradleState('initobserver')
                break
            case 'resize':
                saveCradleState('reset')
                break
            case 'pivot':
                saveCradleState('reset')
                break
            case 'reposition':
                setTimeout(()=>{

                    // console.log('setting cradlestate from reposition to reset')
                    saveCradleState('reset')

                })
                break
            case 'reset':
                saveCradleState('settle')
                break;
            case 'settle':
                isResizingRef.current && (isResizingRef.current = false)
                setTimeout(()=>{ // let everything settle before reviving observer
                    pauseObserverForReconfigurationRef.current = false
                },250) // timeout a bit spooky but gives observer initialization of new items a chance to settle
                    // observer seems to need up to 2 cycles to settle; one for each side of the cradle.
                saveCradleState('ready')
                break;
            case 'ready':
                break
        }
    },[cradlestate])

    // trigger resize on change
    useEffect(()=>{
        if (cradlestate == 'ready') {
            // contentOffsetForActionRef.current = contentlist[0]?.props.index // ?
            pauseObserverForReconfigurationRef.current = true
            let cradleElement = cradleElementRef.current
            mainConfigDatasetRef.current = {...previousConfigDataRef.current}
            saveCradleState('resize')
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
        saveContentlist([])
        if (cradlestate != 'setup') {
            saveCradleState('pivot')
        }

    },[orientation])

    useEffect(() => {
        cradleobserverRef.current = new IntersectionObserver(
            cradleobservercallback,
            {root:viewportData.elementref.current}
        )
        cradleobserverRef.current.observe(cradleElementRef.current)
    },[])

    // =================================================================================
    // -------------------------[ IntersectionObserver support]-------------------------

    const cradleobservercallback = useCallback((entries) => {
        // console.log('cradleobservercallback entries', entries)
        if ( (cradlestateRef.current == 'ready') && (!entries[0].isIntersecting)) {
            // console.log('setting state to repositioning')
            saveCradleState('repositioning')
        }
    },[])

    // the async callback from IntersectionObserver. this is a closure
    const itemobservercallback = useCallback((entries)=>{

        if (pauseObserverForReconfigurationRef.current) {
            return
        }

        if (cradlestateRef.current == 'ready') { // first pass is after setBaseContent, no action required
            let dropentries = entries.filter(entry => (!entry.isIntersecting))
            if (dropentries.length) {

                saveDropentries(dropentries)

            }
        }
        if (cradlestateRef.current == 'initobserver') { // cradle state when triggered by creating component
            saveCradleState('ready')
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
        let indexoffset = contentlist[0].props.index
        let pendingcontentoffset
        let newcontentcount = Math.ceil(netshift/crosscountRef.current)*crosscountRef.current
        let headindexcount, tailindexcount

        if (scrollforward) {
            pendingcontentoffset = indexoffset + netshift
            let proposedtailoffset = pendingcontentoffset + newcontentcount + ((contentlist.length - netshift ) - 1)

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
            localContentList:contentlist,
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

        saveContentlist(localContentList) // delete entries
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

            localContentList: contentlist,
            headindexcount,
            tailindexcount,
            indexoffset: contentoffset,
            orientation,
            cellHeight,
            cellWidth,
            observer: itemobserverRef.current,
            crosscount,
            callbacksRef,

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

        saveContentlist(localContentList)
        saveAddentries(null)

    },[addentries])
    // End of IntersectionObserver support

    // ========================================================================================
    // -------------------------------[ Assembly of content]-----------------------------------
    
    // set cradle content for state changes
    useEffect(() => {

        if (['setup','resize','pivot','reposition'].indexOf(cradlestate) == -1) return

        setCradleContent()

    },[cradlestate,])

    const setCradleContent = useCallback(() => {

        let visibletargetindex, targetscrolloffset
        
        if (cradlestateRef.current != 'reposition') {
            [visibletargetindex, targetscrolloffset] = getVisibleTargetData(mainConfigDatasetRef)
        } else {
            visibletargetindex = contentOffsetForActionRef.current
            targetscrolloffset = 0
        }

        let localContentList = [] // any existing items will be re-used by react

        if (visibletargetindex === undefined) {
            visibletargetindex = contentOffsetForActionRef.current
            targetscrolloffset = 0
        }

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
                visibletargetindex,
                targetScrollOffset:targetscrolloffset,
                crosscount,
                listsize,
            })

        let childlistfragment = getUIContentList({
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
        contentOffsetForActionRef.current = indexoffset

        saveContentlist(childlistfragment) // external

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
    // on shift of state to ready, or 
    useEffect(() => {

        if (cradlestate == 'repositioning' && !isScrollingRef.current) {
            let repositionrowindex,repositionindex, scrollPos, cellLength

            if (orientation == 'vertical') {
                scrollPos = viewportData.elementref.current.scrollTop
                cellLength = cellHeight + gap
            } else {
                scrollPos = viewportData.elementref.current.scrollLeft
                cellLength = cellWidth + gap
            }
            repositionrowindex = Math.ceil(scrollPos/cellLength)
            repositionindex = repositionrowindex * crosscount
            contentOffsetForActionRef.current = repositionindex
            // console.log('setting cradlestate to reposition:repositionindex, scrollPos, cellLength',repositionindex, scrollPos, cellLength)
            saveCradleState('reposition')
        }
        if (cradlestate == 'ready' && !isScrollingRef.current) {

            if (!isResizingRef.current) { // conflicting responses; resizing needs current version of visible before change

                // update visible list
                let itemlist = Array.from(itemElementsRef.current)

                visibleListRef.current = calcVisibleItems(
                    itemlist,viewportData.elementref.current,cradleElementRef.current, orientation
                )

                normalizeCradleAnchors(cradleElementRef.current, orientation)
                    
            }

        }

    },[cradlestate, isScrollingRef.current])

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
                offset = {currentScrollPos} 
                listsize = {listsize} 
            />
            :null}
        <div 
            ref = {cradleElementRef} 
            style = {divlinerstyles}
        >
        
            {divlinerstyles.width?contentlist:null}
        
        </div>
    </>

} // Cradle


export default Cradle