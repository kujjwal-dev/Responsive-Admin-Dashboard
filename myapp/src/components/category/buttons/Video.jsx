import React, { useContext, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CategoryContext } from '../../../context/CategoryContext';
import Axios from 'axios';
import toast from "react-hot-toast";

const initialValues = {
  title: "",
  description: "",
  video_url: "",
  video_thumbnail: "",
  content_source_type: "",
  content_category: "",
  class_grade: "",
  content_video_id: [
    { "1080p": "" },
    { "720p": "" },
    { "480p": "" },
    { "360p": "" },
  ],
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
    content_source_type: Yup.string().required("Content Source Type is required"),
  content_category: Yup.string().required("Content Category is required"),
  class_grade: Yup.string().required("Class Grade is required"),
});

const Video = () => {
  const { selectedSeries } = useContext(CategoryContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const { values, handleChange, handleSubmit, errors, touched , resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // populate content_video_id with video_url for each quality level
      const updatedVideoIds = initialValues.content_video_id.map((item) => {
        const quality = Object.keys(item)[0];
        return { [quality]: values.video_url };
      });
      setLoading(true);
      try {
        const createVideoContent = await Axios.post('http://localhost:3001/api/v1/video_content/video_content_create', {
          title : values.title,
          description : values.description,
          video_url : values.video_url,
          video_thumbnail : values.video_thumbnail,
          content_source_type : values.content_source_type,
          class_grade : values.class_grade,
          content_category : values.content_category,
          content_type : "video",
          content_video_id: values.content_video_id,
          main_category_id :  selectedSeries.main_category_id ,
          sub_category_id:   selectedSeries.sub_category_id  ,
          series_id: selectedSeries._id  ,
        }, {
          withCredentials: true,
        });
        
        toast.success("Video Content Created");
        console.log(createVideoContent.data);
        resetForm();
        handleClose();
      } catch (error) {
         console.error("Failed to create video content")
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ backgroundColor: "#475be8", "&:hover": { backgroundColor: "#3a4db7" } }}
      >
        Add Video
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Video Upload
          <IconButton onClick={handleClose} style={{ float: "right" }}>
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
                placeholder="Enter YouTube Video URL"
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
                label="Content Source Type"
                className="rounded-md"
                placeholder="Enter Content Source Type"
                variant="outlined"
                name="content_source_type"
                fullWidth
                value={values.content_source_type}
                onChange={handleChange}
                error={touched.content_source_type && Boolean(errors.content_source_type)}
                helperText={touched.content_source_type && errors.content_source_type}
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
              <TextField
                label="Class Grade"
                className="rounded-md"
                placeholder="Enter Class Grade"
                variant="outlined"
                name="class_grade"
                fullWidth
                value={values.class_grade}
                onChange={handleChange}
                error={touched.class_grade && Boolean(errors.class_grade)}
                helperText={touched.class_grade && errors.class_grade}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#475be8", "&:hover": { backgroundColor: "#3a4db7" } }}
                disabled={loading}
              >
                { loading ? "Submitting..." : "Submit" }
              </Button>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          {/* Additional actions can be added here */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Video;
