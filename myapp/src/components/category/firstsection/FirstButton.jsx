import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const initialValues = {
  main_category: "",
};

const validationSchema = Yup.object({
  main_category: Yup.string().required("Main Category is required"),
});

//----------------------------------------------------------------------------------------------------

const FirstButton = () => {
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const functionOpenPopup = () => {
    setOpen(true);
  };

  const functionClosePopup = () => {
    setOpen(false);
  };

  const { values, handleChange, handleSubmit, errors, touched , resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setLoading(true);
      try {
        const createMainCategory = await Axios.post("http://localhost:3001/api/v1/category/create_main_category",{
          main_category: values.main_category
        },{
          withCredentials:true,
        });
        toast.success("Main category created successfully");
        console.log(createMainCategory.data);
        resetForm();
        functionClosePopup();
      } catch (error) {
        toast.error("Failed to create category")
        console.error(error)
      } finally{
        setLoading(false)
      }
    }
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={functionOpenPopup}
        variant="contained"
        sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
      >
        Add Main Category
      </Button>
      <Dialog open={open} onClose={functionClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Main Category
          <IconButton onClick={functionClosePopup} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                label="Main Category"
                className="rounded-md"
                placeholder="Enter main category"
                variant="outlined"
                name="main_category"
                fullWidth
                value={values.main_category}
                onChange={handleChange}
                error={touched.main_category && Boolean(errors.main_category)}
                helperText={touched.main_category && errors.main_category}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
                disabled={loading}
              >
               {loading ? "Submitting...." : "Submit" }
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
