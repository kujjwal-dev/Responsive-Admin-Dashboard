import React, { useState, useEffect } from 'react';
import './ModeratorTable.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { TextField, Stack } from '@mui/material';

const ModeratorTable
 = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from a dummy API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    filterRows(value);
  };

  const filterRows = (value) => {
    const filteredRows = data.filter(item => 
      item.name.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value) ||
      item.username.toLowerCase().includes(value) ||
      item.phone.includes(value)
    );
    setFilteredData(filteredRows);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200, filterable: true },
    { field: 'username', headerName: 'Username', width: 150, filterable: true },
    { field: 'email', headerName: 'Email', width: 250, filterable: true },
    { field: 'phone', headerName: 'Phone', width: 150, filterable: true },
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
          rowsPerPageOptions={[5,10,20]}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          disableColumnMenu
        />
      </div>
    </div>
  );
};

export default ModeratorTable;
;
