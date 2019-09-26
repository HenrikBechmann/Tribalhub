// baseform.view.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React from 'react'

// import merge from 'deepmerge'
import utlities from '../../../utilities/utilities'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { 
    PostFormMessage,
    GenericObject,
    FactoryNamespace,
} from '../../interfaces'

import application from '../../application'
import ContentGroup from './contentgroup'

import { toast } from 'react-toastify'

/*
    TODO:
    add setupPostDocument message to send to contentbase form, to configure 
    responses to user.
    reconcile with registerCalldowns
*/
/*
    This is created in componentFactory based on data in type ui json
    See import of forms in componentFactory module
*/

const styles = (theme) => createStyles({ // export ??
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
    alignItems:'baseline',
  },
  button:{
      margin:theme.spacing(1),
  },
  fieldset: {
      marginBottom:'8px', 
      width:'calc(100% - 32px)',
  }
})

interface ContentFormProps {
    children:any, 
    namespace:FactoryNamespace, // document details and controller resources
    documentmap:GenericObject, // maps form values to document properties
    groups:GenericObject, // high level of fieldset grouping (optional)
    fieldsets:GenericObject, // immediate fieldset groupings of fields (optional)
    classes?:any, // contributed by HOC withStyles (see bottom of file)
    disabled?:boolean,
}

class ContentForm extends React.Component<ContentFormProps,any> {

    constructor(props) {
        super(props)

        // console.log('ContentForm:props',props)
        // initialize instance values
        let { namespace, documentmap, fieldsets, groups } = props
        let registerCallbacks = namespace && namespace.registerCallbacks
        // namespace && (namespace.local = {
        //     classes:this.props.classes
        // })

        // reserve for later
        this.fieldsetspecs = fieldsets || []
        this.groupspecs = groups || []

        // to participate in multiple concurrent postings (transaction wrapped)
        registerCallbacks && registerCallbacks({getPostMessage:this.getPostMessage, instanceid:namespace.docproxy.instanceid})

        // anticipate posting as an option for caller
        this.formcontext = {
            documentmap,
            namespace,
            form:this,
        }

    }

    state = {
        values:{}, // see onChange -- maintains state of editable fields
        dirty:false,
    }

    // instantiation properties

    fieldsetspecs // defailts to []
    groupspecs // defaults to []

    // processing properties
    fieldsetchildren = {}
    defaultfieldsetchildren = []
    groupchildren = {}
    localchildren

    formcontext // as initialized in the constructor

    // ---------------------------------[ preparation ]--------------------------

    componentDidMount() {

        // preprocess fieldsets and groups
        this.organizelookups()

        // add onChange to editable children
        // sort fields by fieldsets
        // obtain list of editable values
        let editablevalues = this.processChildren(this.props.children)

        // initialize state
        this.setState({
            values:editablevalues,
        })

    }

    organizelookups = () => {
        for (let fieldset of this.fieldsetspecs) {
            this.fieldsetchildren[fieldset.name] = []
        }
        // for (let group of this.groupspecs) {
        //     this.groupcomponents[group.name] = []
        // }
    }

    // add onChange to editable children
    // sort fields by fieldsets
    // return list of editable values
    processChildren = children => {

        // initialize field values for state
        let editablevalues = {} as any

        // normalize to array
        if (!Array.isArray(children)) {
            children = [ children ]
        }

        // get list of editable values, by name of field (therefore names must be unique)
        for (let child of children) {

            if (child.props['data-attributes'] && child.props['data-attributes'].trackvalue) {
                editablevalues[child.props.name] = child.props.value
            }
            child = this.assignOnChangeToNode(child)

            this.assignNodeToFieldset(child)

        }

        // editablevalues = return set of fields for assignment to this.state
        return editablevalues
    }

    // add onChange event handler to editable nodes
    assignOnChangeToNode = node => {
        let localnode = node

        if (localnode.props['data-attributes'] && localnode.props['data-attributes'].trackvalue) {

            localnode = React.cloneElement(localnode,{
                onChange:this.onChangeValue})

        }

        return localnode

    }

