import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

import "../App.css";

function Topbar() {
  return (
    <header className="app-topbar">

      {/* Search */}

      <div className="topbar-search">

        <Search size={17} />

        <input
          type="text"
          placeholder="Search files, references, documents..."
        />

        <span className="topbar-shortcut">
          Ctrl K
        </span>

      </div>


      {/* Right side */}

      <div className="topbar-actions">

        <button
          type="button"
          className="topbar-icon-button"
          title="Help"
        >
          <HelpCircle size={18} />
        </button>


        <button
          type="button"
          className="topbar-icon-button notification-button"
          title="Notifications"
        >
          <Bell size={18} />

          <span className="notification-dot"></span>
        </button>


        <div className="topbar-divider"></div>


        <button
          type="button"
          className="topbar-profile"
        >

          <div className="topbar-avatar">
            AD
          </div>

          <div className="topbar-user">

            <strong>
              Admin Officer
            </strong>

            <span>
              TPC Department
            </span>

          </div>

          <ChevronDown size={15} />

        </button>

      </div>

    </header>
  );
}

export default Topbar;