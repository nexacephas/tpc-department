import { useState } from "react";

import {
  ArrowLeft,
  ClipboardList,
  Search,
  Plus,
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  CalendarDays,
  MoreHorizontal,
  X,
} from "lucide-react";

import "../App.css";

function FileRequests({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const [requestForm, setRequestForm] = useState({
    reference: "",
    purpose: "",
    requestedBy: "",
    requiredDate: "",
    notes: "",
  });

  // =========================================
  // MOCK REQUEST DATA
  // =========================================

  const requests = [
    {
      id: 1,
      reference: "FMT/TPC/8.2345/VI",
      subject: "Correspondence with the Ministry of Finance",
      requestedBy: "Admin Officer",
      purpose: "Review previous correspondence",
      date: "08 Aug 2026",
      requiredDate: "10 Aug 2026",
      status: "Pending",
    },
    {
      id: 2,
      reference: "FMT/TPC/7.6542/III",
      subject: "Transport Coordination Meetings",
      requestedBy: "Planning Officer",
      purpose: "Prepare meeting documentation",
      date: "08 Aug 2026",
      requiredDate: "09 Aug 2026",
      status: "Approved",
    },
    {
      id: 3,
      reference: "FMT/TPC/9.1123/II",
      subject: "Abuja Transport Planning Documents",
      requestedBy: "Senior Planning Officer",
      purpose: "Planning review",
      date: "07 Aug 2026",
      requiredDate: "11 Aug 2026",
      status: "Pending",
    },
    {
      id: 4,
      reference: "FMT/TPC/4.8321/I",
      subject: "Road Development Projects",
      requestedBy: "Project Officer",
      purpose: "Project documentation",
      date: "06 Aug 2026",
      requiredDate: "08 Aug 2026",
      status: "Returned",
    },
    {
      id: 5,
      reference: "FMT/TPC/5.4312/V",
      subject: "Interstate Transport Coordination",
      requestedBy: "Transport Officer",
      purpose: "Reference for coordination",
      date: "05 Aug 2026",
      requiredDate: "12 Aug 2026",
      status: "Approved",
    },
  ];

  // =========================================
  // FORM HANDLING
  // =========================================

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setRequestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();

    console.log("File request submitted:", requestForm);

    setShowRequestForm(false);

    setRequestForm({
      reference: "",
      purpose: "",
      requestedBy: "",
      requiredDate: "",
      notes: "",
    });
  };

  // =========================================
  // SEARCH
  // =========================================

  const filteredRequests = requests.filter((request) => {
    const query = searchQuery.toLowerCase();

    return (
      request.reference.toLowerCase().includes(query) ||
      request.subject.toLowerCase().includes(query) ||
      request.requestedBy.toLowerCase().includes(query) ||
      request.status.toLowerCase().includes(query)
    );
  });

  // =========================================
  // STATUS ICON
  // =========================================

  const getStatusIcon = (status) => {
    if (status === "Approved") {
      return <CheckCircle2 size={14} />;
    }

    if (status === "Returned") {
      return <XCircle size={14} />;
    }

    return <Clock3 size={14} />;
  };

  return (
    <div className="module-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="module-header">

        <div className="module-header-left">

          <button
            type="button"
            className="back-button"
            onClick={() => onNavigate("dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <div className="module-title-row">

            <div className="module-title-icon">
              <ClipboardList size={22} />
            </div>

            <div>
              <span className="dashboard-eyebrow">
                TPC RECORDS MANAGEMENT
              </span>

              <h1>
                File Requests
              </h1>

              <p>
                Request, review and track departmental files.
              </p>
            </div>

          </div>

        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => setShowRequestForm(true)}
        >
          <Plus size={17} />
          Request a File
        </button>

      </div>

      {/* =========================================
          REQUEST SUMMARY
      ========================================= */}

      <section className="request-summary-grid">

        <div className="request-summary-card">

          <div className="request-summary-icon request-summary-blue">
            <ClipboardList size={19} />
          </div>

          <div>
            <span>Total Requests</span>
            <strong>24</strong>
          </div>

        </div>

        <div className="request-summary-card">

          <div className="request-summary-icon request-summary-orange">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>12</strong>
          </div>

        </div>

        <div className="request-summary-card">

          <div className="request-summary-icon request-summary-green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Approved</span>
            <strong>9</strong>
          </div>

        </div>

        <div className="request-summary-card">

          <div className="request-summary-icon request-summary-red">
            <XCircle size={19} />
          </div>

          <div>
            <span>Returned</span>
            <strong>3</strong>
          </div>

        </div>

      </section>

      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="module-toolbar">

        <div className="module-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search requests by reference, subject or officer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchQuery("")}
            >
              <X size={15} />
            </button>
          )}

        </div>

      </div>

      {/* =========================================
          REQUEST TABLE
      ========================================= */}

      <section className="module-card">

        <div className="module-card-header">

          <div>
            <h2>
              File Request Register
            </h2>

            <p>
              Track requests made for departmental records.
            </p>
          </div>

          <span className="record-count">
            {filteredRequests.length} requests
          </span>

        </div>

        <div className="module-table-wrapper">

          <table className="module-table">

            <thead>
              <tr>

                <th>
                  File Reference
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Requested By
                </th>

                <th>
                  Request Date
                </th>

                <th>
                  Required By
                </th>

                <th>
                  Status
                </th>

                <th>
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredRequests.map((request) => (

                <tr key={request.id}>

                  <td>

                    <div className="registry-reference">

                      <div className="registry-file-icon">
                        <FileText size={16} />
                      </div>

                      <strong>
                        {request.reference}
                      </strong>

                    </div>

                  </td>

                  <td>

                    <div className="table-primary-text">
                      {request.subject}
                    </div>

                    <div className="table-secondary-text">
                      {request.purpose}
                    </div>

                  </td>

                  <td>

                    <div className="table-user">

                      <div className="table-user-icon">
                        <User size={14} />
                      </div>

                      <span>
                        {request.requestedBy}
                      </span>

                    </div>

                  </td>

                  <td>
                    <div className="table-date">
                      <CalendarDays size={14} />
                      {request.date}
                    </div>
                  </td>

                  <td>
                    <div className="table-date">
                      <CalendarDays size={14} />
                      {request.requiredDate}
                    </div>
                  </td>

                  <td>

                    <span
                      className={`request-status request-status-${request.status.toLowerCase()}`}
                    >
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>

                  </td>

                  <td>

                    <button
                      type="button"
                      className="table-more-button"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredRequests.length === 0 && (

            <div className="module-empty-state">

              <ClipboardList size={30} />

              <h3>
                No requests found
              </h3>

              <p>
                Try searching with another reference,
                subject or officer name.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =========================================
          REQUEST MODAL
      ========================================= */}

      {showRequestForm && (

        <div className="modal-overlay">

          <div className="request-modal">

            <div className="modal-header">

              <div>

                <span className="dashboard-eyebrow">
                  TPC RECORDS MANAGEMENT
                </span>

                <h2>
                  Request a File
                </h2>

                <p>
                  Submit a request for a departmental record.
                </p>

              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={() => setShowRequestForm(false)}
              >
                <X size={19} />
              </button>

            </div>

            <form
              className="request-form"
              onSubmit={handleRequestSubmit}
            >

              <div className="form-group">

                <label>
                  File Reference
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <FileText size={17} />

                  <input
                    type="text"
                    name="reference"
                    value={requestForm.reference}
                    onChange={handleFormChange}
                    placeholder="e.g. FMT/TPC/8.2345/VI"
                    required
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Purpose of Request
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <ClipboardList size={17} />

                  <input
                    type="text"
                    name="purpose"
                    value={requestForm.purpose}
                    onChange={handleFormChange}
                    placeholder="Why is this file required?"
                    required
                  />

                </div>

              </div>

              <div className="request-form-grid">

                <div className="form-group">

                  <label>
                    Requested By
                    <span className="required">*</span>
                  </label>

                  <div className="input-wrapper">

                    <User size={17} />

                    <input
                      type="text"
                      name="requestedBy"
                      value={requestForm.requestedBy}
                      onChange={handleFormChange}
                      placeholder="Officer name"
                      required
                    />

                  </div>

                </div>

                <div className="form-group">

                  <label>
                    Required By
                    <span className="required">*</span>
                  </label>

                  <div className="input-wrapper">

                    <CalendarDays size={17} />

                    <input
                      type="date"
                      name="requiredDate"
                      value={requestForm.requiredDate}
                      onChange={handleFormChange}
                      required
                    />

                  </div>

                </div>

              </div>

              <div className="form-group">

                <label>
                  Additional Notes
                </label>

                <textarea
                  className="request-notes"
                  name="notes"
                  value={requestForm.notes}
                  onChange={handleFormChange}
                  placeholder="Add any additional information..."
                  rows="4"
                />

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowRequestForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  <ClipboardList size={17} />
                  Submit Request
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default FileRequests;