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

      customBodyRender: (value) => (<ChildrenPopper children={value} />

      ),
      filter: false
    }
  },
  ];

  const rows = [
    { 
      father_name: 'Amit Kumar', 
      mother_name: 'Sneha Sharma', 
      father_phone_number: '9876543210', 
      mother_phone_number: '8765432109', 
      father_email: 'amit@example.com', 
      mother_email: 'sneha@example.com', 
      started_at: '2023-01-01', 
      ended_at: '2023-12-31', 
      children: 'Aarav Kumar' 
    },
    { 
      father_name: 'Rahul Singh', 
      mother_name: 'Pooja Patel', 
      father_phone_number: '7654321098', 
      mother_phone_number: '6543210987', 
      father_email: 'rahul@example.com', 
      mother_email: 'pooja@example.com', 
      started_at: '2022-06-15', 
      ended_at: '2023-07-20', 
      children: 'Aryan Patel' 
    },
    { 
      father_name: 'Suresh Gupta', 
      mother_name: 'Deepa Verma', 
      father_phone_number: '5432109876', 
      mother_phone_number: '4321098765', 
      father_email: 'suresh@example.com', 
      mother_email: 'deepa@example.com', 
      started_at: '2021-03-10', 
      ended_at: '2022-04-30', 
      children: 'Vivek Verma' 
    },
    { 
      father_name: 'Vikas Sharma', 
      mother_name: 'Meena Devi', 
      father_phone_number: '3210987654', 
      mother_phone_number: '2109876543', 
      father_email: 'vikas@example.com', 
      mother_email: 'meena@example.com', 
      started_at: '2020-09-01', 
      ended_at: '2021-10-15', 
      children: 'Rahul Sharma' 
    },
    { 
      father_name: 'Sanjay Verma', 
      mother_name: 'Anita Singh', 
      father_phone_number: '1098765432', 
      mother_phone_number: '0987654321', 
      father_email: 'sanjay@example.com', 
      mother_email: 'anita@example.com', 
      started_at: '2019-12-05', 
      ended_at: '2021-01-20', 
      children: 'Kavya Singh' 
    },
  ];
  
 
  

  // useEffect(() => {
  //   fetch('https://dummyjson.com/users')
  //     .then(res => res.json())
  //     .then(data => {
  //       let local = data?.users?.map((user) => ({
  //         ...user,

  //         name: user?.firstName + ' ' + user?.lastName,
  //       }))
  //       setUsers(local)
  //     });
  // }, [])


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
            color: "#000000",
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
          data={rows}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  )
}

export default ParentTable
