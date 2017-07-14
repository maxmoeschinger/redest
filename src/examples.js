const componentDataSelect = [
    {
        endpoint: 'service',
        select: () => null,
        children: [
            {
                endpoint: 'endpoint',
                select: () => null,
                children: []
            }
        ]
    }
];

const props = {
    service: {
        entities: [
            {
                id: 1,
                title: 123,
                endpoint: {
                    entities: [],
                    meta: {},
                    create: () => {}, // when you use this create it will automatically use the id of the parent service
                    invalidate: () => {}
                },
                update: () => {},
                remove: () => {},
                invalidate: () => {}
            }
        ],
        meta: {},
        create: () => {}, // when you use this create it will automatically use the id of the parent service
        invalidate: () => {}
    }
};

const reducerSetup = {
    endpoints: [
        {
            name: 'service',
            childrens: [
                {
                    name: 'endpoint',
                    directAccess: true,
                }
            ]
        }
    ]
};

const store = {
    redest: {
        service: {
            entities: {},
            meta: {},
            children: {
                endpoint: {
                    entities: {},
                    meta: {}
                }
            }
        }
    }
};