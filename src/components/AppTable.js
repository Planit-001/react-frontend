import React from 'react';
import 'react-table/react-table.css'
import ReactTable from 'react-table'

export default function AppTable ({data, columns, defaultSorted}){

    return <ReactTable
        defaultSorted={defaultSorted ? defaultSorted : []}
        data={data || []}
        columns={columns || []} />
}