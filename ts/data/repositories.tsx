// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later
/*
    Consider including a TOKEN (summary) with each document for lists
*/

// repositories.tsx
let folders = {
    henrikacf:{
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
        },
        references:{
            parent:'',
            list:'',
            folder:'',
        },
        counts:{},
        system:{
            attributes:{
            },
            permissions:{
                acl:{},
                folder:'',
            },
        },
        data:{},
    }
}

let schemes = {
    somescheme:{
        control:{
        },
        properties:{},
        references:{
            parent:{
                id:'',
                handle:'',
            },
        },
        counts:{},
        system:{},
        data:{},
    }
}

let localtypes = {
    incoming:{
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            metatype:'',
            fields:{
                links:[],
                origin:[],
                target:[],
            },
            version:0,
            map:{},
            interface:{},
            defaults:{},
            display:{},
            static:{
                is:{},
                has:{},
            }
        },
        references:{
            list:'',
            parent:{
                id:'',
                handle:'',
            },
        },
        counts:{},
        system:{
            attributes:{
            },
            permissions:{
                folder:'',
                acl:{},
            },
        },
        data:{},
    },
    outgoing: {
        control: {
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties: {
            metatype:'',
            version:0,
            map:{},
            interface:{},
            defaults:{},
            display:{},
            static:{
                is:{
                    outgoing:true,
                },
                has:{},
            },
            fields:{},
        },
        references:{
            list:'',
            parent:{
                id:'',
                handle:'',
                account:{
                    id:'',
                    handle:'',
                },
            },
        },
        counts:{},
        system:{
            attributes:{},
            permissions:{
                folder:'',
            },
        },
        data:{},
    },
}

let lists = {
    diaries:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            class:'field',
            version:0,
            name:'Diaries',
        },
        references:{
            subscriptions:[], // {reference:[],list:''}
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    logs:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            class:'field',
            version:0,
            name:'Logs',
        },
        references:{
            subscriptions:[], // {reference:[],list:''}
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    notes:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
       },
        properties:{
            version:0,
            name:'Notes',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    tribes:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Tribes',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{
                sysnode:true,
            },
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    connections:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Contacts',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    requesting:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Action items',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    assets:
    {
        control:{
            container:'',
            id:'assets',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Assets',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    roles:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Roles',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    programs:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Programs',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    plans:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Plans',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    projects:
    {
        control:{
            container:'',
            id:'outgoing',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Projects',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    tasks:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'To do Lists',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    managedtasks:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'To do lists - Checklists',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    deeptasks:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'To do lists - Complex',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    messages:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Messages',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    streams:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Forums',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    resources:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Documents',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    calendars:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Calendars',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    timesheets:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Timesheets',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    accounting:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Ledgers',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    budgets:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Budgets',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
    recipes:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            types:'/types/recipes',
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Recipes',
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:0,
            links:0,
        },
        system:{
            attributes:{},
            permissions:{},
        },
        data:{
            lists:[],
            links:[],
        },
    },
//     membership:
//     {
//         control:{
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
    //     control:{
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
    henrik:
    {
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            name:'Folders',
            linkedlist:false,
        },
        references:{
            subscriptions:[],
            owner:{
                reference:'/items/henrik',
            },
            parentlists:[],
            folder:'',
        },
        counts:{
            lists:20,
            links:0,
        },
        system:{
            attributes:{
                sysnode:true,
            },
            permissions:{},
        },
        data:{
            lists:[
                // {
                //     collection:'lists',
                //     id:'membership',
                // },
                {
                    reference:'/lists/tribes',
                },
                {
                    reference:'/lists/roles',
                },
                {
                    reference:'/lists/connections',
                },
                {
                    reference:'/lists/messages',
                },
                {
                    reference:'/lists/streams',
                },
                {
                    reference:'/lists/requesting',
                },
                {
                    reference:'/lists/tasks',
                },
                // {
                //     reference:'/lists/managedtasks',
                // },
                // {
                //     reference:'/lists/deeptasks',
                // },
                {
                    reference:'/lists/projects',
                },
                {
                    reference:'/lists/programs',
                },
                {
                    reference:'/lists/plans',
                },
                {
                    reference:'/lists/calendars',
                },
                {
                    reference:'/lists/timesheets',
                },
                {
                    reference:'/lists/accounting',
                },
                {
                    reference:'/lists/budgets',
                },
                {
                    reference:'/lists/logs',
                },
                {
                    reference:'/lists/notes',
                },
                {
                    reference:'/lists/diaries',
                },
                {
                    reference:'/lists/resources',
                },
                {
                    reference:'/lists/assets',
                },
                {
                    reference:'/lists/recipes',
                },
            ],
            links:[],
        },
    },
}

let links = {
    somelink:{
        control:{
            container:'',
            id:'',
            handle:'',
            type:null,
            account:{
                id:'',
                handle:'',
            },
        },
        properties:{
            version:0,
            startdate:null,
            enddate:null,
        },
        references:{
            lists:[],
            folder:'',
        },
        counts:{},
        system:{},
        data:{},
    }
}

let items = {
    henrik:{
        control:{
            container:'',
            id:'',
            handle:'henrik',
            type:null,
            account:{
                id:'',
                handle:'',
            },
            version:0,
        },
        properties:{
            name:{
                honorific:'Mr.',
                firstname:'Henrik',
                lastname:'Bechmann',
                middlenames:'Emanuel',
                givenname:'Henrik',
                fullname:'Henrik Bechmann',
                fullnamecomposite:{
                    composite:true,
                    honorific:false,
                    firstname:true,
                    lastname:true,
                    middlenames:false,
                    givenname:false,
                    designations:false,
                },
                designations:'',
            },
            genderpronoun:'he',
            description:'Creator of Tribalopolis',
            birthdate:'1950-08-23',
            enddate:null,
            address:{
                unit:'',
                streetnumber:'',
                streetname:'',
                locality:'',
                region:'',
                country:'',
                locationcode:'',
                startdate:null,
                enddate:null,
            },
        },
        references:{
            chain:{
                prior:'',
                next:'',
            },
            list:'henrik',
            folder:'',
        },
        counts:{},
        system:{
            attributes:{},
            permissions:{},
        },
        data:{},
    },
}

let accounts = {
    someaccount:{
        control:{},
        properties:{},
        references:{},
        counts:{},
        system:{},
        data:{},
    }
}

export { schemes, localtypes, items, lists, links, folders, accounts } 
