/*
    Consider including a TOKEN (summary) with each document for lists
*/
// repositories.tsx
let folders = {
    henrikacf: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
        },
        references: {
            parent: '',
            list: '',
            folder: '',
        },
        counts: {},
        system: {
            attributes: {},
            permissions: {
                acl: {},
                folder: '',
            },
        },
        data: {},
    }
};
let schemes = {
    somescheme: {
        identity: {},
        properties: {},
        references: {
            parent: {
                id: '',
                handle: '',
            },
        },
        counts: {},
        system: {},
        data: {},
    }
};
let types = {
    incoming: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            metatype: '',
            fields: {
                links: [],
                origin: [],
                target: [],
            },
            version: 0,
            map: {},
            interface: {},
            defaults: {},
            display: {},
            static: {
                is: {},
                has: {},
            }
        },
        references: {
            list: '',
            parent: {
                id: '',
                handle: '',
            },
        },
        counts: {},
        system: {
            attributes: {},
            permissions: {
                folder: '',
                acl: {},
            },
        },
        data: {},
    },
    outgoing: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            metatype: '',
            version: 0,
            map: {},
            interface: {},
            defaults: {},
            display: {},
            static: {
                is: {
                    outgoing: true,
                },
                has: {},
            },
            fields: {},
        },
        references: {
            list: '',
            parent: {
                id: '',
                handle: '',
                account: {
                    id: '',
                    handle: '',
                },
            },
        },
        counts: {},
        system: {
            attributes: {},
            permissions: {
                folder: '',
            },
        },
        data: {},
    },
};
let lists = {
    diaries: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            class: 'field',
            version: 0,
            name: 'Diaries',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    logs: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            class: 'field',
            version: 0,
            name: 'Logs',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    notes: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Notes',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    tribes: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Tribes',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {
                sysnode: true,
            },
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    connections: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Contacts',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    requesting: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Action requests',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    assets: {
        identity: {
            container: '',
            id: 'assets',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Assets',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    roles: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Roles',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    programs: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Programs',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    plans: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Plans',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    projects: {
        identity: {
            container: '',
            id: 'outgoing',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Projects',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    tasks: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'To do lists',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    messages: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Messages',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    streams: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Discussion Forums',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    resources: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Literature',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    calendars: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Calendars',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    timesheets: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Timesheets',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    accounting: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Ledgers',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    budgets: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Budgets',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    recipes: {
        identity: {
            container: '',
            id: '',
            handle: '',
            types: '/types/recipes',
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Recipes',
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 0,
            links: 0,
        },
        system: {
            attributes: {},
            permissions: {},
        },
        data: {
            lists: [],
            links: [],
        },
    },
    //     membership:
    //     {
    //         identity:{
    //             container:'',
    //             id:'',
    //             handle:'',
    //             type:{
    //                 id:'outgoing',
    //                 handle:'',
    //             },
    //             account:{
    //                 id:'',
    //                 handle:'',
    //             },
    //         },
    //         properties:{
    //             version:0,
    //             name:'My Account',
    //         },
    //         references:{
    //             subscriptions:[],
    //             owner:{
    //                 id:'henrik',
    //                 collection:'items',
    //             },
    //             parentlists:[],
    //             folder:'',
    //         },
    //         counts:{
    //             lists:0,
    //             links:0,
    //         },
    //         system:{
    //             attributes:{
    //                 sysnode:true,
    //             },
    //             permissions:{},
    //         },
    //         data:{
    //             lists:[],
    //             links:[],
    //         },
    // // account, website, home
    //     },
    // other:
    // {
    //     identity:{
    //         container:'',
    //         id:'',
    //         handle:'',
    //         type:{
    //             id:'',
    //             handle:'',
    //         },
    //         account:{
    //             id:'',
    //             handle:'',
    //         },
    //     },
    //     properties:{
    //         version:0,
    //         name:'More...',
    //     },
    //     references:{
    //         subscriptions:[],
    //         owner:{
    //             id:'henrik',
    //             collection:'items',
    //         },
    //         parentlists:[],
    //         folder:'',
    //     },
    //     counts:{
    //         lists:0,
    //         links:0,
    //     },
    //     system:{
    //         attributes:{
    //             sysnode:true,
    //         },
    //         permissions:{},
    //     },
    //     data:{
    //         lists:[],
    //         links:[],
    //     },
    // },
    henrik: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            name: 'Records',
            linkedlist: false,
        },
        references: {
            subscriptions: [],
            owner: {
                id: 'henrik',
                collection: 'items',
            },
            parentlists: [],
            folder: '',
        },
        counts: {
            lists: 20,
            links: 0,
        },
        system: {
            attributes: {
                sysnode: true,
            },
            permissions: {},
        },
        data: {
            lists: [
                // {
                //     collection:'lists',
                //     id:'membership',
                // },
                {
                    collection: 'lists',
                    id: 'tribes',
                },
                {
                    collection: 'lists',
                    id: 'roles',
                },
                {
                    collection: 'lists',
                    id: 'connections',
                },
                {
                    collection: 'lists',
                    id: 'requesting',
                },
                {
                    collection: 'lists',
                    id: 'messages',
                },
                {
                    collection: 'lists',
                    id: 'streams',
                },
                {
                    collection: 'lists',
                    id: 'tasks',
                },
                {
                    collection: 'lists',
                    id: 'projects',
                },
                {
                    collection: 'lists',
                    id: 'programs',
                },
                {
                    collection: 'lists',
                    id: 'plans',
                },
                {
                    collection: 'lists',
                    id: 'calendars',
                },
                {
                    collection: 'lists',
                    id: 'timesheets',
                },
                {
                    collection: 'lists',
                    id: 'accounting',
                },
                {
                    collection: 'lists',
                    id: 'budgets',
                },
                {
                    collection: 'lists',
                    id: 'logs',
                },
                {
                    collection: 'lists',
                    id: 'diaries',
                },
                {
                    collection: 'lists',
                    id: 'notes',
                },
                {
                    collection: 'lists',
                    id: 'resources',
                },
                {
                    collection: 'lists',
                    id: 'assets',
                },
                {
                    collection: 'lists',
                    id: 'recipes',
                },
            ],
            links: [],
        },
    },
};
let links = {
    somelink: {
        identity: {
            container: '',
            id: '',
            handle: '',
            type: null,
            account: {
                id: '',
                handle: '',
            },
        },
        properties: {
            version: 0,
            startdate: null,
            enddate: null,
        },
        references: {
            lists: [],
            folder: '',
        },
        counts: {},
        system: {},
        data: {},
    }
};
let items = {
    henrik: {
        identity: {
            container: '',
            id: '',
            handle: 'henrik',
            type: null,
            account: {
                id: '',
                handle: '',
            },
            version: 0,
        },
        properties: {
            name: {
                honorific: 'Mr.',
                firstname: 'Henrik',
                lastname: 'Bechmann',
                middlenames: 'Emanuel',
                givenname: 'Henrik',
                fullname: 'Henrik Bechmann',
                fullnamecomposite: {
                    composite: true,
                    honorific: false,
                    firstname: true,
                    lastname: true,
                    middlenames: false,
                    givenname: false,
                    designations: false,
                },
                designations: '',
            },
            genderpronoun: 'he',
            description: 'Creator of Tribalopolis',
            birthdate: '1950-08-23',
            enddate: null,
            address: {
                unit: '',
                streetnumber: '',
                streetname: '',
                locality: '',
                region: '',
                country: '',
                locationcode: '',
                startdate: null,
                enddate: null,
            },
        },
        references: {
            chain: {
                prior: '',
                next: '',
            },
            list: 'henrik',
            folder: '',
        },
        counts: {},
        system: {
            attributes: {},
            permissions: {},
        },
        data: {},
    },
};
let accounts = {
    someaccount: {
        identity: {},
        properties: {},
        references: {},
        counts: {},
        system: {},
        data: {},
    }
};
export { schemes, types, items, lists, links, folders, accounts };
//# sourceMappingURL=repositories.jsx.map