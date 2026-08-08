import { useState } from "react";

import {
  ArrowLeft,
  Save,
  FileText,
  Hash,
  CalendarDays,
  Building2,
  UserRound,
  FolderOpen,
  MapPin,
  AlignLeft,
  Upload,
  X,
} from "lucide-react";

import "../App.css";

function FileRegistration({ onNavigate }) {
  const [formData, setFormData] = useState({
    referenceNumber: "",
    subject: "",
    category: "",
    fileType: "",
    originatingOffice: "",
    responsibleOfficer: "",
    dateReceived: "",
    physicalLocation: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);

  // =========================================
  // HANDLE INPUT CHANGES
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // HANDLE FILE UPLOAD
  // =========================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI prototype only
    console.log("New record:", {
      ...formData,
      digitalFile: selectedFile,
    });

    setShowSuccess(true);
  };

  // =========================================
  // RESET FORM
  // =========================================

  const handleReset = () => {
    setFormData({
      referenceNumber: "",
      subject: "",
      category: "",
      fileType: "",
      originatingOffice: "",
      responsibleOfficer: "",
      dateReceived: "",
      physicalLocation: "",
      description: "",
    });

    setSelectedFile(null);
  };

  return (
    <div className="file-registration-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <header className="page-header">

        <div className="page-header-left">

          <button
            type="button"
            className="back-button"
            onClick={() => onNavigate("dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <div className="page-title">

            <div className="page-title-icon">
              <FileText size={22} />
            </div>

            <div>
              <h1>
                Add New Record
              </h1>

              <p>
                Create a record for a new departmental file.
              </p>
            </div>

          </div>

        </div>

      </header>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="file-registration-content">

        <form
          className="file-registration-form"
          onSubmit={handleSubmit}
        >

          {/* =========================================
              FILE IDENTIFICATION
          ========================================= */}

          <section className="registration-card">

            <div className="registration-card-header">

              <div className="registration-section-icon">
                <Hash size={18} />
              </div>

              <div>
                <h2>
                  File Identification
                </h2>

                <p>
                  Enter the official identification details
                  of the departmental file.
                </p>
              </div>

            </div>


            <div className="registration-grid">

              {/* Reference Number */}

              <div className="form-group">

                <label>
                  File Reference Number
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <Hash size={17} />

                  <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    placeholder="e.g. FMT/TPC/8.2345/VI"
                    required
                  />

                </div>

                <span className="field-help">
                  Enter the official reference number assigned
                  to the file.
                </span>

              </div>


              {/* Subject */}

              <div className="form-group">

                <label>
                  File Subject
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <FileText size={17} />

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Correspondence with Ministry of Finance"
                    required
                  />

                </div>

              </div>


              {/* Category */}

              <div className="form-group">

                <label>
                  File Category
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <FolderOpen size={17} />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    <option value="Correspondence">
                      Correspondence
                    </option>

                    <option value="Policy">
                      Policy
                    </option>

                    <option value="Planning">
                      Planning
                    </option>

                    <option value="Project">
                      Project
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                    <option value="Administration">
                      Administration
                    </option>

                    <option value="Reports">
                      Reports
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              {/* File Type */}

              <div className="form-group">

                <label>
                  File Type
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <FileText size={17} />

                  <select
                    name="fileType"
                    value={formData.fileType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select file type
                    </option>

                    <option value="Physical">
                      Physical
                    </option>

                    <option value="Digital">
                      Digital
                    </option>

                    <option value="Physical and Digital">
                      Physical & Digital
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </section>


          {/* =========================================
              FILE DETAILS
          ========================================= */}

          <section className="registration-card">

            <div className="registration-card-header">

              <div className="registration-section-icon">
                <Building2 size={18} />
              </div>

              <div>
                <h2>
                  File Details
                </h2>

                <p>
                  Record information about the origin and
                  current responsibility of the file.
                </p>
              </div>

            </div>


            <div className="registration-grid">

              {/* Originating Office */}

              <div className="form-group">

                <label>
                  Originating Office
                </label>

                <div className="input-wrapper">

                  <Building2 size={17} />

                  <input
                    type="text"
                    name="originatingOffice"
                    value={formData.originatingOffice}
                    onChange={handleChange}
                    placeholder="Enter originating office"
                  />

                </div>

              </div>


              {/* Responsible Officer */}

              <div className="form-group">

                <label>
                  Responsible Officer
                </label>

                <div className="input-wrapper">

                  <UserRound size={17} />

                  <input
                    type="text"
                    name="responsibleOfficer"
                    value={formData.responsibleOfficer}
                    onChange={handleChange}
                    placeholder="Enter officer's name"
                  />

                </div>

              </div>


              {/* Date Received */}

              <div className="form-group">

                <label>
                  Date Received
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <CalendarDays size={17} />

                  <input
                    type="date"
                    name="dateReceived"
                    value={formData.dateReceived}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* Physical Location */}

              <div className="form-group">

                <label>
                  Physical Location
                </label>

                <div className="input-wrapper">

                  <MapPin size={17} />

                  <input
                    type="text"
                    name="physicalLocation"
                    value={formData.physicalLocation}
                    onChange={handleChange}
                    placeholder="e.g. Registry Shelf A-12"
                  />

                </div>

              </div>

            </div>


            {/* Description */}

            <div className="form-group">

              <label>
                Description / Notes
              </label>

              <div className="textarea-wrapper">

                <AlignLeft size={17} />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add any relevant information about this file..."
                  rows="5"
                />

              </div>

            </div>

          </section>


          {/* =========================================
              DIGITAL COPY
          ========================================= */}

          <section className="registration-card">

            <div className="registration-card-header">

              <div className="registration-section-icon">
                <Upload size={18} />
              </div>

              <div>

                <h2>
                  Digital Copy
                </h2>

                <p>
                  Attach a digital copy of the file for
                  easier retrieval.
                </p>

              </div>

            </div>


            <div className="file-upload-area">

              {!selectedFile ? (
                <label
                  htmlFor="file-upload"
                  className="file-upload-label"
                >

                  <div className="upload-icon">
                    <Upload size={24} />
                  </div>

                  <div className="upload-text">

                    <strong>
                      Upload a file
                    </strong>

                    <span>
                      PDF, DOC, DOCX, XLS, XLSX or images
                    </span>

                  </div>

                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />

                </label>
              ) : (

                <div className="selected-file">

                  <div className="selected-file-icon">
                    <FileText size={20} />
                  </div>

                  <div className="selected-file-info">

                    <strong>
                      {selectedFile.name}
                    </strong>

                    <span>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>

                  </div>

                  <button
                    type="button"
                    className="remove-file-button"
                    onClick={removeSelectedFile}
                    aria-label="Remove file"
                  >
                    <X size={17} />
                  </button>

                </div>

              )}

            </div>

          </section>


          {/* =========================================
              FORM ACTIONS
          ========================================= */}

          <div className="registration-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={handleReset}
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              <Save size={17} />
              Save Record
            </button>

          </div>

        </form>


        {/* =========================================
            SUCCESS MESSAGE
        ========================================= */}

        {showSuccess && (

          <div className="success-overlay">

            <div className="success-modal">

              <div className="success-icon">
                <Save size={24} />
              </div>

              <h2>
                Record Saved
              </h2>

              <p>
                The file record has been successfully
                added to the TPC records registry.
              </p>

              <div className="success-reference">

                <span>
                  Reference Number
                </span>

                <strong>
                  {formData.referenceNumber}
                </strong>

              </div>

              <div className="success-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setShowSuccess(false);
                    handleReset();
                  }}
                >
                  Add Another
                </button>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => {
                    setShowSuccess(false);
                    onNavigate("dashboard");
                  }}
                >
                  Back to Dashboard
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default FileRegistration;