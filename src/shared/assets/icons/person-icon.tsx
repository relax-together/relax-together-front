interface PersonIconProps {
  color?: string;
}

export default function PersonIcon({ color }: PersonIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.99967" cy="5.33317" r="2.66667" fill={color} />
      <path
        d="M3.55826 11.5469C3.99899 9.68441 5.84749 8.6665 7.76139 8.6665H8.23796C10.1519 8.6665 12.0004 9.68441 12.4411 11.5469C12.5264 11.9073 12.5941 12.2844 12.6323 12.6676C12.6687 13.034 12.3679 13.3332 11.9997 13.3332H3.99967C3.63148 13.3332 3.33062 13.034 3.36708 12.6676C3.40521 12.2844 3.47299 11.9073 3.55826 11.5469Z"
        fill={color}
      />
    </svg>
  );
}