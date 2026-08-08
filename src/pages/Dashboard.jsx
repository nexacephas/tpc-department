import { useState } from "react";

import {
  Files,
  FileCheck2,
  FolderOpen,
  Clock3,
  Search,
  Plus,
  ArrowUpRight,
  ArrowRight,
  ClipboardList,
  User,
  Upload,
  FileText,
  MoreHorizontal,
  Settings,
  Archive,
  Activity,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import FileRegistration from "./FileRegistration";
import FileRequests from "./FileRequests";
import FileRegistry from "./FileRegistry";

import "../App.css";

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  // =========================================
  // MOCK FILE DATA
  // =========================================

  const recentFiles = [
    {
      reference: "FMT/TPC/8.2345/VI",
      title: "Correspondence with the Ministry of Finance",
      category: "Correspondence",
      status: "Active",
      date: "08 Aug 2026",
    },
    {
      reference: "FMT/TPC/9.1123/II",
      title: "Abuja Transport Planning Documents",
      category: "Planning",
      status: "Active",
      date: "08 Aug 2026",
    },
    {
      reference: "FMT/TPC/4.8321/I",
      title: "Road Development Projects",
      category: "Project",
      status: "Archived",
      date: "07 Aug 2026",
    },
    {
      reference: "FMT/TPC/7.6542/III",
      title: "Transport Coordination Meetings",
      category: "Meeting",
      status: "Active",
      date: "06 Aug 2026",
    },
    {
      reference: "FMT/TPC/5.4312/V",
      title: "Interstate Transport Coordination",
      category: "Coordination",
      status: "Active",
      date: "05 Aug 2026",
    },
  ];

  // =========================================
  // ACTIVITY DATA
  // =========================================

  const activities = [
    {
      icon: Upload,
      title: "New file registered",
      description: "FMT/TPC/8.2345/VI",
      time: "12 minutes ago",
    },
    {
      icon: ClipboardList,
      title: "File requested",
      description: "FMT/TPC/7.6542/III",
      time: "34 minutes ago",
    },
    {
      icon: FileCheck2,
      title: "Document uploaded",
      description: "Road Development Projects",
      time: "1 hour ago",
    },
    {
      icon: User,
      title: "File returned",
      description: "FMT/TPC/3.9211/II",
      time: "2 hours ago",
    },
  ];

  // =========================================
  // STATISTICS
  // =========================================

  const statistics = [
    {
      title: "Total Registered Files",
      value: "1,284",
      description: "All departmental records",
      icon: Files,
      trend: "+8.2%",
      type: "blue",
    },
    {
      title: "Digital Records",
      value: "842",
      description: "Files with digital copies",
      icon: FileCheck2,
      trend: "+12.4%",
      type: "purple",
    },
    {
      title: "Active Files",
      value: "936",
      description: "Currently in circulation",
      icon: FolderOpen,
      trend: "+4.7%",
      type: "green",
    },
    {
      title: "Pending Requests",
      value: "12",
      description: "Files requested by officers",
      icon: Clock3,
      trend: "Attention",
      type: "orange",
    },
  ];

  // =========================================
  // SEARCH
  // =========================================

  const filteredFiles = recentFiles.filter((file) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      file.reference.toLowerCase().includes(query) ||
      file.title.toLowerCase().includes(query) ||
      file.category.toLowerCase().includes(query)
    );
  });

  // =========================================
  // SHARED PAGE LAYOUT
  // =========================================

  const renderPage = (content) => {
    return (
      <div className="app-layout">

        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onNavigate={handleNavigation}
          onLogout={onLogout}
        />

        <div
          className={`app-main ${
            collapsed ? "app-main-expanded" : ""
          }`}
        >
          <Topbar />

          <main className="dashboard-content">
            {content}
          </main>
        </div>

      </div>
    );
  };

  // =========================================
  // PLACEHOLDER PAGE
  // =========================================

  const PlaceholderPage = ({
    icon: Icon,
    title,
    description,
  }) => {
    return (
      <div className="placeholder-page">

        <div className="placeholder-icon">
          <Icon size={32} />
        </div>

        <span className="dashboard-eyebrow">
          TPC RECORDS MANAGEMENT
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

        <span className="placeholder-badge">
          Module coming next
        </span>

      </div>
    );
  };

  // =========================================
  // FILE REQUESTS
  // =========================================

  if (activePage === "requests") {
    return renderPage(
      <FileRequests
        onNavigate={handleNavigation}
      />
    );
  }

  // =========================================
  // FILE REGISTRY
  // =========================================

  if (activePage === "registry") {
    return renderPage(
      <FileRegistry
        onNavigate={handleNavigation}
      />
    );
  }

  // =========================================
  // FILE REGISTRATION
  // =========================================

  if (activePage === "register-file") {
    return renderPage(
      <FileRegistration
        onNavigate={handleNavigation}
      />
    );
  }

  // =========================================
  // DOCUMENTS
  // =========================================

  if (activePage === "documents") {
    return renderPage(
      <PlaceholderPage
        icon={FileText}
        title="Documents"
        description="Browse and manage digital copies of departmental records."
      />
    );
  }

  // =========================================
  // ARCHIVE
  // =========================================

  if (activePage === "archive") {
    return renderPage(
      <PlaceholderPage
        icon={Archive}
        title="Archive"
        description="Access archived departmental records and historical files."
      />
    );
  }

  // =========================================
  // ACTIVITY
  // =========================================

  if (activePage === "activity") {
    return renderPage(
      <PlaceholderPage
        icon={Activity}
        title="Activity Log"
        description="Track registrations, requests, uploads and file movements."
      />
    );
  }

  // =========================================
  // SETTINGS
  // =========================================

  if (activePage === "settings") {
    return renderPage(
      <PlaceholderPage
        icon={Settings}
        title="Settings"
        description="Configure your TPC records management preferences."
      />
    );
  }

  // =========================================
  // MAIN DASHBOARD
  // =========================================

  return renderPage(
    <>
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="dashboard-header">

        <div>

          <span className="dashboard-eyebrow">
            TRANSPORT PLANNING & COORDINATION
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Monitor departmental records, file requests
            and recent activity.
          </p>

        </div>

        <button
          type="button"
          className="register-file-button"
          onClick={() =>
            handleNavigation("register-file")
          }
        >
          <Plus size={18} />

          <span>
            Register New File
          </span>

        </button>

      </div>


      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="dashboard-search">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search by file reference, title or subject..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
        />

        <span className="search-shortcut">
          Ctrl + K
        </span>

      </div>


      {/* =========================================
          STATISTICS
      ========================================= */}

      <section className="stats-grid">

        {statistics.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              className="stat-card"
              key={stat.title}
            >

              <div className="stat-card-top">

                <div
                  className={`stat-icon stat-icon-${stat.type}`}
                >
                  <Icon size={21} />
                </div>

                <span
                  className={`stat-trend stat-trend-${stat.type}`}
                >
                  {stat.trend}

                  {stat.type !== "orange" && (
                    <ArrowUpRight size={13} />
                  )}

                </span>

              </div>

              <div className="stat-card-value">
                {stat.value}
              </div>

              <h3>
                {stat.title}
              </h3>

              <p>
                {stat.description}
              </p>

            </div>
          );

        })}

      </section>


      {/* =========================================
          TWO COLUMN AREA
      ========================================= */}

      <section className="dashboard-columns">

        {/* =========================================
            RECENT FILES
        ========================================= */}

        <div className="dashboard-panel recent-files-panel">

          <div className="panel-header">

            <div>

              <h2>
                Recent Files
              </h2>

              <p>
                Recently registered departmental records.
              </p>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                handleNavigation("registry")
              }
            >
              View all

              <ArrowRight size={15} />

            </button>

          </div>


          <div className="files-table-wrapper">

            <table className="files-table">

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
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredFiles.map((file) => (

                  <tr key={file.reference}>

                    <td>

                      <div className="file-reference">

                        <div className="file-table-icon">
                          <FileText size={16} />
                        </div>

                        <span>
                          {file.reference}
                        </span>

                      </div>

                    </td>

                    <td>
                      <span className="file-title">
                        {file.title}
                      </span>
                    </td>

                    <td>
                      <span className="file-category">
                        {file.category}
                      </span>
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

                      <span className="file-date">
                        {file.date}
                      </span>

                    </td>

                    <td>

                      <button
                        type="button"
                        className="file-more-button"
                        title="More options"
                      >
                        <MoreHorizontal size={17} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>


            {filteredFiles.length === 0 && (

              <div className="empty-search-state">

                <Search size={28} />

                <h3>
                  No files found
                </h3>

                <p>
                  Try another reference, title or category.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* =========================================
            RECENT ACTIVITY
        ========================================= */}

        <div className="dashboard-panel activity-panel">

          <div className="panel-header">

            <div>

              <h2>
                Recent Activity
              </h2>

              <p>
                Latest activity in the records system.
              </p>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                handleNavigation("activity")
              }
            >
              View all

              <ArrowRight size={15} />

            </button>

          </div>


          <div className="activity-list">

            {activities.map((activity, index) => {

              const Icon = activity.icon;

              return (
                <div
                  className="activity-item"
                  key={index}
                >

                  <div className="activity-icon">
                    <Icon size={17} />
                  </div>

                  <div className="activity-content">

                    <strong>
                      {activity.title}
                    </strong>

                    <span>
                      {activity.description}
                    </span>

                  </div>

                  <time>
                    {activity.time}
                  </time>

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =========================================
          QUICK ACTIONS
      ========================================= */}

      <section className="quick-actions">

        <div className="quick-action-header">

          <div>

            <h2>
              Quick Actions
            </h2>

            <p>
              Common records management tasks.
            </p>

          </div>

        </div>


        <div className="quick-action-grid">

          {/* REGISTER FILE */}

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              handleNavigation("register-file")
            }
          >

            <div className="quick-action-icon">
              <Plus size={20} />
            </div>

            <div>

              <strong>
                Register New File
              </strong>

              <span>
                Add a new departmental record
              </span>

            </div>

            <ArrowRight size={17} />

          </button>


          {/* FILE REQUESTS */}

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              handleNavigation("requests")
            }
          >

            <div className="quick-action-icon">
              <ClipboardList size={20} />
            </div>

            <div>

              <strong>
                File Requests
              </strong>

              <span>
                Review pending file requests
              </span>

            </div>

            <ArrowRight size={17} />

          </button>


          {/* DOCUMENTS */}

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              handleNavigation("documents")
            }
          >

            <div className="quick-action-icon">
              <FileText size={20} />
            </div>

            <div>

              <strong>
                Documents
              </strong>

              <span>
                Browse uploaded documents
              </span>

            </div>

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

    </>
  );
}

export default Dashboard;