/**
 * RatingDots
 * ----------
 * Renders a candidate's rating as 5 dot-matrix dots filled to the rating value.
 * Props:
 *   value  — number 1–5
 *   max    — number (default 5)
 */
export default function RatingDots({ value, max = 5 }) {
  return (
    <span className="rating-dots" aria-label={`Rating: ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`dot ${i < value ? "dot--filled" : "dot--empty"}`} />
      ))}
    </span>
  );
}
