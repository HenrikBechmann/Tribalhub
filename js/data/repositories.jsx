// workspacedata.tsx
let maps = {
    scheme: {
        common: {
            tribe: 'tribalopolis',
            parent: null,
        }
    },
};
let schemes = {
    common: {
        list: {},
        item: {},
        link: {},
    },
};
let types = {
    list: {
        common: {
            __default__: {
                type: {},
                identity: {},
                properties: {
                    is: {},
                    has: {},
                },
            },
            member: {
                type: {},
                identity: {},
                properties: {
                    is: {},
                    has: {},
                },
            },
            diaries: {}
        },
    },
    item: {},
    link: {},
};
let lists = {
    diaries: {
        type: {
            id: 'diaries',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Diaries',
            aggregates: {
                childcount: {
                    amount: 3,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    notes: {
        type: {
            id: 'notes',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Notes',
            aggregates: {
                childcount: {
                    amount: 310,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    tribes: {
        type: {
            id: 'tribes',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Tribes',
            sysnode: true,
            aggregates: {
                childcount: {
                    amount: 5,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    connections: {
        type: {
            id: 'connections',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Contacts',
            aggregates: {
                childcount: {
                    amount: 23,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    requesting: {
        type: {
            id: 'requesting',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Outgoing action requests',
            aggregates: {
                childcount: {
                    amount: 12,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    pending: {
        type: {
            id: 'pending',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Incoming action requests',
            aggregates: {
                childcount: {
                    amount: 23,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    roles: {
        type: {
            id: 'roles',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Roles',
            aggregates: {
                childcount: {
                    amount: 4,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    programs: {
        type: {
            id: 'programs',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Programs',
            aggregates: {
                childcount: {
                    amount: 5,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    projects: {
        type: {
            id: 'projects',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Projects',
            aggregates: {
                childcount: {
                    amount: 3,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    tasks: {
        type: {
            id: 'tasks',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Tasks',
            aggregates: {
                childcount: {
                    amount: 20,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    messages: {
        type: {
            id: 'messengers',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Direct Messages ',
            aggregates: {
                childcount: {
                    amount: 3,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    streams: {
        type: {
            type: 'messengers',
            type_scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Message Streams ',
            aggregates: {
                childcount: {
                    amount: 100,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    resources: {
        type: {
            id: 'resources',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Resources',
            aggregates: {
                childcount: {
                    amount: 64,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    calendars: {
        type: {
            type: 'calendars',
            type_scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Calendars',
            aggregates: {
                childcount: {
                    amount: 67,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    accounting: {
        type: {
            id: 'accounting',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Accounting',
            aggregates: {
                childcount: {
                    amount: 6000,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    membership: {
        type: {
            id: 'other',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Membership',
            sysnode: true,
            aggregates: {
                childcount: {
                    amount: 2,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    other: {
        type: {
            id: 'other',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'More...',
            sysnode: true,
            aggregates: {
                childcount: {
                    amount: 2,
                    timestamp: 1
                },
            },
        },
        links: [],
    },
    henrik: {
        type: {
            id: 'member',
            scheme: 'common',
        },
        identity: {
            id: 'x',
        },
        properties: {
            name: 'Links',
            sysnode: true,
            aggregates: {
                childcount: {
                    amount: 6558,
                    timestamp: 1
                },
            },
        },
        links: [
            {
                repo: 'lists',
                id: 'membership',
            },
            {
                repo: 'lists',
                id: 'tribes',
            },
            {
                repo: 'lists',
                id: 'connections',
            },
            {
                repo: 'lists',
                id: 'requesting',
            },
            {
                repo: 'lists',
                id: 'pending',
            },
            {
                repo: 'lists',
                id: 'diaries',
            },
            {
                repo: 'lists',
                id: 'notes',
            },
            {
                repo: 'lists',
                id: 'tasks',
            },
            {
                repo: 'lists',
                id: 'messages',
            },
            {
                repo: 'lists',
                id: 'streams',
            },
            {
                repo: 'lists',
                id: 'calendars',
            },
            {
                repo: 'lists',
                id: 'accounting',
            },
            {
                repo: 'lists',
                id: 'roles',
            },
            {
                repo: 'lists',
                id: 'programs',
            },
            {
                repo: 'lists',
                id: 'projects',
            },
            {
                repo: 'lists',
                id: 'resources',
            },
            {
                repo: 'lists',
                id: 'other',
            },
        ],
    },
};
let links = {};
let items = {
    henrik: {
        type: {
            id: 'member',
            name: 'member',
            scheme: 'common',
        },
        identity: {
            id: 'henrik',
        },
        properties: {
            tag: 'Henrik',
            name: 'Henrik Bechmann',
            title: null,
            description: 'Creator of Tribalopolis',
            birthdate: '1950-08-23',
            location: 'Toronto',
            locationid: 'Toronto',
        },
        listref: { repo: 'lists', id: 'henrik' },
    },
};
let stacks = [
    [
        {
            ref: { repo: 'items', id: 'henrik' },
            liststack: [],
        },
    ],
    [
        {
            ref: { repo: 'items', id: 'henrik' },
            liststack: [],
        },
    ],
    [
        {
            ref: { repo: 'items', id: 'henrik' },
            liststack: [],
        },
    ],
    [
        {
            ref: { repo: 'items', id: 'henrik' },
            liststack: [],
        },
    ],
];
export { lists, links, items, types, schemes, stacks, maps };
//# sourceMappingURL=repositories.jsx.map