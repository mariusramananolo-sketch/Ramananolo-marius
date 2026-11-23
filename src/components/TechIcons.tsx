import React from 'react';

export interface TechIconProps {
  name: string;
  className?: string;
  colored?: boolean;
}

export const TECH_BRAND_COLORS: Record<string, string> = {
  Java: '#E76F00',
  'Spring Boot': '#6DB33F',
  React: '#087EA4',
  'Next.js': '#111827',
  TypeScript: '#3178C6',
  JavaScript: '#D9A700',
  'JavaScript / TypeScript': '#3178C6',
  'JavaScript/TypeScript': '#3178C6',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  Python: '#3776AB',
  FastAPI: '#009688',
  PostgreSQL: '#336791',
  SQLite: '#003B57',
  SQL: '#2878F0',
  Git: '#F05032',
  GitHub: '#111827',
  'GitHub Actions': '#2088FF',
  Linux: '#FCC624',
  'Linux / Ubuntu Server': '#E95420',
  'Visual Studio Code': '#007ACC',
  'IntelliJ IDEA': '#FE315D',
  'REST API': '#2878F0',
  'REST APIs': '#2878F0',
  'Spring Security': '#6DB33F',
  JWT: '#2878F0',
  Cybersecurity: '#F07855',
  Vercel: '#111827',
  IONOS: '#003D8F',
  DNS: '#2878F0',
  'DNS Configuration': '#2878F0',
  'Pine Script': '#2962FF',
  TradingView: '#131722',
  Jira: '#0052CC',
  'AWS (S3, EC2)': '#FF9900',
  'Google Workspace': '#4285F4',
  'Google Drive API': '#0F9D58',
  WebSockets: '#2878F0',
  'Twelve Data API': '#2878F0',
};

export function MonogramLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="41" height="41" rx="8" fill="#111827" />
      <rect
        x="3.5"
        y="3.5"
        width="37"
        height="37"
        rx="6"
        stroke="#F4F1EA"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <path
        d="M9.5 30V14H13L17.5 22.5L22 14H25.5V30H22.5V19.6L18.4 27.2H16.6L12.5 19.6V30H9.5Z"
        fill="#F4F1EA"
      />
      <path
        d="M27.5 30V14H32.5C35.2 14 36.8 15.4 36.8 17.8C36.8 19.7 35.7 21 33.8 21.5L37 30H33.6L30.8 22.1H30.5V30H27.5ZM30.5 19.6H32.2C33.3 19.6 33.9 19 33.9 18C33.9 17 33.3 16.4 32.2 16.4H30.5V19.6Z"
        fill="#2878F0"
      />
      <circle cx="35.5" cy="11.5" r="2" fill="#F07855" />
    </svg>
  );
}

