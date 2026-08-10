import { useState } from "react";

import {
  Archive as ArchiveIcon,
  ArrowLeft,
  Search,
  X,
  FileText,
  CalendarDays,
  MapPin,
  User,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ArchiveRestore,
  MoreHorizontal,
  FolderOpen,
} from "lucide-react";

import "../App.css";

function Archive({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // =========================================
  // MOCK ARCHIVED FILES
  // =========================================

  const archivedFiles = [
    {
      id: 1,
      reference: "FMT/TPC/4.8321/I",
      subject: "Road Development Projects",
      category: "Project",
      archiveDate: "07 Aug 2026",
      archiveLocation: "Archive Room B-04",
      archivedBy: "Admin Officer",
      retentionPeriod: "10 Years",
      retentionStatus: "Within Retention",
      status: "Archived",
    },
    {
      id: 2,
      reference: "FMT/TPC/2.4812/IV",
      subject: "Departmental Administrative Records",
      category: "Administration",
      archiveDate: "01 Aug 2026",
      archiveLocation: "Archive Room A-02",
      archivedBy: "Records Officer",
      retentionPeriod: "7 Years",
      retentionStatus: "Within Retention",
      status: "Archived",
    },
    {
      id: 3,
      reference: "FMT/TPC/1.7294/III",
      subject: "Previous Transport Coordination Reports",
      category: "Reports",
      archiveDate: "15 Jul 2026",
      archiveLocation: "Archive Room B-07",
      archivedBy: "Admin Officer",
      retentionPeriod: "5 Years",
      retentionStatus: "Within Retention",
      status: "Archived",
    },
    {
      id: 4,
      reference: "FMT/TPC/3.1182/V",
      subject: "Completed Interstate Transport Projects",
      category: "Project",
      archiveDate: "28 Jun 2026",
      archiveLocation: "Archive Room C-03",
      archivedBy: "Records Officer",
      retentionPeriod: "10 Years",
      retentionStatus: "Within Retention",
      status: "Archived",
    },
    {
      id: 5,
      reference: "FMT/TPC/5.6431/II",
      subject: "Historical Correspondence Records",
      category: "Correspondence",
      archiveDate: "10 May 2026",
      archiveLocation: "Archive Room A-09",
      archivedBy: "Admin Officer",
      retentionPeriod: "3 Years",
      retentionStatus: "Review Due",
      status: "Review Due",
    },
    {
      id: 6,
      reference: "FMT/TPC/7.2241/I",
      subject: "Old Departmental Planning Documents",
      category: "Planning",
      archiveDate: "22 Apr 2026",
      archiveLocation: "Archive Room C-11",
      archivedBy: "Records Officer",
      retentionPeriod: "5 Years",
      retentionStatus: "Within Retention",
      status: "Archived",
    },
    {
      id: 7,
      reference: "FMT/TPC/9.4312/VI",
      subject: "Completed Ministry Coordination Files",
      category: "Coordination",
      archiveDate: "18 Mar 2026",
      archiveLocation: "Digital Archive",
      archivedBy: "Admin Officer",
      retentionPeriod: "7 Years",
      retentionStatus: "Within Retention",
      status: "Archived",
    },
    {
      id: 8,
      reference: "FMT/TPC/6.9821/IV",
      subject: "Legacy Transport Policy Records",
      category: "Policy",
      archiveDate: "04 Feb 2026",
      archiveLocation: "Digital Archive",
      archivedBy: "Records Officer",
      retentionPeriod: "10 Years",
      retentionStatus: "Review Due",
      status: "Review Due",
    },
  ];

  // =========================================
  // FILTER OPTIONS
  // =========================================

  const locations = [
    "All",
    "Archive Room A-02",
    "Archive Room A-09",
    "Archive Room B-04",
    "Archive Room B-07",
    "Archive Room C-03",
    "Archive Room C-11",
    "Digital Archive",
  ];

  // =========================================
  // FILTER ARCHIVED FILES
  // =========================================

  const filteredFiles = archivedFiles.filter((file) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      file.reference.toLowerCase().includes(query) ||
      file.subject.toLowerCase().includes(query) ||
      file.category.toLowerCase().includes(query) ||
      file.archiveLocation.toLowerCase().includes(query) ||
      file.archivedBy.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" ||
      file.status === statusFilter;

    const matchesLocation =
      locationFilter === "All" ||
      file.archiveLocation === locationFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation
    );
  });

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setLocationFilter("All");
  };

  const hasFilters =
    searchQuery ||
    statusFilter !== "All" ||
    locationFilter !== "All";

  return (
    <div className="archive-page">

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
              <ArchiveIcon size={22} />
            </div>

            <div>

              <span className="dashboard-eyebrow">
                TPC RECORDS MANAGEMENT
              </span>

              <h1>
                Archive
              </h1>

              <p>
                Access and manage archived departmental records.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          ARCHIVE SUMMARY
      ========================================= */}

      <section className="registry-summary-grid archive-summary-grid">

        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-orange">
            <ArchiveIcon size={19} />
          </div>

          <div>
            <span>Archived Files</span>
            <strong>348</strong>
          </div>

        </div>


        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-blue">
            <FolderOpen size={19} />
          </div>

          <div>
            <span>Physical Archives</span>
            <strong>276</strong>
          </div>

        </div>


        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-purple">
            <FileText size={19} />
          </div>

          <div>
            <span>Digital Archives</span>
            <strong>72</strong>
          </div>

        </div>


        <div className="registry-summary-card">

          <div className="registry-summary-icon registry-orange">
            <AlertTriangle size={19} />
          </div>

          <div>
            <span>Review Due</span>
            <strong>24</strong>
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
            placeholder="Search by reference, subject, location or officer..."
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

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Archive Status
            </option>

            <option value="Archived">
              Archived
            </option>

            <option value="Review Due">
              Review Due
            </option>
          </select>


          {/* LOCATION */}

          <select
            value={locationFilter}
            onChange={(e) =>
              setLocationFilter(e.target.value)
            }
          >
            <option value="All">
              All Locations
            </option>

            {locations
              .filter((location) => location !== "All")
              .map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
          </select>


          {hasFilters && (
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
          ARCHIVED FILES TABLE
      ========================================= */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Archived Records
            </h2>

            <p>
              Departmental files that have been moved to archive.
            </p>

          </div>

          <span className="record-count">
            {filteredFiles.length} of {archivedFiles.length} files
          </span>

        </div>


        <div className="module-table-wrapper">

          <table className="module-table archive-table">

            <thead>

              <tr>

                <th>
                  File Reference
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Archive Date
                </th>

                <th>
                  Archive Location
                </th>

                <th>
                  Retention
                </th>

                <th>
                  Archived By
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

                  {/* REFERENCE */}

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


                  {/* SUBJECT */}

                  <td>

                    <div className="table-primary-text">
                      {file.subject}
                    </div>

                    <span className="archive-category">
                      {file.category}
                    </span>

                  </td>


                  {/* ARCHIVE DATE */}

                  <td>

                    <div className="table-date">

                      <CalendarDays size={14} />

                      {file.archiveDate}

                    </div>

                  </td>


                  {/* LOCATION */}

                  <td>

                    <div className="table-location">

                      {file.archiveLocation === "Digital Archive" ? (
                        <FolderOpen size={14} />
                      ) : (
                        <MapPin size={14} />
                      )}

                      <span>
                        {file.archiveLocation}
                      </span>

                    </div>

                  </td>


                  {/* RETENTION */}

                  <td>

                    <div className="retention-cell">

                      <strong>
                        {file.retentionPeriod}
                      </strong>

                      <span
                        className={
                          file.retentionStatus === "Review Due"
                            ? "retention-warning"
                            : "retention-active"
                        }
                      >
                        {file.retentionStatus}
                      </span>

                    </div>

                  </td>


                  {/* ARCHIVED BY */}

                  <td>

                    <div className="table-user">

                      <div className="table-user-icon">
                        <User size={13} />
                      </div>

                      <span>
                        {file.archivedBy}
                      </span>

                    </div>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`archive-status ${
                        file.status === "Archived"
                          ? "archive-status-active"
                          : "archive-status-review"
                      }`}
                    >

                      {file.status === "Archived" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <AlertTriangle size={13} />
                      )}

                      {file.status}

                    </span>

                  </td>


                  {/* ACTION */}

                  <td>

                    <button
                      type="button"
                      className="table-more-button"
                      title="Archive options"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* =========================================
              EMPTY STATE
          ========================================= */}

          {filteredFiles.length === 0 && (

            <div className="module-empty-state">

              <ArchiveIcon size={30} />

              <h3>
                No archived files found
              </h3>

              <p>
                No archived records match your search
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
          RETENTION INFORMATION
      ========================================= */}

      <section className="archive-retention-info">

        <div className="archive-retention-icon">
          <Clock3 size={19} />
        </div>

        <div className="archive-retention-content">

          <strong>
            Records Retention
          </strong>

          <span>
            Archived records should be retained according
            to their departmental retention period. Records
            marked <strong>Review Due</strong> require
            administrative review before further action.
          </span>

        </div>

      </section>


      {/* =========================================
          ARCHIVE INFORMATION CARDS
      ========================================= */}

      <section className="archive-info-grid">

        <div className="archive-info-card">

          <div className="archive-info-card-icon">
            <ArchiveRestore size={18} />
          </div>

          <div>

            <strong>
              Physical Archives
            </strong>

            <span>
              Physical files are stored in designated
              archive rooms and shelves.
            </span>

          </div>

        </div>


        <div className="archive-info-card">

          <div className="archive-info-card-icon">
            <FolderOpen size={18} />
          </div>

          <div>

            <strong>
              Digital Archives
            </strong>

            <span>
              Digitized records are maintained in the
              department's digital archive.
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Archive;