    // assign nodes to named fieldsets
    assignNodeToFieldset = node => {

        let fieldset = node.props['data-attributes'] && node.props['data-attributes'].fieldset

        if (!fieldset) {

            this.defaultfieldsetchildren.push(node)

        } else {

            if (!this.fieldsetchildren[fieldset]) {

                this.fieldsetchildren[fieldset] = []

            }
            this.fieldsetchildren[fieldset].push(node)

        }

    }

    // ----------------------------[ render resources ]----------------------------------

    // refresh fieldset component values by
    // stepping through components by fieldset
    assembleDisplayComponents = (classes) => {

        let displaycomponents = []
        let groupcomponents = {}
        for (let group of this.groupspecs) {
            groupcomponents[group.name] = []
        }

        // update default area field values
        if (this.defaultfieldsetchildren.length) {

            this.defaultfieldsetchildren = this.updateFieldsetElementValues(this.defaultfieldsetchildren)

            let component = <div key = '__default__'>
                {this.defaultfieldsetchildren}
            </div>

            displaycomponents.push(component)

        }

        // update fieldset field values
        if (this.fieldsetspecs) {

            for (let fieldsetspec of this.fieldsetspecs) {
                this.fieldsetchildren[fieldsetspec.name] = this.updateFieldsetElementValues(this.fieldsetchildren[fieldsetspec.name])
                let style = fieldsetspec.style
                let namespace = this.props.namespace
                if (style) style = namespace && namespace.styles && namespace.styles[style]
                style = style || null
                let component = <fieldset 
                    key = {fieldsetspec.name} 
                    className = {classes && classes.fieldset}
                    disabled = {this.props.disabled}
                    style = {style}
                >
                    {fieldsetspec.legend && <legend>{fieldsetspec.legend}</legend>}
                    {this.fieldsetchildren[fieldsetspec.name]}
                </fieldset>

                let { group } = fieldsetspec
                if (group) {
                    groupcomponents[group].push(component)
                } else {
                    displaycomponents.push(component)
                }
            }
        }

        // add group components (assigned above)
        for (let group of this.groupspecs) {
            let component = <ContentGroup key = {'group-' + group.name} open = {group.open} title = {group.title}>
                {groupcomponents[group.name]}
            </ContentGroup>
            displaycomponents.push(component)
        }

        return displaycomponents
    }

    updateFieldsetElementValues = fieldlist => {

        if (!fieldlist) return null

        let newchildren = []

        // update changed element values
        for (let element of fieldlist) {
            if (element.props['data-attributes'] && element.props['data-attributes'].trackvalue) {

                let statevalue = this.state.values[element.props.name]
                let elementvalue = element.props.value
                if (!Object.is(elementvalue,statevalue)) {
                    element = React.cloneElement(element,{value:statevalue})
                }

            }

            newchildren.push(element)

        }

        return newchildren

    }

    getPostMessage = () => {
        this.formcontext.state = this.state
        let message:PostFormMessage = {
            formcontext:this.formcontext,
            success:this.onSubmitSuccess,
            failure:this.onSubmitFailure,
        }
        return message
    }

    onSubmitSuccess = () => {
        toast.success('document has been posted')
        return true
    }

    onSubmitFailure = () => {
        toast.error('document posting has failed')
        return false
    }

    onChangeValue = event => {
        let { values } = this.state
        values[event.target.name] = event.target.value

        this.setState({ values, dirty:true })    

    }

    render() {
        const { classes, namespace, disabled } = this.props

        return (
            <form 
                onSubmit = {event => {

                    event.preventDefault()

                    if (!disabled) {
                        try { // ... lazy :-(
                            namespace.controller.callbacks.submit && 
                            namespace.controller.callbacks.submit(this.getPostMessage())
                        } catch(e) {
                            // no action - simplifies checks above
                            console.log('onSubmit namespace parsing for ccallbackl failed', this)
                        }

                    }

                }}
                className = { classes && classes.root } 
                autoComplete = "off" 
            > 
                {this.assembleDisplayComponents(classes)}
            </form>
        )
    }

}

export { styles }
export default withStyles( styles )( ContentForm )
// export default ContentForm
