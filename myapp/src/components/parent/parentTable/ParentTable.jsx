import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme, Button } from '@mui/material';
import ChildrenPopper from "../childrenPopper/ChildrenPopper"

function ParentTable() {

  const [users, setUsers] = useState([]);

  const columns = [{

    name: 'father_name',
    label: "FatherName"
  }, {
    name: 'mother_name',
    label: "MotherName"
  }, {
    name: 'father_phone_number',
    label: "Father_Phone_Number"
  }, {
    name: 'mother_phone_number',
    label: "Mother_Phone_Number"
  }, {
    name: 'father_email',
    label: "Father_Email"
  }, {
    name: 'mother_email',
    label: "Mother_Email"
  }, {
    name: 'started_at',
    label: "Started_at"
  }, {
    name: 'ended_at',
    label: "Ended_at"
  }, {
    name: 'children',
    label: "Children",
    options: {

      customBodyRender: (value) => (<ChildrenPopper sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}   />

      ),
      filter: false
    }
  },
  ];

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => {
        let local = data?.users?.map((user) => ({
          ...user,

          name: user?.firstName + ' ' + user?.lastName,
        }))
        setUsers(local)
      });
  }, [])


  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
  };

  const getMuiTheme = () => createTheme({
    typography: { fontFamily: 'Poppins' },

    palette: {
      background: { paper: "#ffffff ", default: "#ffffff" },

      mode: "light",


    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: "10px 4px",

          },
          body: {
            padding: "7px 15px",
            color: "#e2e8f0",
          }
        }
      }
    }

  })

  return (

    <div className=''>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Parents list"}
          data={users}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  )
}

export default ParentTable
