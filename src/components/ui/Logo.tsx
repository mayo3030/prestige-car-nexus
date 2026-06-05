interface LogoProps {
  className?: string;
  variant?: "navbar" | "hero" | "footer";
}

export function Logo({ className = "h-10 w-auto", variant = "navbar" }: LogoProps) {
  const textColor = variant === "hero" ? "#fff" : "#C8A25E";

  return (
    <svg
      viewBox="0 0 400 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Jersey Auto Lease"
    >
      {/* Car icon silhouette */}
      <g transform="translate(10, 25)" opacity="0.9">
        {/* Car body */}
        <path
          d="M0 45 L5 20 Q8 10 15 8 L25 5 L30 0 L70 0 L75 5 L85 8 Q92 10 95 20 L100 45 L90 45 L88 35 L12 35 L10 45 Z"
          fill={textColor}
        />
        {/* Windows */}
        <path
          d="M28 8 L32 30 L68 30 L72 8 Z"
          fill={variant === "hero" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)"}
        />
        {/* Wheel left */}
        <circle cx="22" cy="45" r="8" fill={variant === "hero" ? "#222" : "#1a1a1a"} />
        <circle cx="22" cy="45" r="4" fill={variant === "hero" ? "#555" : "#444"} />
        {/* Wheel right */}
        <circle cx="78" cy="45" r="8" fill={variant === "hero" ? "#222" : "#1a1a1a"} />
        <circle cx="78" cy="45" r="4" fill={variant === "hero" ? "#555" : "#444"} />
      </g>

      {/* Jersey text */}
      <text
        x="135"
        y="40"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontSize="22"
        fontWeight="bold"
        fill={textColor}
        letterSpacing="3"
      >
        JERSEY
      </text>

      {/* Auto Lease text */}
      <text
        x="135"
        y="68"
        fontFamily="'Arial', 'Helvetica', sans-serif"
        fontSize="16"
        fontWeight="300"
        fill={textColor}
        letterSpacing="5"
        opacity="0.85"
      >
        AUTO LEASE
      </text>

      {/* Accent line */}
      <line
        x1="135"
        y1="76"
        x2="290"
        y2="76"
        stroke={textColor}
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}
