import { useState } from "react";

import {
  FolderLock,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // =========================================
  // LOGIN / REGISTER
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Prototype login
      setIsAuthenticated(true);
    } else {
      // Prototype registration
      setIsLogin(true);
      setShowPassword(false);
    }
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLogin(true);
    setShowPassword(false);
  };

  // =========================================
  // DASHBOARD
  // =========================================

  if (isAuthenticated) {
    return (
      <Dashboard
        onLogout={handleLogout}
      />
    );
  }

  // =========================================
  // AUTHENTICATION PAGE
  // =========================================

  return (
    <div className="auth-page">

      {/* LEFT BRANDING */}

      <section className="auth-brand">

        <div className="brand-content">

          <div className="auth-logo">
            <FolderLock size={28} />
          </div>

          <div className="auth-brand-title">

            <span>
              MINISTRY OF TRANSPORTATION
            </span>

            <h1>
              Transport Planning
              <br />
              & Coordination
            </h1>

          </div>

          <div className="brand-description">

            <h2>
              Digital Records Management
            </h2>

            <p>
              A secure workspace for managing, locating
              and tracking departmental records and
              documents.
            </p>

          </div>

          <div className="security-note">

            <ShieldCheck size={18} />

            <div>

              <strong>
                Authorized Access Only
              </strong>

              <span>
                This system is intended for authorized
                departmental personnel.
              </span>

            </div>

          </div>

        </div>

        <div className="auth-brand-footer">

          <span>
            TPC Records Management System
          </span>

          <span>
            v1.0 Prototype
          </span>

        </div>

      </section>


      {/* AUTH FORM */}

      <section className="auth-form-section">

        <div className="auth-form-container">

          <div className="mobile-auth-logo">
            <FolderLock size={25} />
          </div>

          <div className="auth-heading">

            <span className="auth-eyebrow">
              TPC RECORDS MANAGEMENT
            </span>

            <h2>
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h2>

            <p>
              {isLogin
                ? "Sign in to access the TPC digital records system."
                : "Register your details to access the records system."}
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="form-group">

                <label>
                  Full Name
                </label>

                <div className="input-wrapper">

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />

                </div>

              </div>
            )}


            <div className="form-group">

              <label>
                {isLogin
                  ? "Staff ID or Email"
                  : "Staff ID"}
              </label>

              <div className="input-wrapper">

                <Mail size={17} />

                <input
                  type="text"
                  placeholder={
                    isLogin
                      ? "Enter your staff ID or email"
                      : "Enter your staff ID"
                  }
                  required
                />

              </div>

            </div>


            {!isLogin && (
              <div className="form-group">

                <label>
                  Department
                </label>

                <div className="input-wrapper">

                  <input
                    type="text"
                    value="Transport Planning & Coordination"
                    readOnly
                  />

                </div>

              </div>
            )}


            <div className="form-group">

              <div className="label-row">

                <label>
                  Password
                </label>

                {isLogin && (
                  <button
                    type="button"
                    className="forgot-button"
                  >
                    Forgot password?
                  </button>
                )}

              </div>

              <div className="input-wrapper">

                <LockKeyhole size={17} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>


            {!isLogin && (
              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <div className="input-wrapper">

                  <LockKeyhole size={17} />

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    required
                  />

                </div>

              </div>
            )}


            {isLogin && (
              <label className="remember-me">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>
            )}


            <button
              type="submit"
              className="auth-submit"
            >

              <span>
                {isLogin
                  ? "Sign in"
                  : "Create account"}
              </span>

              <ArrowRight size={18} />

            </button>

          </form>


          <div className="auth-switch">

            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setShowPassword(false);
              }}
            >
              {isLogin
                ? "Request access"
                : "Sign in"}
            </button>

          </div>


          <div className="auth-footer">

            <span>
              © 2026 Ministry of Transportation
            </span>

            <span>
              Privacy & Security
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default App;