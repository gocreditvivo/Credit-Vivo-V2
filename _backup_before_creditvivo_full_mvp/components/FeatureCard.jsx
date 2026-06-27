export default function FeatureCard({ eyebrow, title, description, status = 'active', children }) {
  const comingSoon = status === 'soon';
  return (
    <article className={comingSoon ? 'feature-card muted-card' : 'feature-card'}>
      <div className="feature-topline">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <span className={comingSoon ? 'pill pill-muted' : 'pill pill-live'}>
          {comingSoon ? 'Coming Soon' : 'MVP Ready'}
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </article>
  );
}
