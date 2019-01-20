// renderer.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React from 'react'

import { RenderMessage } from './interfaces'

import layoutComponents from './prerenderer/layouts'
import displayComponents from './prerenderer/displays'
import formComponents from './prerenderer/forms'
import widgetComponents from './prerenderer/widgets'
import nativeComponents from './prerenderer/native'

import AbstractDataPane from './prerenderer/components/abstractdatapane'
import utilities from '../utilities/utilities'

const components = { // lookups
    layouts:layoutComponents,
    displays:displayComponents,
    forms:formComponents,
    widgets:widgetComponents,
    // box:boxComponents
    native:nativeComponents,
}

// instantiated by client
class PreRenderer {

    private rendermessage:RenderMessage
    private componentspecs
    private data


    // ==================[ API ]========================

    updateRenderMessage = (rendermessage) => {
        this.rendermessage = rendermessage
    }

    // called by client
    assemble = () => {

        if (!this.rendermessage) return null

        const {renderspecs:specs,data} = this.rendermessage 

        this.componentspecs = specs.component
        this.data = data

        // console.log('data in assemble', this.data)
            
        let componentClass = this.assembleComponents(this.componentspecs)

        return componentClass

    }

    getRenderMessage = (docpack, typepack, options, container) => {

        // console.log('options in getRenderMessage',options,typepack,docpack)
        
        let renderspecs
        try {
            renderspecs = typepack.document.properties.ui[options.uiselection]
        } catch(e) {
            return null
        }

        if (!renderspecs) return null

        let data = {
            container,
            props:container.props,
            document:docpack.document,
            type:(typepack && typepack.document)
        }

        let rendermessage:RenderMessage = {renderspecs,data,docref:docpack.reference}

        // console.log('getRenderMessage rendermessage',rendermessage, container)

        return rendermessage
    }

    // =======================[ internal ]============================

    private assembleComponents = componentspec => {

        // if the component is text, return the text
        if (componentspec['#variant']) {

            // console.log('in assembleComponents for #variant: componentspec',componentspec)

            let variant = componentspec['#variant']

            switch (variant) {
                case 'text': {
                    return componentspec.text
                }
                case 'reference': { // recursion
                    return this.getComponentByReference(componentspec.reference, componentspec.options)
                }
                default: {
                    console.log('error: variant in assembleComponents not recognized',variant)
                    return null // variant not recognized
                }
            }

        }

        try {

            // get component class
            let type = this.getTypeClass(componentspec.type)
            // get component properties
            let props = this.getProps(componentspec.properties)
            // get conponent children
            let children = this.getChildren(componentspec.children)
            // pass to React

            // console.log('component arguments',componentspec.type,componentspec.properties,props,children)

            let element = React.createElement(type, props, children)

            // console.log('element in assembleComponents',element)
            return element

        } catch(e) {

            console.log('error in assembleComponent:',e)
            return null

        }
    }

    getComponentByReference = (reference, options) => {

        let ref = this.getPropertyByFilter(reference)
        let opts = this.getProps(options)
        let dataheap = this.data
        console.log('getComponentByReference', ref, opts, dataheap)
        
        return <AbstractDataPane reference = {ref} options = {opts} dataheap = {dataheap}  />
    }

    private getTypeClass = typespec => {

        let typelist = typespec.split('.')
        let [collection, componentclass] = typelist
        let type = components[collection][componentclass]
        if (!type) type = typespec // TODO: should be made secure!

        return type

    }

    private getProps = propertyspecs => {

        let props = {}
        for (let propertyindex in propertyspecs) {
            let propertyspec = propertyspecs[propertyindex]
            let property = this.getPropertyByFilter(propertyspec)
            props[propertyindex] = property
        }

        // console.log('props in getProps',props)

        return props

    }

    private getPropertyByFilter = (propertyspec) => {

        let property = propertyspec

        if (!property) return property

        let prepend = property[0]

        switch (prepend) {

            case '&': {
                property = this.getPropertyByIndirection(propertyspec)
                break
            }
            case '@': {

                break
            }
        }

        return property

    }

    private getPropertyByIndirection = propertySpec => {

        let path = propertySpec.slice(1)
        let pathlist = path.split('.')
        let data = this.data
        let nodedata:any = utilities.getNodePosition(data,pathlist)
        // console.log('getPropertyByIndirection',propertySpec,pathlist,nodedata, data)
        if (nodedata) {
            return nodedata.nodevalue
        } else {
            return undefined
        }
    }

    private getChildren = childspecs => {

        // console.log('getChildren childspecs',childspecs)

        let children = []
        for (let childspec of childspecs) {
            let child = this.assembleComponents(childspec)
            children.push(child)
        }

        return children

    }

}

export default PreRenderer
