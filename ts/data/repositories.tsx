// workspacedata.tsx
import {serializer} from '../core/utilities/serializer'

let maps = {
    scheme:{
        common:{
            tribe:'tribalopolis',
            parent:null,
        }
    },
}

let schemes = {
    common:{
        list:{

        },
        item:{

        },
        link:{

        },
    },
}

let types = {
    list:{
        common:{
            __default__:{
                type:{

                },
                metadata: {
                    id:null,
                    scheme:null,
                },
                identity:{

                },
                properties:{
                    is:{},
                    has:{},
                },
            },
            outgoing: {
                type:{

                },
                metadata: {
                    id:null,
                    scheme:null,
                },
                identity: {

                },
                properties: {
                    is:{
                        outgoing:true,
                    },
                    has:{},
                },
            },
        },
    },
    item:{

    },
    link:{

    },
}

let lists = {
    diaries:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Diaries',
            aggregates:{
                childcount:{
                    amount:3,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    notes:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
             id:'x',
       },
        properties:{
            name:'Notes',
            aggregates:{
                childcount:{
                    amount:310,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    tribes:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Tribes',
            sysnode:true,
            aggregates:{
                childcount:{
                    amount:5,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    connections:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Contacts',
            aggregates:{
                childcount:{
                    amount:23,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    requesting:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Outgoing action requests',
            aggregates:{
                childcount:{
                    amount:12,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    pending:
    {
        type:{
            id:'pending',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Incoming action requests',
            aggregates:{
                childcount:{
                    amount:23,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    roles:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Roles',
            aggregates:{
                childcount:{
                    amount:4,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    programs:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Programs',
            aggregates:{
                childcount:{
                    amount:5,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    projects:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Projects',
            aggregates:{
                childcount:{
                    amount:3,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    tasks:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Tasks',
            aggregates:{
                childcount:{
                    amount:20,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    messages:
    {
        type:{
            id:'messengers',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Direct Messages ',
            aggregates:{
                childcount:{
                    amount:3,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    streams:
    {
        type:{
            type:'messengers',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Message Streams ',
            aggregates:{
                childcount:{
                    amount:100,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    resources:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Resources',
            aggregates:{
                childcount:{
                    amount:64,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    calendars:
    {
        type:{
            type:'calendars',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Calendars',
            aggregates:{
                childcount:{
                    amount:67,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    accounting:
    {
        type:{
            id:'outgoing',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Accounting',
            aggregates:{
                childcount:{
                    amount:6000,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    membership:
    {
        type:{
            id:'other',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Membership',
            sysnode:true,
            aggregates:{
                childcount:{
                    amount:2,
                    timestamp:1
                },
            },
        },
        links:[],
// account, website, home
    },
    other:
    {
        type:{
            id:'other',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'More...',
            sysnode:true,
            aggregates:{
                childcount:{
                    amount:2,
                    timestamp:1
                },
            },
        },
        links:[],
    },
    henrik:
    {
        type:{
            id:'member',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'x',
        },
        properties:{
            name:'Links',
            sysnode:true,
            aggregates:{
                childcount:{
                    amount:6558,
                    timestamp:1
                },
            },
        },
        links:[
            {
                repo:'lists',
                id:'membership',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'tribes',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'connections',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'requesting',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'pending',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'diaries',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'notes',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'tasks',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'messages',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'streams',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'calendars',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'accounting',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'roles',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'programs',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'projects',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'resources',
                serialid:serializer.getid(),
            },
            {
                repo:'lists',
                id:'other',
                serialid:serializer.getid(),
            },
        ],
    },
}

let links = {}

let items = {
    henrik:{
        type:{
            id:'member',
            name:'member',
            scheme:'common',
        },
        metadata: {
            id:null,
            scheme:null,
        },
        identity:{
            id:'henrik',
        },
        properties:{
            tag:'Henrik',
            name:'Henrik Bechmann',
            title:null,
            description:'Creator of Tribalopolis',
            birthdate:'1950-08-23',
            location:'Toronto',
            locationid:'Toronto',
        },
        listref:{repo:'lists',id:'henrik'},
    },
}

let stacks = [
    [
        [
            {
                ref:{
                    repo:'items',
                    id:'henrik',
                    serialid:serializer.getid(),
                },
                liststack:[],
            },
        ],
    ],
    [
        [
            {
                ref:{
                    repo:'items',
                    id:'henrik',
                    serialid:serializer.getid(),
                },
                liststack:[],
            },
        ],
    ],
    [
        [
            {
                ref:{
                    repo:'items',
                    id:'henrik',
                    serialid:serializer.getid(),
                },
                liststack:[],
            },
        ],
    ],
    [
        [
            {
                ref:{
                    repo:'items',
                    id:'henrik',
                    serialid:serializer.getid(),
                },
                liststack:[],
            },
        ],
    ],
]

export {lists, links, items, types, schemes, stacks, maps}