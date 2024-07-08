import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Axios from 'axios';
import toast from "react-hot-toast";


const initialValues = {
  sub_category: "",
  main_category_id: "",
};

const validationSchema = Yup.object({
  sub_category: Yup.string().required("Sub Category is required"),
  main_category_id: Yup.string().required('Main Category is required')
});

const FirstButton = () => {
  const [open, setOpen] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [loading,setLoading] = useState(false);

  async function get_main_category() {
    try {
      const main_category = await Axios.get('http://localhost:3001/api/v1/category/get_main_category', {
        withCredentials: true,
      });
      console.log("main category", main_category)
      setMainCategories(main_category?.data?.data)
    } catch (error) {
      console.error("Error fetching main categories",error)
    }
  }

  useEffect(() => {
    get_main_category();
  }, []);


  const functionOpenPopup = () => {
    setOpen(true);
  };
  const functionClosePopup = () => {
    setOpen(false);
  };


  const { values, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setLoading(true);
      try {
        const createSubCategory = await Axios.post("http://localhost:3001/api/v1/category//create_sub_category",{
          sub_category: values.sub_category,
          main_category_id: values.main_category_id,
        },{
          withCredentials:true,
        });
        toast.success("Sub Category Created Successfully");
        console.log(createSubCategory.data);
        resetForm();
        functionClosePopup();
      } catch (error) {
        toast.error("Failed to create category")
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={functionOpenPopup}
        variant="contained"
        sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
      >
        Add Sub Category
      </Button>
      <Dialog open={open} onClose={functionClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Sub Category
          <IconButton onClick={functionClosePopup} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>


          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>

              <FormControl error={touched.main_category_id && Boolean(errors.main_category_id)}
              >
                <InputLabel id="main-category-label">Main Category</InputLabel>
                <Select
                  labelId="main-category-label"
                  id="main_category_id"
                  name="main_category_id"
                  value={values.main_category_id}
                  onChange={handleChange}
                  label='Main Category'
                  required
                >
                  <MenuItem value=''>
                    <em>Select a main category</em>
                  </MenuItem>
                  {mainCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.main_category}
                    </MenuItem>
                  ))}
                </Select>
                {touched.main_category_id && errors.main_category_id && (
                  <FormHelperText>{errors.main_category_id}</FormHelperText>
                )}
              </FormControl>

              <TextField
                label="Sub Category"
                className="rounded-md"
                placeholder="Enter sub category"
                variant="outlined"
                name="sub_category"
                fullWidth
                value={values.sub_category}
                onChange={handleChange}
                error={touched.sub_category && Boolean(errors.sub_category)}
                helperText={touched.sub_category && errors.sub_category}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
                disabled={loading}
              >
                {loading ? "Submitting...."  : "Submit" }
                
              </Button>
            </Stack>
          </form>


        </DialogContent>
        <DialogActions>
          {/* <Button onClick={functionClosePopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FirstButton;



