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
  video_url: "",
  video_thumbnail: "",
  content_category: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  video_url: Yup.string()
    .url("Invalid URL")
    .required("Video URL is required"),
  video_thumbnail: Yup.string()
    .url("Invalid URL")
    .required("Video Thumbnail is required"),
  content_category: Yup.string().required("Content Category is required"),
});

const Video = () => {
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
        Add Video
      </Button>
      <Dialog open={open} onClose={functionClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Video Upload
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
                label="Video URL"
                className="rounded-md"
                placeholder="Enter Video URL"
                variant="outlined"
                name="video_url"
                fullWidth
                value={values.video_url}
                onChange={handleChange}
                error={touched.video_url && Boolean(errors.video_url)}
                helperText={touched.video_url && errors.video_url}
              />
              <TextField
                label="Video Thumbnail"
                className="rounded-md"
                placeholder="Enter Video Thumbnail URL"
                variant="outlined"
                name="video_thumbnail"
                fullWidth
                value={values.video_thumbnail}
                onChange={handleChange}
                error={touched.video_thumbnail && Boolean(errors.video_thumbnail)}
                helperText={touched.video_thumbnail && errors.video_thumbnail}
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

export default Video;
