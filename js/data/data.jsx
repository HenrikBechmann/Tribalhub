// data.tsx
let nodeheap = [
    {
        sessionid: 0,
        type: 'object',
        class: 'primary owner',
        schema: 'common',
        tribe: '__owner__',
        id: 'henrik',
        profile: {
            tag: 'Henrik',
            name: 'Henrik Bechmann',
            title: null,
            description: 'Creator of Tribalopolis',
            birthdate: '1950-08-23',
            location: 'Toronto',
            locationid: 'Toronto',
        },
        categories: {
            set: {
                diaries: {
                    active: true,
                    count: 3,
                    name: 'Diaries',
                    schema: 'common',
                },
                tribes: {
                    active: true,
                    count: 5,
                    name: 'Tribes',
                    schema: 'common',
                    sysnode: true,
                },
                connections: {
                    active: true,
                    count: 23,
                    name: 'Connections',
                    schema: 'common',
                },
                requesting: {
                    active: true,
                    count: 12,
                    name: 'Outgoing action requests',
                    schema: 'common',
                },
                pending: {
                    active: true,
                    count: 23,
                    name: 'Incoming action requests',
                    schema: 'common',
                },
                roles: {
                    active: true,
                    count: 4,
                    name: 'Roles',
                    schema: 'common',
                },
                programs: {
                    active: true,
                    count: 5,
                    name: 'Programs',
                    schema: 'common',
                },
                projects: {
                    active: true,
                    count: 3,
                    name: 'Projects',
                    schema: 'common',
                },
                tasks: {
                    active: true,
                    count: 20,
                    name: 'Tasks',
                    schema: 'common',
                },
                messengers: {
                    active: true,
                    count: 3,
                    name: 'Messengers',
                    schema: 'common',
                },
                resources: {
                    active: true,
                    count: 64,
                    name: 'Resources',
                    schema: 'common',
                },
                calendars: {
                    active: true,
                    count: 67,
                    name: 'Calendars',
                    schema: 'common',
                },
                accounting: {
                    active: true,
                    count: 6000,
                    name: 'Accounting',
                    schema: 'common',
                },
                other: {
                    active: true,
                    count: 2,
                    name: 'Other',
                    schema: 'common',
                    sysnode: true,
                },
            },
            order: [
                'tribes',
                'connections',
                'requesting',
                'pending',
                'diaries',
                'tasks',
                'messengers',
                'calendars',
                'accounting',
                'roles',
                'programs',
                'projects',
                'resources',
                'other',
            ]
        },
    },
];
let datastacks = [
    [[{ sessionid: 0, config: 'base' },
        ]],
    [[{ sessionid: 0, config: 'base' },
        ]],
    [[{ sessionid: 0, config: 'base' },
        ]],
    [[{ sessionid: 0, config: 'base' },
        ]],
];
export { nodeheap, datastacks };
//# sourceMappingURL=data.jsx.map