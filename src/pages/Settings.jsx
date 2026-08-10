import { useState } from "react";

import {
  Settings as SettingsIcon,
  User,
  Building2,
  Bell,
  Shield,
  Archive,
  Save,
  RotateCcw,
  Lock,
  Mail,
  CheckCircle2,
} from "lucide-react";

import "../App.css";

function Settings() {
  const [settings, setSettings] = useState({
    fullName: "Admin Officer",
    email: "admin@transport.gov.ng",
    department: "Transport Planning & Coordination",
    employeeId: "TPC-001",
    emailNotifications: true,
    requestNotifications: true,
    activityNotifications: true,
    autoArchive: false,
    archivePeriod: "5",
    sessionTimeout: "30",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Settings saved:", settings);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    setSettings({
      fullName: "Admin Officer",
      email: "admin@transport.gov.ng",
      department: "Transport Planning & Coordination",
      employeeId: "TPC-001",
      emailNotifications: true,
      requestNotifications: true,
      activityNotifications: true,
      autoArchive: false,
      archivePeriod: "5",
      sessionTimeout: "30",
    });

    setSaved(false);
  };

  return (
    <div className="settings-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="module-header">

        <div className="module-header-left">

          <div className="module-title-row">

            <div className="module-title-icon">
              <SettingsIcon size={22} />
            </div>

            <div>

              <span className="dashboard-eyebrow">
                TPC RECORDS MANAGEMENT
              </span>

              <h1>
                Settings
              </h1>

              <p>
                Manage your account and records management preferences.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          SETTINGS CONTENT
      ========================================= */}

      <form
        className="settings-content"
        onSubmit={handleSave}
      >

        {/* =========================================
            PROFILE
        ========================================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <User size={18} />
            </div>

            <div>
              <h2>
                Profile & Account
              </h2>

              <p>
                Manage your account information and department details.
              </p>
            </div>

          </div>


          <div className="settings-grid">

            <div className="settings-field">

              <label>
                Full Name
              </label>

              <div className="settings-input">

                <User size={16} />

                <input
                  type="text"
                  name="fullName"
                  value={settings.fullName}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="settings-field">

              <label>
                Email Address
              </label>

              <div className="settings-input">

                <Mail size={16} />

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="settings-field">

              <label>
                Department
              </label>

              <div className="settings-input">

                <Building2 size={16} />

                <input
                  type="text"
                  name="department"
                  value={settings.department}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="settings-field">

              <label>
                Employee ID
              </label>

              <div className="settings-input">

                <Shield size={16} />

                <input
                  type="text"
                  name="employeeId"
                  value={settings.employeeId}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            NOTIFICATIONS
        ========================================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <Bell size={18} />
            </div>

            <div>
              <h2>
                Notifications
              </h2>

              <p>
                Choose which system activities you want to be notified about.
              </p>
            </div>

          </div>


          <div className="settings-options">

            <label className="settings-option">

              <div className="settings-option-content">

                <strong>
                  Email Notifications
                </strong>

                <span>
                  Receive important system updates by email.
                </span>

              </div>

              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />

              <span className="settings-toggle"></span>

            </label>


            <label className="settings-option">

              <div className="settings-option-content">

                <strong>
                  File Request Notifications
                </strong>

                <span>
                  Get notified when officers submit or update file requests.
                </span>

              </div>

              <input
                type="checkbox"
                name="requestNotifications"
                checked={settings.requestNotifications}
                onChange={handleChange}
              />

              <span className="settings-toggle"></span>

            </label>


            <label className="settings-option">

              <div className="settings-option-content">

                <strong>
                  Activity Notifications
                </strong>

                <span>
                  Receive notifications about important records activity.
                </span>

              </div>

              <input
                type="checkbox"
                name="activityNotifications"
                checked={settings.activityNotifications}
                onChange={handleChange}
              />

              <span className="settings-toggle"></span>

            </label>

          </div>

        </section>


        {/* =========================================
            RECORD MANAGEMENT
        ========================================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <Archive size={18} />
            </div>

            <div>
              <h2>
                Records Management
              </h2>

              <p>
                Configure how departmental records are maintained.
              </p>
            </div>

          </div>


          <div className="settings-options">

            <label className="settings-option">

              <div className="settings-option-content">

                <strong>
                  Automatic Archiving
                </strong>

                <span>
                  Automatically move inactive files to the archive.
                </span>

              </div>

              <input
                type="checkbox"
                name="autoArchive"
                checked={settings.autoArchive}
                onChange={handleChange}
              />

              <span className="settings-toggle"></span>

            </label>

          </div>


          <div className="settings-grid settings-grid-small">

            <div className="settings-field">

              <label>
                Archive After
              </label>

              <select
                name="archivePeriod"
                value={settings.archivePeriod}
                onChange={handleChange}
              >
                <option value="1">
                  1 Year
                </option>

                <option value="3">
                  3 Years
                </option>

                <option value="5">
                  5 Years
                </option>

                <option value="10">
                  10 Years
                </option>

              </select>

              <span className="settings-help">
                Applies when automatic archiving is enabled.
              </span>

            </div>

          </div>

        </section>


        {/* =========================================
            SECURITY
        ========================================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <Lock size={18} />
            </div>

            <div>
              <h2>
                Security
              </h2>

              <p>
                Manage session and account security preferences.
              </p>
            </div>

          </div>


          <div className="settings-grid settings-grid-small">

            <div className="settings-field">

              <label>
                Session Timeout
              </label>

              <select
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleChange}
              >
                <option value="15">
                  15 Minutes
                </option>

                <option value="30">
                  30 Minutes
                </option>

                <option value="60">
                  1 Hour
                </option>

                <option value="120">
                  2 Hours
                </option>

              </select>

              <span className="settings-help">
                Automatically sign out after inactivity.
              </span>

            </div>

          </div>


          <button
            type="button"
            className="secondary-button settings-password-button"
          >
            <Lock size={16} />
            Change Password
          </button>

        </section>


        {/* =========================================
            ACTIONS
        ========================================= */}

        <div className="settings-actions">

          {saved && (
            <div className="settings-saved-message">

              <CheckCircle2 size={17} />

              Settings saved successfully.

            </div>
          )}

          <button
            type="button"
            className="secondary-button"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            <Save size={17} />
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default Settings;