export function MariusSignature({ className = 'w-28 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Marius handwritten signature"
    >
      <path
        d="M14 48C17 34 22 16 25 14C27 12 27 28 28 36C31 26 37 14 40 14C43 14 41 34 44 38C47 42 54 30 58 29C61 28 63 33 61 36C58 40 52 40 52 35C52 30 58 27 63 31C65 33 66 39 70 38C74 37 78 28 81 28C84 28 82 37 86 38C90 39 95 30 98 28C101 26 101 38 105 38C109 38 113 28 116 28C119 28 118 37 123 37C128 37 134 27 137 26C140 25 142 35 147 36C153 37 161 31 168 27"
        stroke="#2878F0"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="99" cy="18" r="2.2" fill="#F07855" />
      <path
        d="M18 52C58 47 112 45 162 46"
        stroke="#F07855"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

export function TechIcon({ name, className = 'w-5 h-5', colored = false }: TechIconProps) {
  const color = colored ? TECH_BRAND_COLORS[name] || 'currentColor' : 'currentColor';

  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <circle cx="12" cy="12" r="2.1" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 16V8.5L16.8 18.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 8.5V13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'TypeScript':
    case 'JavaScript / TypeScript':
    case 'JavaScript/TypeScript':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 11H11.5M9 11V17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M17.5 12.2C17.1 11.4 16.3 11 15.3 11C13.9 11 13.1 11.8 13.1 12.8C13.1 14 14.2 14.3 15.5 14.6C16.8 14.9 17.7 15.3 17.7 16.4C17.7 17.5 16.7 18.1 15.3 18.1C14.1 18.1 13.2 17.6 12.7 16.8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10.5 11V16.2C10.5 17.4 9.7 18 8.6 18C7.8 18 7.2 17.6 6.9 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M17.5 12.2C17.1 11.4 16.3 11 15.3 11C14 11 13.2 11.8 13.2 12.7C13.2 13.8 14.2 14.1 15.4 14.4C16.6 14.7 17.6 15.1 17.6 16.3C17.6 17.4 16.6 18 15.2 18C14 18 13.1 17.5 12.6 16.7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'Java':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M6.5 13.5H15.5V16C15.5 18.2 13.5 19.8 11 19.8C8.5 19.8 6.5 18.2 6.5 16V13.5Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15.5 14.2H17.2C18.3 14.2 19 14.9 19 15.9C19 16.9 18.3 17.6 17.2 17.6H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 21.2H17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9.5 10.5C8.5 9.2 10.8 8 9.8 6.2M13 10.5C12 9.2 14.3 8 13.3 6.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'Spring Boot':
    case 'Spring Security':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path
            d="M12 2.5L20.2 7.2V16.8L12 21.5L3.8 16.8V7.2L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {name === 'Spring Security' ? (
            <path d="M12 7.5L16 9.3V12.4C16 14.8 14.3 16.7 12 17.5C9.7 16.7 8 14.8 8 12.4V9.3L12 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          ) : (
            <path
              d="M8.5 15.5C8.5 11.5 12.5 8.5 16 8.5C16 12.5 13 15.5 8.5 15.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          )}
        </svg>
      );

    case 'JWT':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M12 2.5V8.5M12 15.5V21.5M3.8 7.2L9 10.2M15 13.8L20.2 16.8M20.2 7.2L15 10.2M9 13.8L3.8 16.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    case 'Python':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M12 3C8.8 3 8.5 4.4 8.5 6V8.5H12.5V9.5H6.5C4.5 9.5 3.2 10.9 3.2 13.2C3.2 15.5 4.4 16.8 6.5 16.8H8V14.2C8 12.5 9.4 11.2 11.2 11.2H14.5C15.8 11.2 16.8 10.2 16.8 8.9V5.8C16.8 4.2 15.4 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 21C15.2 21 15.5 19.6 15.5 18V15.5H11.5V14.5H17.5C19.5 14.5 20.8 13.1 20.8 10.8C20.8 8.5 19.6 7.2 17.5 7.2H16V9.8C16 11.5 14.6 12.8 12.8 12.8H9.5C8.2 12.8 7.2 13.8 7.2 15.1V18.2C7.2 19.8 8.6 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="10.2" cy="5.8" r="0.9" fill="currentColor" />
          <circle cx="13.8" cy="18.2" r="0.9" fill="currentColor" />
        </svg>
      );

    case 'FastAPI':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 6.5L8.5 13H12L11 17.5L15.5 11H12L13 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'PostgreSQL':
    case 'SQLite':
    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <ellipse cx="12" cy="6.2" rx="7.5" ry="2.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 6.2V17.8C4.5 19.3 7.9 20.6 12 20.6C16.1 20.6 19.5 19.3 19.5 17.8V6.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 12C4.5 13.5 7.9 14.8 12 14.8C16.1 14.8 19.5 13.5 19.5 12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    case 'HTML5':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M4.5 3.5H19.5L18.1 18.3L12 20.5L5.9 18.3L4.5 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8.5 8H15.5M8.5 8L9 12H15L14.5 15.5L12 16.5L9.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'CSS3':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M4.5 3.5H19.5L18.1 18.3L12 20.5L5.9 18.3L4.5 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8.5 8H15.5L15 12H9.5M15 12L14.5 15.8L12 16.8L9.5 15.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'Git':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M12 2.8L21.2 12L12 21.2L2.8 12L12 2.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="12" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="15.5" r="1.6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15.8" cy="12.2" r="1.6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 10.6V13.9M13.2 10.1L14.7 11.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'GitHub':
    case 'GitHub Actions':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path
            d="M12 2.5C6.8 2.5 2.5 6.8 2.5 12C2.5 16.2 5.2 19.7 9 21C9.5 21.1 9.7 20.8 9.7 20.5V18.7C7 19.3 6.5 17.5 6.5 17.5C6 16.4 5.4 16.1 5.4 16.1C4.5 15.5 5.5 15.5 5.5 15.5C6.5 15.6 7 16.5 7 16.5C7.9 18 9.3 17.6 9.8 17.3C9.9 16.7 10.2 16.2 10.4 16C8.3 15.7 6 14.9 6 11.2C6 10.2 6.4 9.3 7 8.6C6.9 8.4 6.6 7.4 7.1 6.1C7.1 6.1 7.9 5.8 9.7 7C10.4 6.8 11.2 6.7 12 6.7C12.8 6.7 13.6 6.8 14.3 7C16.1 5.8 16.9 6.1 16.9 6.1C17.4 7.4 17.1 8.4 17 8.6C17.6 9.3 18 10.2 18 11.2C18 14.9 15.7 15.7 13.6 16C13.9 16.3 14.3 16.9 14.3 17.8V20.5C14.3 20.8 14.5 21.1 15 21C18.8 19.7 21.5 16.2 21.5 12C21.5 6.8 17.2 2.5 12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'Linux':
    case 'Linux / Ubuntu Server':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 9.5L10.5 12L7.5 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.5 14.5H16.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'Visual Studio Code':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M16.5 3.5L20.5 5.4V18.6L16.5 20.5L7.5 12L16.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4.2 8.2L7.5 12L4.2 15.8L3 14.8L5.5 12L3 9.2L4.2 8.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M16.5 8V16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'IntelliJ IDEA':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 8V14M14 8V12.5C14 13.7 13.2 14.3 12 14.3C11.2 14.3 10.6 13.9 10.3 13.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7.5 17H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M12 4L21 19.5H3L12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );

    case 'DNS':
    case 'DNS Configuration':
    case 'Configuration DNS':
    case 'IONOS':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.5 9.5H20.5M3.5 14.5H20.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );

    case 'AWS (S3, EC2)':
    case 'Google Workspace':
    case 'Google Drive API':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M7 18H17.5C19.7 18 21.5 16.3 21.5 14.1C21.5 12.2 20.1 10.6 18.3 10.3C17.6 7.3 15 5.2 11.8 5.2C8.3 5.2 5.4 7.9 5.2 11.4C3.6 11.9 2.5 13.4 2.5 15.1C2.5 16.8 4.4 18 7 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'Pine Script':
    case 'TradingView':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path d="M3.5 17.5L9 12L13 15L20.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 7H20.5V11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 20.5H20.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'Jira':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.5 8.5H15.5V15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 15.5L15.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'REST API':
    case 'REST APIs':
    case 'WebSockets':
    case 'Twelve Data API':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.3 11L15.7 7.9M8.3 13L15.7 16.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'Bash':
    case 'PowerShell':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 9.5L10.5 12L7.5 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.5 14.5H16.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'OpenSSL':
    case 'AES-256-CBC':
    case 'RSA':
    case 'SHA-256':
    case 'TLS':
    case 'HTTPS':
    case 'X.509 certificates':
    case 'Certificats X.509':
    case 'Cybersecurity':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color }} aria-hidden="true">
          <path
            d="M12 3L19.5 6.2V11.8C19.5 16.4 16.3 20.1 12 21.5C7.7 20.1 4.5 16.4 4.5 11.8V6.2L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="9.5" y="11" width="5" height="4.2" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.5 11V9.6C10.5 8.8 11.2 8.2 12 8.2C12.8 8.2 13.5 8.8 13.5 9.6V11" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}
