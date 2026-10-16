
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
  Sparkles,
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
      label: "AI Document Assistant",
      icon: Sparkles,
      page: "ai-assistant",
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

  const handleAddRecord = () => {
    handleNavigation("register-file");
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`app-sidebar ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* SIDEBAR HEADER */}
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

      {/* NAVIGATION */}
      <nav className="sidebar-navigation">
        <span className="sidebar-section-label">
          {!collapsed && "WORKSPACE"}
        </span>

        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.page;

          return (
            <button
              key={item.page}
              type="button"
              className={`sidebar-nav-item ${
                isActive ? "sidebar-nav-active" : ""
              }`}
              onClick={() => handleNavigation(item.page)}
              title={collapsed ? item.label : undefined}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} />

              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* QUICK ACTION */}
        <button
          type="button"
          className="sidebar-add-record"
          onClick={handleAddRecord}
          title={collapsed ? "Add New Record" : undefined}
          aria-label="Add New Record"
        >
          <Plus size={18} />

          {!collapsed && <span>Add New Record</span>}
        </button>

        {/* SYSTEM */}
        <span className="sidebar-section-label sidebar-settings-label">
          {!collapsed && "SYSTEM"}
        </span>

        <button
          type="button"
          className={`sidebar-nav-item ${
            activePage === "settings" ? "sidebar-nav-active" : ""
          }`}
          onClick={() => handleNavigation("settings")}
          title={collapsed ? "Settings" : undefined}
          aria-label="Settings"
          aria-current={
            activePage === "settings" ? "page" : undefined
          }
        >
          <Settings size={18} />

          {!collapsed && <span>Settings</span>}
        </button>
      </nav>

      {/* SIDEBAR BOTTOM */}
      <div className="sidebar-bottom">
        {/* USER */}
        {!collapsed && (
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">AD</div>

            <div className="sidebar-user-info">
              <strong>Admin Officer</strong>
              <span>TPC Department</span>
            </div>
          </div>
        )}

        {/* SIGN OUT */}
        <button
          type="button"
          className="sidebar-nav-item sidebar-logout"
          onClick={handleLogout}
          title={collapsed ? "Sign out" : undefined}
          aria-label="Sign out"
        >
          <LogOut size={18} />

          {!collapsed && <span>Sign out</span>}
        </button>

        {/* COLLAPSE */}
        <button
          type="button"
          className="sidebar-collapse-button"
          onClick={handleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={
            collapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          aria-expanded={!collapsed}
        >
          <ChevronLeft
            size={16}
            className={collapsed ? "rotate-icon" : ""}
          />

          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
