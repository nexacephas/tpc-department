import { useState } from "react";

import {
  ArrowLeft,
  FileText,
  Search,
  Upload,
  Download,
  Eye,
  MoreHorizontal,
  FileCheck2,
  FileType,
  Image,
  X,
  CalendarDays,
  User,
} from "lucide-react";

import "../App.css";

function Documents({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // =========================================
  // MOCK DOCUMENT DATA
  // =========================================

  const documents = [
    {
      id: 1,
      name: "National Transport Policy Review.pdf",
      reference: "FMT/TPC/3.9211/II",
      type: "PDF",
      category: "Policy",
      uploadedBy: "Admin Officer",
      date: "08 Aug 2026",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Abuja Transport Planning Documents.docx",
      reference: "FMT/TPC/9.1123/II",
      type: "DOCX",
      category: "Planning",
      uploadedBy: "Admin Officer",
      date: "08 Aug 2026",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Road Development Projects.pdf",
      reference: "FMT/TPC/4.8321/I",
      type: "PDF",
      category: "Project",
      uploadedBy: "Planning Officer",
      date: "07 Aug 2026",
      size: "4.7 MB",
    },
    {
      id: 4,
      name: "Transport Coordination Minutes.docx",
      reference: "FMT/TPC/7.6542/III",
      type: "DOCX",
      category: "Meeting",
      uploadedBy: "Admin Officer",
      date: "06 Aug 2026",
      size: "950 KB",
    },
    {
      id: 5,
      name: "Transport Planning Chart.png",
      reference: "FMT/TPC/6.7742/I",
      type: "PNG",
      category: "Reports",
      uploadedBy: "Planning Officer",
      date: "05 Aug 2026",
      size: "1.2 MB",
    },
    {
      id: 6,
      name: "Interstate Transport Coordination.pdf",
      reference: "FMT/TPC/5.4312/V",
      type: "PDF",
      category: "Coordination",
      uploadedBy: "Admin Officer",
      date: "04 Aug 2026",
      size: "3.1 MB",
    },
  ];

  // =========================================
  // FILTER DOCUMENTS
  // =========================================

  const filteredDocuments = documents.filter((document) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      document.name.toLowerCase().includes(query) ||
      document.reference.toLowerCase().includes(query) ||
      document.category.toLowerCase().includes(query) ||
      document.uploadedBy.toLowerCase().includes(query);

    const matchesType =
      typeFilter === "All" ||
      document.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("All");
  };

  // =========================================
  // DOCUMENT ICON
  // =========================================

  const getDocumentIcon = (type) => {
    if (type === "PDF") {
      return FileText;
    }

    if (type === "PNG" || type === "JPG") {
      return Image;
    }

    return FileType;
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
              <FileText size={22} />
            </div>

            <div>

              <span className="dashboard-eyebrow">
                TPC RECORDS MANAGEMENT
              </span>

              <h1>
                Documents
              </h1>

              <p>
                Browse and manage digital copies of departmental records.
              </p>

            </div>

          </div>

        </div>

        <button
          type="button"
          className="primary-button"
        >
          <Upload size={17} />
          Upload Document
        </button>

      </div>


      {/* =========================================
          DOCUMENT STATISTICS
      ========================================= */}

      <section className="registry-summary-grid">

        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-blue">
            <FileText size={19} />
          </div>

          <div>
            <span>Total Documents</span>
            <strong>842</strong>
          </div>

        </div>


        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-red">
            <FileCheck2 size={19} />
          </div>

          <div>
            <span>PDF Documents</span>
            <strong>524</strong>
          </div>

        </div>


        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-purple">
            <FileType size={19} />
          </div>

          <div>
            <span>Office Documents</span>
            <strong>276</strong>
          </div>

        </div>


        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-green">
            <Upload size={19} />
          </div>

          <div>
            <span>Uploaded This Month</span>
            <strong>42</strong>
          </div>

        </div>

      </section>


      {/* =========================================
          SEARCH + FILTERS
      ========================================= */}

      <section className="registry-toolbar">

        <div className="registry-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search documents, references or uploaded by..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />

          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

        </div>


        <div className="registry-filters">

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >

            <option value="All">
              All File Types
            </option>

            <option value="PDF">
              PDF
            </option>

            <option value="DOCX">
              DOCX
            </option>

            <option value="PNG">
              Images
            </option>

          </select>


          {(searchQuery || typeFilter !== "All") && (
            <button
              type="button"
              className="clear-filter-button"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}

        </div>

      </section>


      {/* =========================================
          DOCUMENT TABLE
      ========================================= */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Digital Documents
            </h2>

            <p>
              Digital copies associated with registered departmental files.
            </p>

          </div>

          <span className="record-count">
            {filteredDocuments.length} of {documents.length} documents
          </span>

        </div>


        <div className="module-table-wrapper">

          <table className="module-table documents-table">

            <thead>

              <tr>

                <th>
                  Document
                </th>

                <th>
                  File Reference
                </th>

                <th>
                  Type
                </th>

                <th>
                  Uploaded By
                </th>

                <th>
                  Date
                </th>

                <th>
                  Size
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredDocuments.map((document) => {

                const DocumentIcon =
                  getDocumentIcon(document.type);

                return (
                  <tr key={document.id}>

                    <td>

                      <div className="document-name-cell">

                        <div className="document-file-icon">
                          <DocumentIcon size={17} />
                        </div>

                        <div className="document-name-info">

                          <strong>
                            {document.name}
                          </strong>

                          <span>
                            {document.category}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="registry-reference-text">
                        {document.reference}
                      </span>

                    </td>


                    <td>

                      <span
                        className={`document-type-badge document-type-${document.type.toLowerCase()}`}
                      >
                        {document.type}
                      </span>

                    </td>


                    <td>

                      <div className="document-user-cell">

                        <div className="document-user-icon">
                          <User size={13} />
                        </div>

                        <span>
                          {document.uploadedBy}
                        </span>

                      </div>

                    </td>


                    <td>

                      <div className="table-date">

                        <CalendarDays size={14} />

                        {document.date}

                      </div>

                    </td>


                    <td>

                      <span className="file-type-text">
                        {document.size}
                      </span>

                    </td>


                    <td>

                      <div className="document-actions">

                        <button
                          type="button"
                          className="document-action-button"
                          title="View document"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          className="document-action-button"
                          title="Download document"
                        >
                          <Download size={16} />
                        </button>

                        <button
                          type="button"
                          className="table-more-button"
                          title="More options"
                        >
                          <MoreHorizontal size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>


          {/* =========================================
              EMPTY STATE
          ========================================= */}

          {filteredDocuments.length === 0 && (

            <div className="module-empty-state">

              <Search size={30} />

              <h3>
                No documents found
              </h3>

              <p>
                No documents match your search or selected filter.
              </p>

              <button
                type="button"
                className="secondary-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =========================================
          INFORMATION
      ========================================= */}

      <div className="registry-info">

        <div className="registry-info-icon">
          <FileCheck2 size={18} />
        </div>

        <div>

          <strong>
            Digital Document Management
          </strong>

          <span>
            Digital documents are linked to their official
            departmental file reference, making records easier
            to retrieve and manage.
          </span>

        </div>

      </div>

    </div>
  );
}

export default Documents;