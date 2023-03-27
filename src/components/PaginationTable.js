import React, { useEffect, useMemo, useState } from 'react';
import { GROUPED_COLUMNS } from './columns';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import axios from 'axios';
import './table.css';

function PaginationTable() {
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
        data,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, usePagination);

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, setGlobalFilter, prepareRow, state } = tableInstance;
    const { pageIndex, pageSize, globalFilter } = state;

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
                    {page.map(row => {
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
            <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                {[10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                ))}
            </select>
            <span>
                Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
            </span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </>
    )
}

export default PaginationTable