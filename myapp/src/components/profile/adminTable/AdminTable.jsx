import React, { useState, useEffect, useContext } from 'react';
import './AdminTable.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { TextField, Stack } from '@mui/material';
import { ProfileContext } from '../../../context/ProfileContext';

const AdminTable = () => {
    const {admins} = useContext(ProfileContext)
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
    setFilteredData(admins)
    }, [admins]);


    const handleSearch = (event) => {
      const value = event.target.value.toLowerCase();
      setSearchText(value);
      filterRows(value);
    };

    const filterRows = (value) => {
      const filteredRows = admins.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value) ||
        item.username.toLowerCase().includes(value) ||
        item.phone.includes(value)
      );
      setFilteredData(filteredRows);
    };

    const columns = [
      { field: 'id', headerName: 'ID', width: 50 },
      { field: 'name', headerName: 'Name', width: 200, filterable: true },
      { field: 'phone', headerName: 'Phone', width: 150, filterable: true },
      { field: 'email', headerName: 'Email', width: 200, filterable: true },
      { field: 'address', headerName: 'Address', width: 250, filterable: true },
      { field: 'pancard', headerName: 'Pancard', width: 200, filterable: true },
    ];

    return (
      <div className="data-table-container">
        <Stack direction="row" spacing={2} mb={2} className="search-bar">
          <TextField
            variant="outlined"
            label="Search"
            value={searchText}
            onChange={handleSearch}
            fullWidth
          />
        </Stack>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[25, 50, 100]}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
            disableColumnMenu
          />
        </div>
      </div>
    );
  };

export default AdminTable;
;
