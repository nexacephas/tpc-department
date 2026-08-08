import { useState } from "react";

import {
  ArrowLeft,
  Files,
  Search,
  Plus,
  FileText,
  FolderOpen,
  CalendarDays,
  MapPin,
  MoreHorizontal,
  X,
  Eye,
  Archive,
  CheckCircle2,
} from "lucide-react";

import "../App.css";

function FileRegistry({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================
  // MOCK FILE REGISTRY
  // =========================================

  const files = [
    {
      id: 1,
      reference: "FMT/TPC/8.2345/VI",
      subject: "Correspondence with the Ministry of Finance",
      category: "Correspondence",
      fileType: "Physical & Digital",
      status: "Active",
      dateReceived: "08 Aug 2026",
      location: "Registry Shelf A-12",
    },
    {
      id: 2,
      reference: "FMT/TPC/9.1123/II",
      subject: "Abuja Transport Planning Documents",
      category: "Planning",
      fileType: "Digital",
      status: "Active",
      dateReceived: "08 Aug 2026",
      location: "Digital Archive",
    },
    {
      id: 3,
      reference: "FMT/TPC/4.8321/I",
      subject: "Road Development Projects",
      category: "Project",
      fileType: "Physical",
      status: "Archived",
      dateReceived: "07 Aug 2026",
      location: "Archive Room B-04",
    },
    {
      id: 4,
      reference: "FMT/TPC/7.6542/III",
      subject: "Transport Coordination Meetings",
      category: "Meeting",
      fileType: "Physical & Digital",
      status: "Active",
      dateReceived: "06 Aug 2026",
      location: "Registry Shelf C-08",
    },
    {
      id: 5,
      reference: "FMT/TPC/5.4312/V",
      subject: "Interstate Transport Coordination",
      category: "Coordination",
      fileType: "Digital",
      status: "Active",
      dateReceived: "05 Aug 2026",
      location: "Digital Archive",
    },
    {
      id: 6,
      reference: "FMT/TPC/3.9211/II",
      subject: "National Transport Policy Review",
      category: "Policy",
      fileType: "Physical & Digital",
      status: "Active",
      dateReceived: "04 Aug 2026",
      location: "Registry Shelf B-15",
    },
    {
      id: 7,
      reference: "FMT/TPC/6.7742/I",
      subject: "Annual Transport Planning Report",
      category: "Reports",
      fileType: "Digital",
      status: "Active",
      dateReceived: "03 Aug 2026",
      location: "Digital Archive",
    },
    {
      id: 8,
      reference: "FMT/TPC/2.4812/IV",
      subject: "Departmental Administrative Records",
      category: "Administration",
      fileType: "Physical",
      status: "Archived",
      dateReceived: "01 Aug 2026",
      location: "Archive Room A-02",
    },
  ];

  // =========================================
  // FILTERS
  // =========================================

  const filteredFiles = files.filter((file) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      file.reference.toLowerCase().includes(query) ||
      file.subject.toLowerCase().includes(query) ||
      file.category.toLowerCase().includes(query) ||
      file.location.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === "All" ||
      file.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      file.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  // =========================================
  // CATEGORY LIST
  // =========================================

  const categories = [
    "All",
    "Correspondence",
    "Planning",
    "Project",
    "Meeting",
    "Coordination",
    "Policy",
    "Reports",
    "Administration",
  ];

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setStatusFilter("All");
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
              <Files size={22} />
            </div>

            <div>

              <span className="dashboard-eyebrow">
                TPC RECORDS MANAGEMENT
              </span>

              <h1>
                File Registry
              </h1>

              <p>
                Search and manage registered departmental files.
              </p>

            </div>

          </div>

        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => onNavigate("register-file")}
        >
          <Plus size={17} />
          Register New File
        </button>

      </div>

      {/* =========================================
          REGISTRY STATISTICS
      ========================================= */}

      <section className="registry-summary-grid">

        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-blue">
            <Files size={19} />
          </div>

          <div>
            <span>Total Files</span>
            <strong>1,284</strong>
          </div>

        </div>

        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Active Files</span>
            <strong>936</strong>
          </div>

        </div>

        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-purple">
            <FileText size={19} />
          </div>

          <div>
            <span>Digital Records</span>
            <strong>842</strong>
          </div>

        </div>

        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-orange">
            <Archive size={19} />
          </div>

          <div>
            <span>Archived</span>
            <strong>348</strong>
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
            placeholder="Search by reference number, subject, category or location..."
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
            >
              <X size={15} />
            </button>
          )}

        </div>

        <div className="registry-filters">

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Archived">
              Archived
            </option>
          </select>

          {(searchQuery ||
            categoryFilter !== "All" ||
            statusFilter !== "All") && (
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
          RESULTS
      ========================================= */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Registered Files
            </h2>

            <p>
              All departmental records registered in the system.
            </p>

          </div>

          <span className="record-count">
            {filteredFiles.length} of {files.length} files
          </span>

        </div>

        <div className="module-table-wrapper">

          <table className="module-table registry-table">

            <thead>

              <tr>

                <th>
                  File Reference
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Category
                </th>

                <th>
                  File Type
                </th>

                <th>
                  Date Received
                </th>

                <th>
                  Location
                </th>

                <th>
                  Status
                </th>

                <th>
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredFiles.map((file) => (

                <tr key={file.id}>

                  <td>

                    <div className="registry-reference">

                      <div className="registry-file-icon">
                        <FileText size={16} />
                      </div>

                      <strong>
                        {file.reference}
                      </strong>

                    </div>

                  </td>

                  <td>

                    <div className="table-primary-text">
                      {file.subject}
                    </div>

                  </td>

                  <td>

                    <span className="category-badge">
                      {file.category}
                    </span>

                  </td>

                  <td>

                    <span className="file-type-text">
                      {file.fileType}
                    </span>

                  </td>

                  <td>

                    <div className="table-date">

                      <CalendarDays size={14} />

                      {file.dateReceived}

                    </div>

                  </td>

                  <td>

                    <div className="table-location">

                      {file.location === "Digital Archive" ? (
                        <FolderOpen size={14} />
                      ) : (
                        <MapPin size={14} />
                      )}

                      <span>
                        {file.location}
                      </span>

                    </div>

                  </td>

                  <td>

                    <span
                      className={`file-status ${
                        file.status === "Active"
                          ? "status-active"
                          : "status-archived"
                      }`}
                    >
                      {file.status}
                    </span>

                  </td>

                  <td>

                    <button
                      type="button"
                      className="table-more-button"
                      title="View file"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredFiles.length === 0 && (

            <div className="module-empty-state">

              <Search size={30} />

              <h3>
                No files found
              </h3>

              <p>
                No registered files match your search
                or selected filters.
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
          REGISTRY INFORMATION
      ========================================= */}

      <div className="registry-info">

        <div className="registry-info-icon">
          <FolderOpen size={18} />
        </div>

        <div>

          <strong>
            Digital File Registry
          </strong>

          <span>
            Use the search above to quickly locate a
            departmental file using its official reference
            number, subject or physical location.
          </span>

        </div>

      </div>

    </div>
  );
}

export default FileRegistry;