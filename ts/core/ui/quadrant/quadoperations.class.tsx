// quadoperations.class.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence

import proxy from '../../../core/utilities/proxy'

class quadoperations {

    constructor({ animationwrapper, quadrant, listcomponent, scrollboxelement }) {
        this.animationwrapper = animationwrapper
        this.quadrant = quadrant
        this.listcomponent = listcomponent
        this.scrollboxelement = scrollboxelement
    }

    // imported
    animationwrapper
    quadrant
    listcomponent
    scrollboxelement

    // set from callback
    collapseTargetProxy = null
/********************************************************
----------------------[ operations ]---------------------
*********************************************************/

    // for calls from quadrant.controller component
    isTargetProxy = () => {
        return !!this.collapseTargetProxy
    }

    getTargetProxy = () => {
        return this.collapseTargetProxy
    }

    setTargetProxy = value => {
        this.collapseTargetProxy = value
    }

    //-------------------------------[ forward ]---------------------------
    expandDirectoryItem = (boxptr, listtoken, domSource) => {

        this.animationwrapper.current.animateToOrigin()

        this.animationwrapper.current.animateToDataBox(domSource)

        let { datastack, stackpointer } = this.quadrant.state
        this._captureSettings(stackpointer,datastack)

        let itemProxy = datastack[stackpointer].items[boxptr]

        stackpointer++
        let newstacklayer = {items:[], settings:{}, source:{
            instanceid:itemProxy.instanceid,
            token:itemProxy.token,
            action:'expand',
        }}

        // replace forward stack items
        datastack.splice(stackpointer,datastack.length,newstacklayer)

        let newItemProxy = new proxy({token:itemProxy.token})

        newItemProxy.liststack.push(listtoken)

        newstacklayer.items.push(newItemProxy)

        setTimeout(() => { // delay for animation
            this.quadrant.setState({
                stackpointer,
                datastack,
            })
        },100)
    }

    splayBox = (boxptr, domSource, sourcelistcomponent,listDocument) => {

        let visiblerange = sourcelistcomponent.current.getVisibleRange()

        this.animationwrapper.current.animateToOrigin()

        this.animationwrapper.current.animateToDataBoxList(domSource)

        let { datastack, stackpointer } = this.quadrant.state
        this._captureSettings(stackpointer,datastack)

        let itemProxy = datastack[stackpointer].items[boxptr]
        let itemToken = itemProxy.token

        let listtokens = listDocument.data.lists

        if (!listtokens || !listtokens.length) return

        stackpointer++
        let newstacklayer = {items:[], settings:{}, source:{
            instanceid:itemProxy.instanceid,
            token:itemProxy.token,
            action:'splay',
            visiblerange,
        }}

        // replace forward stack items
        datastack.splice(stackpointer,datastack.length,newstacklayer)

        for (let token of listtokens) {
            let newItemProxy = new proxy({token:itemToken})
            newItemProxy.liststack = itemProxy.liststack.slice() // copy
            newItemProxy.liststack.push(token)
            newstacklayer.items.push(newItemProxy)
        }

        setTimeout(() => { // delay for animation
            this.quadrant.setState({
                stackpointer,
                datastack,
            },() => {
                setTimeout(() =>{
                    this.listcomponent.current.scrollTo(visiblerange[0])
                })
            })
        },100)
    }

    selectFromSplay = (boxptr:number,domSource) => {

        this.animationwrapper.current.animateToOrigin()

        this.animationwrapper.current.animateToDataBox(domSource)

        let {datastack, stackpointer} = this.quadrant.state
        this._captureSettings(stackpointer,datastack)

        let itemProxy = datastack[stackpointer].items[boxptr]
        let itemToken = itemProxy.token

        stackpointer++
        let newstacklayer = {items:[], settings:{}, source:{
            instanceid:itemProxy.instanceid,
            token:itemProxy.token,
            action:'select',
        }}

        // replace forward stack items
        datastack.splice(stackpointer,datastack.length,newstacklayer)

        let newItemProxy = new proxy({token:itemToken})
        newItemProxy.liststack = itemProxy.liststack.slice() // copy
        
        newstacklayer.items.push(newItemProxy)

        setTimeout(() => { // delay for animation
            this.quadrant.setState({
                stackpointer,
                datastack,
            })
        },100)
    }

    incrementStackSelector = () => {
        let { stackpointer, datastack } = this.quadrant.state
        this._captureSettings(stackpointer,datastack)
        let depth = datastack.length // this.quadrant.state.datastack.length
        if (stackpointer < (depth - 1)) {
            stackpointer++
            this.quadrant.setState({
                stackpointer,
                datastack,
            },() => {
                this._applySettings(stackpointer,datastack)
            })
        }
    }

    //-------------------------------[ backward ]----------------------------

    collapseDirectoryItem = (itemProxy) => {

        if (this.quadrant.state.stackpointer) {
            let targetStackLayer = this.quadrant.state.datastack[this.quadrant.state.stackpointer - 1]
            if (targetStackLayer.items.length > 1) {
                this.animationwrapper.current.animateOriginToDataBoxList()
            } else {
                this.animationwrapper.current.animateOriginToDatabox()
            }
            // console.log('collapseDirectoryItem',itemProxy,this.state.datastack)
        }

        setTimeout(()=>{
            this.collapseTargetProxy = Object.assign({},itemProxy)

            this.decrementStackSelector()
        },100)

    }

    decrementStackSelector = () => {
        let { stackpointer, datastack } = this.quadrant.state
        this._captureSettings(stackpointer,datastack)
        this._updateCollapseSettings(stackpointer,datastack)
        if (stackpointer > 0) {
            stackpointer--
            this.quadrant.setState({
                stackpointer,
                datastack,
            },() => {
                this._applySettings(stackpointer,datastack)
            })
        }
    }

    _updateCollapseSettings = (stackpointer, datastack) => {

        if (this.collapseTargetProxy) {
            let sourcelayer = datastack[this.quadrant.state.stackpointer]
            if (sourcelayer) {
                let stacksource = sourcelayer.source
                if (stacksource) {
                    this.collapseTargetProxy.action = stacksource.action
                    this.collapseTargetProxy.sourceinstanceid = stacksource.instanceid
                }
            }
            if (stackpointer > 0) {
                datastack[stackpointer - 1].settings.scrollOffset = null
            }
        }
    }

    _captureSettings = (stackpointer, datastack) => {
        let stacklayer = datastack[stackpointer]
        let { items } = stacklayer
        stacklayer.settings.scrollOffset = 
            (items.length > 1)?this.scrollboxelement.current.scrollLeft:0
    }

    _applySettings = (stackpointer, datastack) => {
        let stacklayer = datastack[stackpointer]
        let { items } = stacklayer

        if ((items.length > 1) && (!this.collapseTargetProxy)) {
            if (stacklayer.settings.scrollOffset !== null) {
                setTimeout(() => { // give deference to formation of scroll object

                    this.scrollboxelement.current.scrollLeft = stacklayer.settings.scrollOffset

                })
            }
        }
    }

}

export default quadoperations