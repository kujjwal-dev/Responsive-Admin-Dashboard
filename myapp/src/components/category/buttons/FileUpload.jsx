import React, { useRef, useState } from 'react';
import './FileUpload.css';
import { MdFileUpload } from "react-icons/md"
import { IoIosClose } from "react-icons/io";
import { FaFile } from "react-icons/fa6";
import axios from 'axios';

const FileUpload = () => {
  const inputRef = useRef();

  // State variables for tracking file-related information
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('select');

  // Handle file change event
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Function to trigger input file dialog
  const onChooseFile = () => {
    inputRef.current.click();
  };

  //Function to clear selected file and reset state
  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("Select");
  };

  //Function to handle file upload
  const handleFileUpload = async () => {
    //if upload is already done , clear and return
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      //set upload status to  uploading
      setUploadStatus("uploading")

      //create formdata and append selected file
      const formdata = new FormData();
      formdata.append("file", selectedFile);

      //Make an asynchronous POST request to the server for file upload
      const response = await axios.post(
        "", formdata, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      }
      );
      setUploadStatus("done")
    }

    catch (error) {
      setUploadStatus("select")

    }
  }

  return (
    <div className="flex justify-center items-center">
      {/* File input element with a reference */}
      <input
        ref={inputRef}
        type='file'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Button to trigger the file input dialog */}
      {!selectedFile && (
        <button className='file-btn' onClick={onChooseFile}>
          <span className='material-symbols-outlined'><MdFileUpload /></span> Upload File
        </button>
      )}

      {/* Display file information and progress when file is selected */}
      {selectedFile && (
        <>
          <div className='file-card'>
            <span className='material-symbols-outlined icon'><FaFile /></span>
            <div className='file-info'>
              <div style={{ flex: 1 }}>
                {/* Display file name and progress bar */}
                <h6>{selectedFile.name}</h6>
                <div className='progress-bg'>
                  <div className='progress' style={{ width: `${progress}%` }} />
                </div>
              </div>
              {/* Display clear button or upload progress/checkmark */}
              <button onClick={clearFileInput}>
                <span className='material-symbols-outlined close-icon'><IoIosClose /></span>
              </button>
            </div>
          </div>

          {/* Button to finalize upload or clear selection */}
          <button className='upload-btn' onClick={handleFileUpload}>
            {uploadStatus === "select" || uploadStatus === "uploading" ? "Upload" : "Done"}
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
