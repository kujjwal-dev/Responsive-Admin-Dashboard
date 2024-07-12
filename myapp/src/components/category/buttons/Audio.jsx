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
import FileUpload from "./FileUpload";

const initialValues = {
  title: "",
  description: "",
  audio_url: "",
  audio_thumbnail: "",
  content_category: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  audio_url: Yup.string()
    .url("Invalid URL")
    .required("Audio URL is required"),
  audio_thumbnail: Yup.string()
    .url("Invalid URL")
    .required("Audio Thumbnail is required"),
  content_category: Yup.string().required("Content Category is required"),
});

const Audio = () => {
  const [open, setOpen] = useState(false);

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
      <Button
        onClick={functionOpenPopup}
        variant="contained"
        sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
      >
        Add Audio
      </Button>
      <Dialog open={open} onClose={functionClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Audio Upload
          <IconButton onClick={functionClosePopup} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                label="Title"
                className="rounded-md"
                placeholder="Enter Title"
                variant="outlined"
                name="title"
                fullWidth
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                label="Description"
                className="rounded-md"
                placeholder="Enter Description"
                variant="outlined"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <TextField
                label="Audio URL"
                className="rounded-md"
                placeholder="Enter Audio URL"
                variant="outlined"
                name="audio_url"
                fullWidth
                value={values.audio_url}
                onChange={handleChange}
                error={touched.audio_url && Boolean(errors.audio_url)}
                helperText={touched.audio_url && errors.audio_url}
              />
              <TextField
                label="Audio Thumbnail"
                className="rounded-md"
                placeholder="Enter Audio Thumbnail URL"
                variant="outlined"
                name="audio_thumbnail"
                fullWidth
                value={values.audio_thumbnail}
                onChange={handleChange}
                error={touched.audio_thumbnail && Boolean(errors.audio_thumbnail)}
                helperText={touched.audio_thumbnail && errors.audio_thumbnail}
              />
              <TextField
                label="Content Category"
                className="rounded-md"
                placeholder="Enter Content Category"
                variant="outlined"
                name="content_category"
                fullWidth
                value={values.content_category}
                onChange={handleChange}
                error={touched.content_category && Boolean(errors.content_category)}
                helperText={touched.content_category && errors.content_category}
              />
              <FileUpload/>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#475be8", '&:hover': { backgroundColor: "#3a4db7" } }}
              >
                Submit
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

export default Audio;
