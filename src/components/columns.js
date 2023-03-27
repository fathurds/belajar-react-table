export const COLUMNS = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'User Id',
        accessor: 'userId',
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Body',
        accessor: 'body',
    },
]

export const GROUPED_COLUMNS = [
    {
        Header: 'id',
        columns: [
            {
                accessor: 'id',
            }
        ]
    },
    {
        Header: 'User Id',
        columns: [
            {
                accessor: 'userId',
            }
        ]
    },
    {
        Header: 'Posts',
        columns: [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Body',
                accessor: 'body',
            },
        ]
    },
]