// services.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
/*
    This is the high level application controller
    It's main responsibility is to co-ordinate the store and the domain
    application -> datamodel + viewmodel -> domain -> gateway -> firebase

    source code style:
    local functions are prefixed with underscrore (_)
    parameters between modules are parmblocks
*/

/*
    TODO: 

        - process document changed by type in processDocumentCallbacks

        - OPTIMIZE!! Maintain cache items by some criterion such as usage or age
        - rationalize "change" object
        - add CREATED, UPDATED, LASTUSED, and USAGECOUNT stamps to cache items
        - implement state item garbage collection (no listeners)
        - implement general max for cache (1000?) with trigger to reduce to 900 or so
*/

'use strict'

import domain from './domain'
import { 
    GetDocumentMessage, 
    SetDocumentMessage, 
    GetCollectionMessage,
    SetListenerMessage,
    RemoveListenerMessage,
    // SetGatewayListenerMessage,
    ReturnDocPackMessage,
    ReturnDocPairMessage,
    // DocTokenStruc, 
    DocPackStruc,
    // CacheItemStruc,
} from './interfaces'
import docpackCache from './application/docpackcache'
import typepackCache from './application/typepackcache'

// ==============[ Internal ]===============

/*
    Each document has an accompanying type. Types are shared, therefore far less numerous.
    The separation of the two allows for separate caching strategies.
*/

export const sentinels = {}

// =================[ API ]=======================

export const appManager = new class {

    properties = {

        ismobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    }

    // =================[ INTERNAL TO MODULE ]=======================

    getCacheDocpack = reference => {

        let cacheitem = docpackCache.getItem(reference)
        let docpack:DocPackStruc = cacheitem?cacheitem.docpack:{}
        return docpack
    }

    getCacheDocpackPair = reference => {

        let cacheitem = docpackCache.getItem(reference)
        let docpack:DocPackStruc = cacheitem?cacheitem.docpack:{}
        let typepack:DocPackStruc = null
        let typeref = null

        if (docpack.document) {

            typeref = docpack.document.identity.type

            let cacheItem = typepackCache.getItem(typeref)

            typepack = cacheItem.docpack
            
        }

        let cachedata = {
            docpack,
            typepack,
        }

        return cachedata

    }

    // =================[ API ]=======================
    // called from component componentDidMount or componentWillUpdate

    private updateSetSentinel = instanceid => {

        let sentinel = 
            sentinels[instanceid]
            ?sentinels[instanceid][0]
            :undefined

        if (sentinel === undefined) { // create listener

            sentinels[instanceid]=[false] // allow continuation with set listener

        } else if (sentinel === true) { // stop was set; clear sentinal; abandon

            sentinels[instanceid].shift()

            if (sentinels[instanceid].length === 0) {

                delete sentinels[instanceid]

            }

            return

        } else { // sentinel = false; continue with set listener

            sentinels[instanceid].push(false)   

        }

    }

    setDocpackListener = ({doctoken,instanceid,success, failure}:SetListenerMessage) => {

        setTimeout(()=>{ // give animations a chance to run

            let reference = doctoken.reference // getTokenReference(doctoken)

            this.updateSetSentinel(instanceid)

            docpackCache.addListener(reference,instanceid,success)

            let docpack:DocPackStruc = appManager.getCacheDocpack(reference)

            let parmblock:ReturnDocPackMessage = {
                docpack, 
                reason:{
                    documents:{
                        reason:'newcallback',
                        document:true, 
                        type:true,
                    }
                }
            }

            success(parmblock)

        })

    }

    setDocpackPairListener = ({doctoken,instanceid,success, failure}:SetListenerMessage) => {

        setTimeout(()=>{ // give animations a chance to run

            let reference = doctoken.reference // getTokenReference(doctoken)

            this.updateSetSentinel(instanceid)

            docpackCache.addListener(reference,instanceid,success)

            let cachedata = appManager.getCacheDocpackPair(reference)

            if (cachedata.docpack && cachedata.typepack) { // defer if waiting for type
                let docpack:DocPackStruc = cachedata.docpack

                let parmblock:ReturnDocPairMessage = {
                    docpack, 
                    typepack:cachedata.typepack, 
                    reason:{
                        documents:{
                            reason:'newcallback',
                            document:true, 
                            type:true,
                        }
                    }
                }

                success(parmblock)

            }

        })

    }

    updateRemoveSentinel = instanceid => {

        let sentinel = 
            sentinels[instanceid]
            ?sentinels[instanceid][0]
            :undefined

        if (sentinel === undefined) { // create sentinal; set before listener

            sentinels[instanceid]=[true]

            return

        } else if (sentinel === false) { // clear sentinal; continue delete listener

            sentinels[instanceid].shift()

            if (sentinels[instanceid].length === 0) {

                delete sentinels[instanceid]
            }

        } else { // sentinal === true; was set for previous call; queue next

            sentinels[instanceid].push(true)

            return
        }

    }

    removeDocpackListener = ({doctoken, instanceid}:RemoveListenerMessage) => {

        let reference = doctoken.reference

        this.updateRemoveSentinel(instanceid)

        docpackCache.removeListener(reference,instanceid)

    }

    // called from component componentWillUnmount
    removeDocpackPairListener = ({doctoken, instanceid}:RemoveListenerMessage) => {

        let reference = doctoken.reference

        this.updateRemoveSentinel(instanceid)

        docpackCache.removeListener(reference,instanceid)

    }

    getDocument = (parmblock:GetDocumentMessage) => {

        domain.getDocument(parmblock)

    }

    getNewDocument = (parmblock:GetDocumentMessage) => {

        domain.getNewDocument(parmblock)

    }

    queryForDocument = (parmblock:GetDocumentMessage) => {

        domain.queryForDocument(parmblock)
        
    }

    setDocument = (parmblock:SetDocumentMessage) => {

        domain.setDocument(parmblock)

    }

    getCollection = (parmblock:GetCollectionMessage) => {

        domain.getCollection(parmblock)
        
    }

}

let application = {

    properties:appManager.properties,

    setDocpackPairListener:appManager.setDocpackPairListener,
    removeDocpackPairListener:appManager.removeDocpackPairListener,
    setDocpackListener:appManager.setDocpackListener,
    removeDocpackListener:appManager.removeDocpackListener,

    getDocument:appManager.getDocument,
    getNewDocument:appManager.getNewDocument,
    queryForDocument:appManager.queryForDocument,

    setDocument:appManager.setDocument,
    
    getCollection:appManager.getCollection,

}

export default application