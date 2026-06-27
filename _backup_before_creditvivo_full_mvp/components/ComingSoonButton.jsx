export default function ComingSoonButton({ children = 'Coming Soon' }) {
  return (
    <button className="btn btn-disabled" type="button" disabled>
      {children}
    </button>
  );
}
