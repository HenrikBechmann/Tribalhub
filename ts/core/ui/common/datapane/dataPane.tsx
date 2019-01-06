// dataPane.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

// this is just utilities for datpanes, so we just instantiate on object
// all calls must be functionally pure (same input = same output)

'use strict'

import React from 'react'
import merge from 'deepmerge'
import { RenderMessage } from '../../../services/interfaces'

const dataPane = new class {
    getRenderMessage = (docpack, typepack, options, container) => {

        console.log('options in getRenderMessage',options,typepack,docpack)
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
        }

        let rendermessage:RenderMessage = {renderspecs,data,docref:docpack.reference}

        return rendermessage
    }
}

export default dataPane