import React from 'react';
import 'react-table/react-table.css'
import ReactTable from 'react-table'

export default function AppTable ({data, columns}){

    return <ReactTable
        data={data || []}
        columns={columns || []} />
}