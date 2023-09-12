import React, { useState } from "react";
import "../styles/UploadPage.css";
import Header from "../components/Header";

export const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div className="upload">
      <Header />
      <div className="overlap-group">
        <div className="overlap">
          <div className="text-wrapper-2">Instructions</div>
          <p className="p">
            1. Create Excel file with extension (.xls or .xlsx)
          </p>
        </div>

        <div className="overlap-2">
          <div className="div-wrapper">
            <label className="text-wrapper-3">
              Choose File
              <input
                type="file"
                accept=".xls, .xlsx"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="text-wrapper-4">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </div>
        </div>
        <div className="overlap-3">
          <div className="text-wrapper-5">Upload</div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
