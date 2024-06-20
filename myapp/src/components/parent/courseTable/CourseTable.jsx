import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material';









function CourseTable() {

  const [users,setUsers] = useState([]);

  
const columns = [{

  name: 'id',
  label: "S.NO"
},{
  name: 'course_name',
  label: "Course",
  
},{

   name: 'status',
   label: "Status",

},{

   name: 'Quiz',
   label: "Quiz",

},

];

    useEffect(() =>{
        // to get api content
      






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
          color: "#e2e8f0",
        }
      }
    }
  }

  })

  return (
    
      <div className='flex flex-col gap-4'>

        <ThemeProvider theme={getMuiTheme()}>

        

          <MUIDataTable
        
        data={users}
        columns={columns}
        options={options}
      />
      
        </ThemeProvider>
      
      </div>
    
    
  
  )
}

export default CourseTable;