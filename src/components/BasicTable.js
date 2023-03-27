import React, { useEffect, useMemo, useState } from 'react';
import { GROUPED_COLUMNS } from './columns';
import { useTable, useGlobalFilter } from 'react-table';
import axios from 'axios';
import './table.css';

function BasicTable() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(data => setPosts(data.data))
            .catch(err => err);
    }, []);

    const columns = useMemo(() => GROUPED_COLUMNS, []);
    const data = useMemo(() => posts, [posts]);

    const tableInstance = useTable({
        columns,
        data
    }, useGlobalFilter);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
    const { globalFilter } = state;

    return (
        <>
            <input value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} rowSpan={column.columns?.length === 1 ? 2 : 1} style={{ display: typeof column.render('Header') === 'object' ? 'none' : '' }}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default BasicTable