"use client";

import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

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
                padding: "0.75rem",
                minWidth: "200px",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid #eee",
                  marginBottom: "0.5rem",
                }}
              >
                <div style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                  {session.user.name || "User"}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  {session.user.email}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#d32f2f";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f44336";
                }}
              >
                Abmelden
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleGitHubSignIn}
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
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.borderColor = "#000";
            e.currentTarget.style.backgroundColor = "#ffffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.borderColor = "#333";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          title="Prijavite se sa GitHub nalogom"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </button>
      )}
    </div>
  );
}
