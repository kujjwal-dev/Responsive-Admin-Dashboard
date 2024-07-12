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

    const rows = [
      {
        id: 1,
        course_name: 'Ancient India',
        status: 'Active',
        Quiz: 'Ancient Indian History Quiz',
      },
      {
        id: 2,
        course_name: 'Medieval India',
        status: 'Inactive',
        Quiz: 'Medieval Indian History Quiz',
      },
      {
        id: 3,
        course_name: 'Modern India',
        status: 'Active',
        Quiz: 'Modern Indian History Quiz',
      },
      {
        id: 4,
        course_name: 'Indian Independence Movement',
        status: 'Active',
        Quiz: 'Independence Movement Quiz',
      },
    ];
    
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
         title={"Course details"}
        // data={users}
        data={rows}
        columns={columns}
        options={options}
      />
      
        </ThemeProvider>
      
      </div>
    
    
  
  )
}

export default CourseTable;