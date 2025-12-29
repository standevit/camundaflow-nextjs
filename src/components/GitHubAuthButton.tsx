"use client";

import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface GitHubAuthButtonProps {
  session: any;
}

export default function GitHubAuthButton({ session }: GitHubAuthButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.auth-dropdown')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const handleGitHubSignIn = async () => {
    await signIn("github", { redirectTo: "/dashboard" });
  };

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
    setShowDropdown(false);
  };

  return (
    <div className="auth-dropdown" style={{ position: "relative" }}>
      {session?.user ? (
        <>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #667eea",
              padding: 0,
              cursor: "pointer",
              overflow: "hidden",
              transition: "transform 0.2s",
              background: session.user.image ? "transparent" : "#667eea",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            title={session.user.name || session.user.email || "User"}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ color: "white", fontSize: "1.2rem" }}>
                {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
              </span>
            )}
          </button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 0.5rem)",
                right: 0,
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                padding: "0.5rem",
                minWidth: "180px",
                zIndex: 1000,
                border: "1px solid #e1e4e8",
              }}
            >
              <div
                style={{
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid #e1e4e8",
                  marginBottom: "0.5rem",
                }}
              >
                <div style={{ fontWeight: "600", fontSize: "0.875rem", marginBottom: "0.125rem" }}>
                  {session.user.name || "User"}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#586069" }}>
                  {session.user.email}
                </div>
              </div>

              <Link
                href="/dashboard"
                onClick={() => setShowDropdown(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "transparent",
                  color: "#24292e",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  transition: "background-color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f6f8fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 015.75 7.5h-2.5A1.75 1.75 0 011.5 5.75v-2.5zM3.25 3a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zM1.5 10.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75v-2.5zm1.75-.25a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zM8.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5A1.75 1.75 0 018.5 5.75v-2.5zm1.75-.25a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zM8.5 10.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75v-2.5zm1.75-.25a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5z"></path>
                </svg>
                dashboard
              </Link>

              <button
                onClick={handleSignOut}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  marginTop: "0.25rem",
                  backgroundColor: "transparent",
                  color: "#24292e",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  transition: "background-color 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f6f8fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 016.25 6h-2.5A1.75 1.75 0 012 4.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-2.5zM2 10.75c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 016.25 14h-2.5A1.75 1.75 0 012 12.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-2.5zM10 8.75a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zm0 4a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM9.22 3.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H4.75a.75.75 0 010-1.5h6.19L9.22 4.78a.75.75 0 010-1.06z"></path>
                </svg>
                abmelden
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.2rem 0.5rem",
              borderRadius: "8px",
              backgroundColor: "transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "0.9rem",
              fontWeight: "600",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            title="Login with GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Login
          </button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 0.5rem)",
                right: 0,
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                padding: "0.5rem",
                minWidth: "180px",
                zIndex: 1000,
                border: "1px solid #e1e4e8",
              }}
            >
              <button
                onClick={() => {
                  handleGitHubSignIn();
                  setShowDropdown(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "transparent",
                  color: "#24292e",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  transition: "background-color 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f6f8fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 016.25 6h-2.5A1.75 1.75 0 012 4.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-2.5zM2 10.75c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 016.25 14h-2.5A1.75 1.75 0 012 12.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-2.5zM10 8.75a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zm0 4a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM9.22 3.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H4.75a.75.75 0 010-1.5h6.19L9.22 4.78a.75.75 0 010-1.06z"></path>
                </svg>
                anmelden
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
