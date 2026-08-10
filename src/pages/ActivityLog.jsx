import { useMemo, useState } from "react";

import {
  ArrowLeft,
  Activity,
  Search,
  X,
  Filter,
  Upload,
  Files,
  FilePlus2,
  ClipboardList,
  FileCheck2,
  Archive,
  RotateCcw,
  User,
  Settings,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "../App.css";

function ActivityLog({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");

  // =========================================
  // MOCK ACTIVITY DATA
  // =========================================

  const activities = [
    {
      id: 1,
      type: "File Registration",
      title: "New file registered",
      description: "A new departmental file was added to the registry.",
      reference: "FMT/TPC/8.2345/VI",
      user: "Admin Officer",
      department: "TPC Department",
      time: "12 minutes ago",
      date: "08 Aug 2026",
      icon: FilePlus2,
      status: "Completed",
    },
    {
      id: 2,
      type: "File Request",
      title: "File requested",
      description: "A physical file was requested for departmental review.",
      reference: "FMT/TPC/7.6542/III",
      user: "Michael Adeyemi",
      department: "Planning Unit",
      time: "34 minutes ago",
      date: "08 Aug 2026",
      icon: ClipboardList,
      status: "Pending",
    },
    {
      id: 3,
      type: "Document Upload",
      title: "Document uploaded",
      description: "A digital copy was attached to an existing file.",
      reference: "FMT/TPC/4.8321/I",
      user: "Admin Officer",
      department: "TPC Department",
      time: "1 hour ago",
      date: "08 Aug 2026",
      icon: Upload,
      status: "Completed",
    },
    {
      id: 4,
      type: "File Return",
      title: "File returned",
      description: "A previously requested file was returned to the registry.",
      reference: "FMT/TPC/3.9211/II",
      user: "Amina Yusuf",
      department: "Transport Planning",
      time: "2 hours ago",
      date: "08 Aug 2026",
      icon: RotateCcw,
      status: "Completed",
    },
    {
      id: 5,
      type: "Archive",
      title: "File archived",
      description: "A completed departmental record was moved to archive.",
      reference: "FMT/TPC/4.8321/I",
      user: "Records Officer",
      department: "TPC Department",
      time: "3 hours ago",
      date: "08 Aug 2026",
      icon: Archive,
      status: "Completed",
    },
    {
      id: 6,
      type: "Document Upload",
      title: "Document uploaded",
      description: "Annual planning report was uploaded to the document repository.",
      reference: "FMT/TPC/6.7742/I",
      user: "Admin Officer",
      department: "TPC Department",
      time: "4 hours ago",
      date: "08 Aug 2026",
      icon: FileCheck2,
      status: "Completed",
    },
    {
      id: 7,
      type: "File Request",
      title: "File request approved",
      description: "A request to access a departmental file was approved.",
      reference: "FMT/TPC/9.1123/II",
      user: "Head of TPC",
      department: "TPC Department",
      time: "5 hours ago",
      date: "08 Aug 2026",
      icon: ClipboardList,
      status: "Approved",
    },
    {
      id: 8,
      type: "User Activity",
      title: "User profile updated",
      description: "Departmental officer account information was updated.",
      reference: "—",
      user: "System Administrator",
      department: "Administration",
      time: "Yesterday",
      date: "07 Aug 2026",
      icon: User,
      status: "Completed",
    },
    {
      id: 9,
      type: "File Registration",
      title: "File information updated",
      description: "The metadata of an existing departmental file was updated.",
      reference: "FMT/TPC/5.4312/V",
      user: "Admin Officer",
      department: "TPC Department",
      time: "Yesterday",
      date: "07 Aug 2026",
      icon: FileCheck2,
      status: "Completed",
    },
    {
      id: 10,
      type: "System",
      title: "Records settings updated",
      description: "System configuration settings were changed.",
      reference: "—",
      user: "System Administrator",
      department: "Administration",
      time: "Yesterday",
      date: "07 Aug 2026",
      icon: Settings,
      status: "Completed",
    },
  ];

  // =========================================
  // FILTER OPTIONS
  // =========================================

  const actionTypes = [
    "All",
    "File Registration",
    "File Request",
    "Document Upload",
    "File Return",
    "Archive",
    "User Activity",
    "System",
  ];

  const users = [
    "All",
    ...new Set(activities.map((activity) => activity.user)),
  ];

  // =========================================
  // FILTER ACTIVITIES
  // =========================================

  const filteredActivities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return activities.filter((activity) => {
      const matchesSearch =
        !query ||
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.reference.toLowerCase().includes(query) ||
        activity.user.toLowerCase().includes(query) ||
        activity.department.toLowerCase().includes(query);

      const matchesAction =
        actionFilter === "All" ||
        activity.type === actionFilter;

      const matchesUser =
        userFilter === "All" ||
        activity.user === userFilter;

      return (
        matchesSearch &&
        matchesAction &&
        matchesUser
      );
    });
  }, [searchQuery, actionFilter, userFilter]);

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = () => {
    setSearchQuery("");
    setActionFilter("All");
    setUserFilter("All");
  };

  const hasFilters =
    searchQuery ||
    actionFilter !== "All" ||
    userFilter !== "All";

  // =========================================
  // SUMMARY
  // =========================================

  const totalActivities = activities.length;

  const completedActivities = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const pendingActivities = activities.filter(
    (activity) => activity.status === "Pending"
  ).length;

  const fileActivities = activities.filter(
    (activity) =>
      activity.type === "File Registration" ||
      activity.type === "File Request" ||
      activity.type === "File Return"
  ).length;

  // =========================================
  // ACTIVITY ICON CLASS
  // =========================================

  const getActivityClass = (type) => {
    switch (type) {
      case "File Registration":
        return "activity-blue";

      case "File Request":
        return "activity-orange";

      case "Document Upload":
        return "activity-purple";

      case "File Return":
        return "activity-green";

      case "Archive":
        return "activity-gray";

      case "User Activity":
        return "activity-indigo";

      case "System":
        return "activity-dark";

      default:
        return "activity-blue";
    }
  };

  return (
    <div className="activity-page">

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
              <Activity size={22} />
            </div>

            <div>

              <span className="dashboard-eyebrow">
                TPC RECORDS MANAGEMENT
              </span>

              <h1>
                Activity Log
              </h1>

              <p>
                Monitor registrations, requests, uploads and
                movements across the records system.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <section className="activity-summary-grid">

        <div className="activity-summary-card">

          <div className="activity-summary-icon activity-summary-blue">
            <Activity size={19} />
          </div>

          <div>
            <span>Total Activities</span>
            <strong>{totalActivities}</strong>
            <small>Recorded activities</small>
          </div>

        </div>


        <div className="activity-summary-card">

          <div className="activity-summary-icon activity-summary-green">
            <FileCheck2 size={19} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedActivities}</strong>
            <small>Successfully completed</small>
          </div>

        </div>


        <div className="activity-summary-card">

          <div className="activity-summary-icon activity-summary-orange">
            <ClipboardList size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingActivities}</strong>
            <small>Require attention</small>
          </div>

        </div>


        <div className="activity-summary-card">

          <div className="activity-summary-icon activity-summary-purple">
            <Files size={19} />
          </div>

          <div>
            <span>File Activities</span>
            <strong>{fileActivities}</strong>
            <small>File movements</small>
          </div>

        </div>

      </section>


      {/* =========================================
          SEARCH + FILTERS
      ========================================= */}

      <section className="activity-toolbar">

        <div className="activity-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search activity, user, file reference..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />

          {searchQuery && (
            <button
              type="button"
              className="activity-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

        </div>


        <div className="activity-filters">

          <div className="activity-filter-wrapper">

            <Filter size={15} />

            <select
              value={actionFilter}
              onChange={(e) =>
                setActionFilter(e.target.value)
              }
            >
              {actionTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type === "All"
                    ? "All Activities"
                    : type}
                </option>
              ))}
            </select>

          </div>


          <div className="activity-filter-wrapper">

            <User size={15} />

            <select
              value={userFilter}
              onChange={(e) =>
                setUserFilter(e.target.value)
              }
            >
              {users.map((user) => (
                <option
                  key={user}
                  value={user}
                >
                  {user === "All"
                    ? "All Users"
                    : user}
                </option>
              ))}
            </select>

          </div>


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
          ACTIVITY TABLE
      ========================================= */}

      <section className="module-card activity-log-card">

        <div className="module-card-header">

          <div>

            <h2>
              System Activity
            </h2>

            <p>
              A chronological record of actions performed
              within the TPC records system.
            </p>

          </div>

          <span className="record-count">
            {filteredActivities.length} of {activities.length} activities
          </span>

        </div>


        <div className="module-table-wrapper">

          <table className="module-table activity-table">

            <thead>

              <tr>

                <th>
                  Activity
                </th>

                <th>
                  File Reference
                </th>

                <th>
                  User
                </th>

                <th>
                  Date
                </th>

                <th>
                  Status
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredActivities.map((activity) => {

                const Icon = activity.icon;

                return (
                  <tr key={activity.id}>

                    {/* ACTIVITY */}

                    <td>

                      <div className="activity-table-main">

                        <div
                          className={`activity-table-icon ${getActivityClass(
                            activity.type
                          )}`}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="activity-table-content">

                          <strong>
                            {activity.title}
                          </strong>

                          <span>
                            {activity.description}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* REFERENCE */}

                    <td>

                      {activity.reference !== "—" ? (
                        <span className="activity-reference">
                          {activity.reference}
                        </span>
                      ) : (
                        <span className="activity-no-reference">
                          System activity
                        </span>
                      )}

                    </td>


                    {/* USER */}

                    <td>

                      <div className="activity-user">

                        <div className="activity-user-avatar">
                          {activity.user
                            .split(" ")
                            .map((name) => name[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>

                          <strong>
                            {activity.user}
                          </strong>

                          <span>
                            {activity.department}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* DATE */}

                    <td>

                      <div className="activity-date">

                        <strong>
                          {activity.date}
                        </strong>

                        <span>
                          {activity.time}
                        </span>

                      </div>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`activity-status ${
                          activity.status === "Completed"
                            ? "activity-status-completed"
                            : activity.status === "Pending"
                            ? "activity-status-pending"
                            : "activity-status-approved"
                        }`}
                      >
                        {activity.status}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <button
                        type="button"
                        className="table-more-button"
                        title="View activity"
                      >
                        <Eye size={16} />
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>


          {/* =========================================
              EMPTY STATE
          ========================================= */}

          {filteredActivities.length === 0 && (

            <div className="module-empty-state">

              <Search size={30} />

              <h3>
                No activity found
              </h3>

              <p>
                No activities match your search or selected
                filters.
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


        {/* =========================================
            PAGINATION
        ========================================= */}

        {filteredActivities.length > 0 && (

          <div className="activity-pagination">

            <span>
              Showing <strong>1</strong>–<strong>{filteredActivities.length}</strong> of{" "}
              <strong>{filteredActivities.length}</strong> activities
            </span>

            <div className="pagination-buttons">

              <button
                type="button"
                disabled
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                className="pagination-active"
              >
                1
              </button>

              <button
                type="button"
                disabled
                title="Next page"
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        )}

      </section>


      {/* =========================================
          INFORMATION PANEL
      ========================================= */}

      <div className="activity-info">

        <div className="activity-info-icon">
          <Activity size={18} />
        </div>

        <div>

          <strong>
            System Audit Trail
          </strong>

          <span>
            The activity log provides a chronological record
            of important actions performed within the TPC
            records management system, helping officers
            monitor file movements and maintain accountability.
          </span>

        </div>

      </div>

    </div>
  );
}

export default ActivityLog;