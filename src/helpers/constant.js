export const organization = [
    {
        value: 'mcmaster',
        label: 'McMaster University',
        children: [
            {
                value: 'cs',
                label: 'Computer Science',
                children: [
                    {
                        value: '4HC3',
                        label: '4HC3',
                    },
                    {
                        value: '2ME3',
                        label: '2ME3',
                    },
                ],
            },
            {
                value: 'history',
                label: 'History',
                children: [
                    {
                        value: '3EC3',
                        label: '3EC3',
                    },
                    {
                        value: '3H03',
                        label: '3H03',
                    },
                ],
            },
            {
                value: 'life',
                label: 'Life Science',
                children: [
                    {
                        value: '1D03',
                        label: '1D03',
                    },
                    {
                        value: '3AA3',
                        label: '3AA3',
                    },
                ],
            },
            {
                value: 'eco',
                label: 'Economics',
                children: [
                    {
                        value: '1A03',
                        label: '1A03',
                    },
                    {
                        value: '1B03',
                        label: '1B03',
                    },
                ],
            },
            {
                value: 'math',
                label: 'Mathematics',
                children: [
                    {
                        value: '1ZA3',
                        label: '1ZA3',
                    },
                    {
                        value: '1ZB3',
                        label: '1ZB3',
                    },
                ],
            },
        ],
    },
]

export const defaultUsers = [
    {
        username: 'admin',
        password: 'admin'
    },
    {
        username: 'root',
        password: 'root'
    }
]


export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

export const modalFormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};

export const defaultGroup = [
    {
        "groupname": "COMP-SCI-4HC3_2P",
        "organization": ["mcmaster", "cs", "4HC3"],
        "maxNum": 2,
        "assgnType": "project",
        "assgnNo": "2",
        "assgnDesc": "test",
        "no": 16,
        "members": [{
            "username": "admin",
            "role": "CREATOR",
            "rate": null,
            "intro": "hello, world.",
            "reason": null
        }]
    }]
