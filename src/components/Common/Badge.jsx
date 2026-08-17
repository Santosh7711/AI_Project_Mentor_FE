// Reusable status and priority badges.
// Colours are controlled by the modifier class in global.css.

export default function Badge({ label, variant }) {
  const className = `badge badge-${variant}`;
  return <span className={className}>{label}</span>;
}
