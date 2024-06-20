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
import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  Name: "",
  Phone: "",
  Email: "",
  Address: "",
  Pancard: "",

};

const validationSchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  Phone: Yup.string()
    .matches(/^\d{10}$/, "phone number must be 10 digits")
    .required("Phone Number is required"),
  Email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  Address: Yup.string().required("Address is required"),
  Pancard: Yup.string().required("Pancard is required"),

});

const ModeratorForm = () => {
  const [open, setOpen] = React.useState(false);
  const functionOpenPopup = () => {
    setOpen(true);
  };
  const functionClosePopup = () => {
    setOpen(false);
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={functionOpenPopup} color="primary" variant="contained" sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}>
        Moderator Form
      </Button>
      <Dialog open={open} onClose={functionClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Moderator Registration
          <IconButton onClick={functionClosePopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent  >
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>


              <TextField
                label="Name"
                className="rounded-md"
                placeholder="Enter your name"
                variant="outlined"
                name="Name"
                fullWidth
                value={values.Name}
                onChange={handleChange}
                error={touched.Name && Boolean(errors.Name)}
                helperText={touched.Name && errors.Name}
              />
              <TextField
                label="Phone"
                className="rounded-md"
                placeholder="Enter your phone no"
                variant="outlined"
                name="Phone"
                fullWidth
                value={values.Phone}
                onChange={handleChange}
                error={touched.Phone && Boolean(errors.Phone)}
                helperText={touched.Phone && errors.Phone}
              />
              <TextField
                label="Email"
                className="rounded-md"
                placeholder="Enter your email"
                variant="outlined"
                name="Email"
                fullWidth
                value={values.Email}
                onChange={handleChange}
                error={touched.Email && Boolean(errors.Email)}
                helperText={touched.Email && errors.Email}

              />
              <TextField
                label="Address"
                className="rounded-md"
                placeholder="Enter your address"
                variant="outlined"
                name="Address"
                fullWidth
                value={values.Address}
                onChange={handleChange}
                error={touched.Address && Boolean(errors.Address)}
                helperText={touched.Address && errors.Address}

              />
              <TextField
                label="Pancard"
                className="rounded-md"
                placeholder="Enter your pancard no"
                variant="outlined"
                name="Pancard"
                fullWidth
                value={values.Pancard}
                onChange={handleChange}
                error={touched.Pancard && Boolean(errors.Pancard)}
                helperText={touched.Pancard && errors.Pancard}
              />

              <Button type="submit" color="primary" variant="contained" sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}>
                Submit
              </Button>

            </Stack>
          </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModeratorForm;
