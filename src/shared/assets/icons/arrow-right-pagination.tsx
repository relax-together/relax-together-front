interface ArrowRightPaginationProps {
  color?: string;
}

export default function ArrowRightPagination({
  color,
}: ArrowRightPaginationProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8823 12.7151C15.1824 12.3975 15.1824 11.9008 14.8823 11.5832L9.42304 5.8047C8.91103 5.26275 7.99985 5.6251 7.99985 6.37066L7.99985 17.9276C7.99985 18.6732 8.91103 19.0355 9.42304 18.4936L14.8823 12.7151Z"
        fill={color}
      />
    </svg>
  );
}