// repositories.tsx
let schemes = {
}

let types = {
    incoming:{
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{

        },
        identity:{

        },
        properties:{
            is:{},
            has:{},
        },
        list:{},
    },
    outgoing: {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{

        },
        identity: {

        },
        properties: {
            is:{
                outgoing:true,
            },
            has:{},
        },
        list:{},
    },
}

let lists = {
    diaries:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Diaries',
            numbers:{
                list:{
                    count:3,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    notes:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
             uid:'x',
       },
        properties:{
            name:'Notes',
            numbers:{
                list:{
                    count:310,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    tribes:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Tribes',
            sysnode:true,
            numbers:{
                list:{
                    count:5,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    connections:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Contacts',
            numbers:{
                list:{
                    count:23,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    requesting:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Outgoing action requests',
            numbers:{
                list:{
                    count:12,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    pending:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Incoming action requests',
            numbers:{
                list:{
                    count:23,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    roles:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Roles',
            numbers:{
                list:{
                    count:4,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    programs:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Programs',
            numbers:{
                list:{
                    count:5,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    projects:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Projects',
            numbers:{
                list:{
                    count:3,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    tasks:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Tasks',
            numbers:{
                list:{
                    count:20,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    messages:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Direct Messages ',
            numbers:{
                list:{
                    count:3,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    streams:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Message Streams ',
            numbers:{
                list:{
                    count:100,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    resources:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Resources',
            numbers:{
                list:{
                    count:64,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    calendars:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Calendars',
            numbers:{
                list:{
                    count:67,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    accounting:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'outgoing',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Accounting',
            numbers:{
                list:{
                    count:6000,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    membership:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Tribalopolis Membership',
            sysnode:true,
            numbers:{
                list:{
                    count:2,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
// account, website, home
    },
    other:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'More...',
            sysnode:true,
            numbers:{
                list:{
                    count:2,
                    timestamp:1
                },
            },
        },
        list:[],
        item:'henrik',
    },
    henrik:
    {
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            schemeuid:'common',
        },
        identity:{
            uid:'x',
        },
        properties:{
            name:'Links Directory',
            sysnode:true,
            numbers:{
                list:{
                    count:6558,
                    timestamp:1
                },
            },
            linkedlist:false,
        },
        list:[
            {
                repo:'lists',
                uid:'membership',
            },
            {
                repo:'lists',
                uid:'tribes',
            },
            {
                repo:'lists',
                uid:'connections',
            },
            {
                repo:'lists',
                uid:'requesting',
            },
            {
                repo:'lists',
                uid:'pending',
            },
            {
                repo:'lists',
                uid:'diaries',
            },
            {
                repo:'lists',
                uid:'notes',
            },
            {
                repo:'lists',
                uid:'tasks',
            },
            {
                repo:'lists',
                uid:'messages',
            },
            {
                repo:'lists',
                uid:'streams',
            },
            {
                repo:'lists',
                uid:'calendars',
            },
            {
                repo:'lists',
                uid:'accounting',
            },
            {
                repo:'lists',
                uid:'roles',
            },
            {
                repo:'lists',
                uid:'programs',
            },
            {
                repo:'lists',
                uid:'projects',
            },
            {
                repo:'lists',
                uid:'resources',
            },
            {
                repo:'lists',
                uid:'other',
            },
        ],
        item:'henrik',
    },
}

let links = {}

let items = {
    henrik:{
        access:{
            attributes:{

            },
            permissions:{

            },
        },
        type:{
            uid:'incoming',
            name:'member', // TODO: should be obtained from type object
            schemeuid:'common',
        },
        identity:{
            uid:'henrik',
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
        list:{repo:'lists',uid:'henrik'},
    },
}

export { schemes, types, items, lists, links }
