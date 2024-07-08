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
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Axios from 'axios';
import toast from "react-hot-toast";

const initialValues = {
  series: "",
  main_category_id: "",
  sub_category_id: "",
};

const validationSchema = Yup.object({
  series: Yup.string().required("Series is required"),
  main_category_id: Yup.string().required("Main Category is required"),
  sub_category_id: Yup.string().required("Sub Category is required"),
});

const FirstButton = () => {
  const [open, setOpen] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function get_main_category() {
    try {
      const main_category = await Axios.get('http://localhost:3001/api/v1/category/get_main_category', {
        withCredentials: true,
      });
      console.log("main category", main_category)
      setMainCategories(main_category?.data?.data)
    } catch (error) {
      console.error("Error fetching main categories", error)
    }
  }

  async function get_sub_category() {
    try {
      const sub_category = await Axios.get('http://localhost:3001/api/v1/category/get_sub_category', {
        withCredentials: true,
      })
      console.log("sub category", sub_category)
      setSubCategories(sub_category?.data?.data)
    } catch (error) {
      console.error("Error fetching sub categories", error)
    }
  }

  //fetching main and sub categories
  useEffect(() => {
    get_main_category();
    get_sub_category();
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
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const createSeries = Axios.post("http://localhost:3001/api/v1/category/create_series", {
          series: values.series,
          main_category_id: values.main_category_id,
          sub_category_id: values.sub_category_id,
        }, {
          withCredentials: true,
        });
        toast.success("Series Created Successfully");
        console.log(createSeries.data)
        resetForm();
        functionClosePopup();
      } catch (error) {
        toast.error("Error in creating series");
        console.error(error)
      } finally {
        setLoading(false);
      }
    },
  });

  // Filtering sub categories based on main category id
  useEffect(() => {
    if (values.main_category_id) {
      const filtered = subCategories.filter(subCategory => subCategory.main_category_id === values.main_category_id);
      setFilteredSubCategories(filtered);
      console.log(filteredSubCategories);
    } else {
      setFilteredSubCategories([])
    }
  }, [values.main_category_id, subCategories]);

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={functionOpenPopup}
        variant="contained"
        sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
      >
        Add Series
      </Button>
      <Dialog open={open} onClose={functionClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Series
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
                  {mainCategories.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.main_category}
                    </MenuItem>
                  ))}
                </Select>
                {touched.main_category_id && errors.main_category_id && (
                  <FormHelperText>{errors.main_category_id}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={touched.sub_category_id && Boolean(errors.sub_category_id)}
              >
                <InputLabel id="sub-category-label">Sub Category</InputLabel>
                <Select
                  labelId="sub-category-label"
                  id="sub_category_id"
                  name="sub_category_id"
                  value={values.sub_category_id}
                  onChange={handleChange}
                  label='Sub Category'
                  required
                  disabled={!values.main_category_id}
                >
                  <MenuItem value=''>
                    <em>Select a sub category</em>
                    {/* Show Filtered sub categories */}
                  </MenuItem>
                  {filteredSubCategories.map((subcategory, index) => (
                    <MenuItem key={index} value={subcategory._id}>
                      {subcategory.sub_category}
                    </MenuItem>
                  ))}
                </Select>
                {touched.sub_category_id && errors.sub_category_id && (
                  <FormHelperText>{errors.sub_category_id}</FormHelperText>
                )}
              </FormControl>

              <TextField
                label="Series"
                className="rounded-md"
                placeholder="Enter series"
                variant="outlined"
                name="series"
                fullWidth
                value={values.series}
                onChange={handleChange}
                error={touched.series && Boolean(errors.series)}
                helperText={touched.series && errors.series}
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
                disabled={loading}
              >

                {loading ? "SUbmitting..."  : "Submit" }

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
