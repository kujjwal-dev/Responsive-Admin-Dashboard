import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material';









function ChildrenTable() {

  const [users,setUsers] = useState([]);

  
const columns = [{

  name: 'id',
  label: "S.NO"
},{
  name: 'kid_email',
  label: "Email",
  
},{

   name: 'kid_phone_number',
   label: "Phone no.",

},{

   name: 'child_class',
   label: "Class"

},
{
  name:'child_board',
  label: "Board",
  
  
},{
  name:'child_username',
  label: "Username",
  
},
{
    name:'child_password',
    label: "Password",
    
  },

];

const rows = [
  {
    id: 1,
    kid_email: 'example@example.com',
    kid_phone_number: 'example',
    child_class: 'Class 5',
    child_board: 'CBSE',
    child_username: 'example_123',
    child_password: 'password123',
  }
];



    useEffect(() =>{
      
    },[])




   const options = {
     selectableRows: false,
     elevation: 0,
     rowsPerPage: 5,
     rowsPerPageOptions: [5,10,20,30],
   };

  const getMuiTheme = () => createTheme({
    typography: { fontFamily: 'Poppins'},

  
    palette: {
        background: { paper: "#ffffff ", default: "#ffffff" },
  
        mode: "light",
  
  
      },
  components: {
    MuiTableCell:{
      styleOverrides:{
        head:{
          padding:"10px 4px",

        },
        body:{
          padding:"7px 15px",
          color: "#000000",
        }
      }
    }
  }

  })

  return (
    
      <div className='flex flex-col gap-4'>

        <ThemeProvider theme={getMuiTheme()}>

        

          <MUIDataTable
         
        // data={users}
        data={rows}
        columns={columns}
        options={options}
      />
        </ThemeProvider>
      
      </div>
    
    
  
  )
}

export default ChildrenTable;