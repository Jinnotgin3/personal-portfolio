import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "h-4 w-4" }: TechIconProps) {
  const norm = name.toLowerCase().trim();

  switch (norm) {
    // --- Languages ---
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M11.914 2C6.735 2 7.06 4.25 7.06 4.25l.006 2.332h4.942v.7H5.06S2 7.15 2 12.356c0 5.206 2.668 5.01 2.668 5.01h1.593v-2.247s-.086-2.667 2.624-2.667h4.509s2.54.04 2.54-2.483V5.06S16.402 2 11.914 2zM9.46 3.65a.94.94 0 110 1.88.94.94 0 010-1.88z"
            fill="#3776AB"
          />
          <path
            d="M12.086 22c5.179 0 4.854-2.25 4.854-2.25l-.006-2.332H11.99v-.7h6.949s3.06.132 3.06-5.074c0-5.206-2.668-5.01-2.668-5.01h-1.593v2.247s.086 2.667-2.624 2.667h-4.509s-2.54-.04-2.54 2.483V18.94S7.598 22 12.086 22zm2.454-1.65a.94.94 0 110-1.88.94.94 0 010 1.88z"
            fill="#FFD43B"
          />
        </svg>
      );

    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            d="M11.75 14.5c-.3.4-.75.75-1.3.95-.55.2-1.15.3-1.8.3-.95 0-1.75-.25-2.35-.75-.6-.5-.95-1.25-.95-2.25 0-.6.15-1.15.45-1.6.3-.45.7-.8 1.2-1 .5-.2 1.05-.3 1.65-.3.65 0 1.2.1 1.7.35.45.2.8.5 1.05.9l-1.3 1c-.15-.25-.35-.45-.6-.6-.25-.15-.55-.2-.9-.2-.4 0-.7.1-.95.3-.25.2-.4.5-.4.85 0 .35.15.65.4.85.25.2.65.3 1.15.3.3 0 .6-.05.85-.15.25-.1.45-.25.6-.45l.95.8zM17.4 9.1h-4.9v2.1h1.8v8.3h2.3v-8.3h1.8v-2.1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M6.5 18.5l1.6-1c.4.7.9 1.1 1.6 1.1.8 0 1.3-.4 1.3-1.4V10h2.1v7.2c0 2.1-1.2 3.2-3.3 3.2-1.5 0-2.6-.8-3.3-1.9zm8.2-.3l1.7-1c.5.8 1.1 1.3 2 1.3.8 0 1.4-.4 1.4-1 0-.6-.5-.9-1.5-1.3l-.6-.3c-1.6-.7-2.7-1.5-2.7-3.3 0-1.7 1.3-3 3.2-3 1.4 0 2.4.5 3.2 1.8l-1.6 1c-.4-.6-.8-.9-1.5-.9-.6 0-1.1.3-1.1.8 0 .5.4.8 1.4 1.2l.6.3c1.9.8 2.9 1.7 2.9 3.4 0 2-1.5 3.2-3.6 3.2-2 0-3.3-1-3.8-2.2z"
            fill="#000000"
          />
        </svg>
      );

    case "c++":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M11.5 3.5L3.8 8v8l7.7 4.5 7.7-4.5V8L11.5 3.5zm-.3 13.7c-2.8 0-4.8-1.9-4.8-5.2s2-5.2 4.8-5.2c1.7 0 3.1.8 3.9 2.1l-1.8 1.1c-.5-.7-1.2-1.1-2.1-1.1-1.6 0-2.6 1.2-2.6 3.1s1 3.1 2.6 3.1c.9 0 1.6-.4 2.1-1.1l1.8 1.1c-.8 1.3-2.2 2.1-3.9 2.1zm4.8-6.1h.9v-.9h.9v.9h.9v.9h-.9v.9h-.9v-.9H16v-.9zm3.5 0h.9v-.9h.9v.9h.9v.9h-.9v.9h-.9v-.9h-.9v-.9z"
            fill="#00599C"
          />
        </svg>
      );

    case "java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M9.1 19.3c3.7.2 6.5-.4 9.4-1.8-2.5.8-5.4 1.1-7.8.9-1.2-.1-1.6-.3-1.6-.3s-.3.5 0 1.2zm-1.3-3c4.6.3 8.3-.4 12.1-2.2-3.3.9-7 1.3-10.2 1-1.5-.1-2.1-.4-2.1-.4s-.3.7.2 1.6zm-2.8-3.1c6.1.4 11.2-.6 16.2-3-4.4 1.3-9.5 1.8-13.8 1.4-2-.2-2.8-.6-2.8-.6s-.4 1 .4 2.2zm11.5-5.9s1.4 1.4-1.2 3.6c-2.1 1.7-4.5 2.5-4.5 2.5s2.3-.6 3.8-1.9c1.9-1.6 1.9-4.2 1.9-4.2zM8.3 4.2s-2.1 2.1 1.4 5.3c2.4 2.1 4.7 3.2 4.7 3.2s-2.3-.9-3.9-2.3C8.6 8.7 8.3 4.2 8.3 4.2z"
            fill="#EA2D2E"
          />
          <path
            d="M17.4 18.9c.8-.8 1.2-1.7 1.2-2.7 0-1.7-1.3-3-3-3s-1.8.8-1.8.8 1 .2 1.5.8c.6.7.6 1.5 0 2.2-.6.7-1.5.9-1.5.9s1.4.3 2.5-.2c1-.4 1.1-1.4 1.1-1.4z"
            fill="#5382A1"
          />
        </svg>
      );

    // --- Frontend ---
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(60 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(120 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case "next.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
          <path
            d="M15.5 8h2v8h-2zM9.5 8l6.8 9.5-.9.7L8.5 8.7V16h-2V8h3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "tailwind css":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#38BDF8">
          <path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.4-1.8 3-2.4 4.8-1.8 1 0.4 1.8 1.2 2.6 2 1.3 1.4 2.8 3 6 3 3.6 0 5.8-1.8 6.6-5.4-1.4 1.8-3 2.4-4.8 1.8-1-0.4-1.8-1.2-2.6-2-1.3-1.4-2.8-3-6-3zm-6.6 6c-3.6 0-5.8 1.8-6.6 5.4 1.4-1.8 3-2.4 4.8-1.8 1 0.4 1.8 1.2 2.6 2 1.3 1.4 2.8 3 6 3 3.6 0 5.8-1.8 6.6-5.4-1.4 1.8-3 2.4-4.8 1.8-1-0.4-1.8-1.2-2.6-2-1.3-1.4-2.8-3-6-3z" />
        </svg>
      );

    case "html5":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" fill="#E34F26" />
          <path d="M12 3.8v17.4l5.9-2.2 1.3-15.2H12z" fill="#EF652A" />
          <path
            d="M12 7.7H7.7l.3 3.3h4V7.7zm0 6.6h-.1l-2.4-.6-.2-1.8H7.2l.3 3.5 4.5 1.2v-2.3z"
            fill="#EBEBEB"
          />
          <path
            d="M12 7.7v3.3h3.7l-.3 3.3-3.4.9v2.4l4.5-1.2.7-8.7H12z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "css3":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" fill="#1572B6" />
          <path d="M12 3.8v17.4l5.9-2.2 1.3-15.2H12z" fill="#33A9DC" />
          <path
            d="M12 7.7H7.7l.3 3.3h4V7.7zm0 6.6h-.1l-2.4-.6-.2-1.8H7.2l.3 3.5 4.5 1.2v-2.3z"
            fill="#EBEBEB"
          />
          <path
            d="M12 7.7v3.3h3.7l-.3 3.3-3.4.9v2.4l4.5-1.2.7-8.7H12z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // --- Backend ---
    case "node.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#5FA04E">
          <path d="M12 2.5l8.2 4.7v9.5L12 21.5 3.8 16.7V7.2L12 2.5zm0 2.3L5.8 8.3v7.3l6.2 3.6 6.2-3.6V8.3L12 4.8zm-.8 5.7v5.3h1.6v-3.4l2.2 3.4h1.7V10.5h-1.6v3.3l-2.2-3.3h-1.7z" />
        </svg>
      );

    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="11" fill="#059669" />
          <path
            d="M12.8 4.5l-4.6 7.4h3.6l-1.4 7.6 6.1-8.5h-4.3l.6-6.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "express":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.5h-7v-1.5h7v1.5zm1.5-3.5h-10V10.5h10V12zm-2-3.5h-6V7h6v1.5z" />
        </svg>
      );

    case "rest apis":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="3" stroke="#38BDF8" />
          <path d="M6 12h4m4 0h4" stroke="#38BDF8" strokeLinecap="round" />
          <circle cx="10" cy="12" r="1.5" fill="#38BDF8" />
          <circle cx="14" cy="12" r="1.5" fill="#38BDF8" />
        </svg>
      );

    // --- ML / AI ---
    case "pytorch":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M13.5 3.5l-.8.8 2.6 2.6c3.2 3.2 3.2 8.4 0 11.6s-8.4 3.2-11.6 0-3.2-8.4 0-11.6l4.2-4.2-.8-.8L3 6c-3.7 3.7-3.7 9.6 0 13.3s9.6 3.7 13.3 0 3.7-9.6 0-13.3l-2.8-2.5z"
            fill="#EE4C2C"
          />
          <circle cx="15.8" cy="5.2" r="1.3" fill="#EE4C2C" />
        </svg>
      );

    case "tensorflow":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF6F00">
          <path d="M12 2.5L3.5 7.4v9.8l4.3-2.5V9.8l4.2 2.4v9.3l4.3-2.5V9.7l4.2-2.4v4.9l4.3-2.5V7.4L12 2.5z" />
        </svg>
      );

    case "scikit-learn":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="8" cy="12" r="6" fill="#F89939" opacity="0.9" />
          <circle cx="16" cy="12" r="6" fill="#3499CD" opacity="0.9" />
          <circle cx="12" cy="12" r="3" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case "pandas":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="4" y="4" width="6" height="7" rx="1" fill="#150458" />
          <rect x="14" y="4" width="6" height="11" rx="1" fill="#E70488" />
          <rect x="4" y="13" width="6" height="7" rx="1" fill="#FFD43B" />
          <rect x="14" y="17" width="6" height="3" rx="1" fill="#150458" />
        </svg>
      );

    case "numpy":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#4D77CF">
          <path d="M4 4h4.5l7 10.5V4H20v16h-4.5L8.5 9.5V20H4V4z" />
        </svg>
      );

    case "mlops":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#A855F7" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" strokeLinecap="round" />
          <path d="M8 3v2m8-2v2" strokeLinecap="round" />
        </svg>
      );

    // --- Cloud & DevOps ---
    case "aws":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M7.7 10.3c0-.6.4-1.2 1.3-1.2 1 0 1.5.5 1.5 1.2v3.8c0 .5-.2.9-.6 1.1l-1.3.7c-.4.2-.9.1-1.1-.3l-.8-1.5c-.3.6-.9 1-1.6 1-.9 0-1.7-.6-1.7-1.7 0-1.4 1.1-2.2 2.8-2.3l1.5-.1v-.7zm0 2.2l-1.3.1c-.8.1-1.3.4-1.3 1 0 .5.4.8.8.8.6 0 1.2-.4 1.4-.9l.4-1zm5.2-3.3h1.8l1.3 4.8 1.4-4.8h1.7l-2.2 6.5h-1.8l-1.3-4.5-1.3 4.5h-1.8l-2.2-6.5h1.7l1.4 4.8 1.4-4.8zm11 1.9c0-1.5-1.2-2-2.5-2-1.3 0-2.3.5-2.6 1.6l1.5.5c.2-.5.5-.8 1.1-.8.5 0 .9.2.9.6 0 .3-.2.5-.7.6l-1.2.3c-1.3.3-1.8 1-1.8 1.9 0 1.2 1 1.9 2.2 1.9 1 0 1.6-.4 2-.9v.8h1.6v-4.5zm-1.6 2.3c0 .5-.4.9-1 .9-.5 0-.8-.3-.8-.7 0-.4.3-.6.8-.7l1-.2v.7z"
            fill="#FF9900"
          />
          <path
            d="M3.2 18.5c5.3 3.1 12.3 3.1 17.6 0 .3-.2.7 0 .6.4-.6 1-4.7 3.5-9.4 3.5s-8.8-2.5-9.4-3.5c-.1-.4.3-.6.6-.4z"
            fill="#FF9900"
          />
        </svg>
      );

    case "docker":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#2496ED">
          <path d="M2.5 13.5c.6 3.6 3.5 6.5 7.1 7.1 4.5.8 8.6-1.7 9.8-5.7.9.1 1.8-.1 2.5-.6.6-.4 1.1-1 1.4-1.7-1.1-.3-2.2-.2-3.2.3-.3-1.5-1.2-2.8-2.5-3.6-.3-.2-.7-.4-1.1-.5l-.8 1.5c1.4.9 2 2.7 1.4 4.3-.4 1.1-1.3 2-2.4 2.3H5.2c-.7 0-1.3-.3-1.7-.8-.4-.6-.5-1.3-.3-2l-.7-.7zm6.7-6.5h2v2h-2zm-3 0h2v2h-2zm6 0h2v2h-2zm-6 3h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2z" />
        </svg>
      );

    case "ci/cd":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#22D3EE" strokeWidth="2">
          <path d="M4 12a8 8 0 0114.9-4M20 12a8 8 0 01-14.9 4" strokeLinecap="round" />
          <polyline points="16 4 20 8 16 12" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="8 20 4 16 8 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "git":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#F05032">
          <path d="M21.7 10.9L13.1 2.3c-.4-.4-1-.4-1.4 0l-1.9 1.9 2.4 2.4c.4-.1.9 0 1.2.3.4.4.5 1 .3 1.5l2.3 2.3c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1s-1.5.6-2.1 0c-.4-.4-.5-1-.3-1.5l-2.2-2.2v5.2c.2.1.4.3.5.5.6.6.6 1.5 0 2.1s-1.5.6-2.1 0c-.6-.6-.6-1.5 0-2.1.2-.2.4-.3.6-.4V8.5c-.2-.1-.4-.2-.5-.4-.4-.4-.5-1-.3-1.5L8.9 4.3 2.3 10.9c-.4.4-.4 1 0 1.4l8.6 8.6c.4.4 1 .4 1.4 0l9.4-9.4c.4-.4.4-1.1 0-1.5z" />
        </svg>
      );

    // --- Tools ---
    case "vs code":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#007ACC">
          <path d="M17.5 2.5L6.8 11.2l-3.5-2.7L2 9.5l3.2 2.5L2 14.5l1.3 1 3.5-2.7 10.7 8.7 4.5-2.1V4.6L17.5 2.5zm1.5 15.2l-7-5.7 7-5.7v11.4z" />
        </svg>
      );

    case "postman":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF6C37">
          <circle cx="12" cy="12" r="10" />
          <path
            d="M17 11.5c-.5-.8-1.5-1.2-2.6-1.2h-3l1.8-1.8c.4-.4.4-1 0-1.4s-1-.4-1.4 0L8 10.9c-.4.4-.4 1 0 1.4l3.8 3.8c.4.4 1 .4 1.4 0s.4-1 0-1.4L11.4 13h3c.6 0 1.1.2 1.4.6.4.4.5 1 .3 1.5l-.2.7 1.4.5.3-.8c.4-.9.2-2-.6-3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M8 2h4v5H8a2.5 2.5 0 010-5z" fill="#F24E1E" />
          <path d="M12 2h4a2.5 2.5 0 010 5h-4V2z" fill="#FF7262" />
          <path d="M8 7h4v5H8a2.5 2.5 0 010-5z" fill="#A259FF" />
          <path d="M12 7h4a2.5 2.5 0 010 5h-4V7z" fill="#1ABCFE" />
          <path d="M8 12h4v5a2.5 2.5 0 01-4-2v-3z" fill="#0ACF83" />
        </svg>
      );

    // --- Databases ---
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2.5s-6 6.8-6 11.2c0 4.1 3.2 7.3 6 7.8 2.8-.5 6-3.7 6-7.8 0-4.4-6-11.2-6-11.2z"
            fill="#47A248"
          />
          <path
            d="M12 3v18c2.4-.4 5-3.3 5-7.3 0-3.8-5-10.7-5-10.7z"
            fill="#499D4A"
          />
        </svg>
      );

    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#4169E1">
          <path d="M12 3c-4.4 0-8 3.6-8 8 0 3.2 1.9 6 4.7 7.3-.1-.5-.2-1.1-.2-1.7 0-3 2-5.4 4.8-6.1-.2-.6-.3-1.2-.3-1.9 0-2.4 1.8-4.3 4.1-4.5-1.5-.7-3.2-1.1-5.1-1.1zm5.2 3.8c-1.3.1-2.4 1.2-2.4 2.5 0 .5.1.9.3 1.3 2.1.6 3.7 2.3 4.2 4.4 1.6-1.5 2.7-3.7 2.7-6.1 0-1-.2-1.9-.6-2.8-.9.5-2.6.7-4.2.7zm-2.4 5.9c-2.4.6-4.1 2.6-4.1 5 0 .5.1 1 .2 1.5 1 .5 2.2.8 3.4.8 2.5 0 4.7-1.1 6.1-2.9-.6-2.5-2.7-4.1-5.6-4.4z" />
        </svg>
      );

    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M13.3 22.2l8.2-11.2c.4-.6 0-1.5-.8-1.5h-7.8V2.7c0-.6-.7-1-1.2-.6L3.5 13.3c-.4.6 0 1.5.8 1.5h7.8v6.8c0 .6.7 1 1.2.6z"
            fill="#3ECF8E"
          />
        </svg>
      );

    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#00758F">
          <path d="M12.5 4.5c-3.8 0-6.8 2.3-7.5 5.5l2.2.6c.5-2.2 2.6-3.8 5.3-3.8 3 0 5.5 2 5.5 4.8 0 1.9-1.1 3.5-2.8 4.2l.9 2.1c2.6-1.1 4.2-3.6 4.2-6.3 0-4-3.5-7.1-7.8-7.1zm-6 8.2c-.4.8-.6 1.7-.6 2.6 0 3.2 2.6 5.8 5.8 5.8 2.2 0 4.2-1.2 5.1-3l-2-.9c-.6 1.2-1.8 2-3.1 2-2 0-3.6-1.6-3.6-3.6 0-.6.2-1.2.4-1.7l-2-.2z" />
        </svg>
      );

    case "redis":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#DC382D">
          <path d="M2.5 8.2l9.5-4.2 9.5 4.2-9.5 4.2-9.5-4.2zm0 4.6l9.5 4.2 9.5-4.2v2.5l-9.5 4.2-9.5-4.2v-2.5zm0 4.6l9.5 4.2 9.5-4.2v2.5l-9.5 4.2-9.5-4.2v-2.5z" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" stroke="currentColor" opacity="0.6" />
          <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
  }
}
