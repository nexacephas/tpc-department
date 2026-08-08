import {
  LayoutDashboard,
  Files,
  ClipboardList,
  FileText,
  Archive,
  Activity,
  Settings,
  LogOut,
  FolderLock,
  ChevronLeft,
  Plus,
} from "lucide-react";

import "../App.css";

function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
  onNavigate,
  onLogout,
}) {
  const navigation = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      page: "dashboard",
    },
    {
      label: "File Registry",
      icon: Files,
      page: "registry",
    },
    {
      label: "File Requests",
      icon: ClipboardList,
      page: "requests",
    },
    {
      label: "Documents",
      icon: FileText,
      page: "documents",
    },
    {
      label: "Archive",
      icon: Archive,
      page: "archive",
    },
    {
      label: "Activity Log",
      icon: Activity,
      page: "activity",
    },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);

    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside
      className={`app-sidebar ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* =========================================
          SIDEBAR HEADER
      ========================================= */}

      <div className="sidebar-header">

        <div className="sidebar-logo">
          <FolderLock size={20} />
        </div>

        {!collapsed && (
          <div className="sidebar-brand">
            <strong>TPC Records</strong>
            <span>Ministry of Transportation</span>
          </div>
        )}

      </div>


      {/* =========================================
          NAVIGATION
      ========================================= */}

      <nav className="sidebar-navigation">

        <span className="sidebar-section-label">
          {!collapsed && "WORKSPACE"}
        </span>


        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.page}
              type="button"
              className={`sidebar-nav-item ${
                activePage === item.page
                  ? "sidebar-nav-active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation(item.page)
              }
              title={
                collapsed
                  ? item.label
                  : undefined
              }
            >
              <Icon size={18} />

              {!collapsed && (
                <span>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}


        {/* =========================================
            QUICK ACTION
        ========================================= */}

        <button
          type="button"
          className="sidebar-add-record"
          onClick={() =>
            onNavigate
              ? onNavigate("register-file")
              : null
          }
          title={
            collapsed
              ? "Add New Record"
              : undefined
          }
        >
          <Plus size={18} />

          {!collapsed && (
            <span>
              Add New Record
            </span>
          )}
        </button>


        {/* =========================================
            SYSTEM
        ========================================= */}

        <span className="sidebar-section-label sidebar-settings-label">
          {!collapsed && "SYSTEM"}
        </span>


        <button
          type="button"
          className={`sidebar-nav-item ${
            activePage === "settings"
              ? "sidebar-nav-active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("settings")
          }
          title={
            collapsed
              ? "Settings"
              : undefined
          }
        >
          <Settings size={18} />

          {!collapsed && (
            <span>
              Settings
            </span>
          )}
        </button>

      </nav>


      {/* =========================================
          SIDEBAR BOTTOM
      ========================================= */}

      <div className="sidebar-bottom">

        {/* USER */}

        {!collapsed && (
          <div className="sidebar-user">

            <div className="sidebar-user-avatar">
              AD
            </div>

            <div className="sidebar-user-info">

              <strong>
                Admin Officer
              </strong>

              <span>
                TPC Department
              </span>

            </div>

          </div>
        )}


        {/* SIGN OUT */}

        <button
          type="button"
          className="sidebar-nav-item sidebar-logout"
          onClick={handleLogout}
          title="Sign out"
        >
          <LogOut size={18} />

          {!collapsed && (
            <span>
              Sign out
            </span>
          )}
        </button>


        {/* COLLAPSE */}

        <button
          type="button"
          className="sidebar-collapse-button"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          <ChevronLeft
            size={16}
            className={
              collapsed
                ? "rotate-icon"
                : ""
            }
          />

          {!collapsed && (
            <span>
              Collapse sidebar
            </span>
          )}
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;