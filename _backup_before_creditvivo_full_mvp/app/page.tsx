import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <Link href="/" className="brand" aria-label="CreditVivo home">
            <span className="brand-mark">✓</span><span>CreditVivo</span>
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#how">How it works</a><a href="#scanner">AI review</a><a href="#portal">Portal</a><a href="#plans">Plans</a>
          </nav>
          <div className="nav-actions"><Link className="btn btn-ghost" href="/login">Client login</Link><a className="btn btn-primary" href="#scan">Start free scan</a></div>
        </div>
      </header>

      <main>
        <section className="hero" id="scan">
          <div className="container hero-grid">
            <div>
              <div className="kicker"><span className="dot" /> Free AI credit report review • no hard pull</div>
              <h1>Credit improvement you can see, prove, and track.</h1>
              <p>CreditVivo helps you review your credit reports, spot possible inaccuracies, organize evidence, prepare dispute support, and track every bureau and furnisher response in one secure portal.</p>
              <div className="hero-actions"><a className="btn btn-primary" href="#plans">Start my free scan</a><a className="btn btn-white" href="#portal">View portal preview</a></div>
              <div className="trust-row"><span className="trust-pill"><span className="check">✓</span>No hard pull</span><span className="trust-pill"><span className="check">✓</span>Evidence-based disputes</span><span className="trust-pill"><span className="check">✓</span>Secure document vault</span><span className="trust-pill"><span className="check">✓</span>Attorney review if eligible</span></div>
            </div>
            <div className="device-wrap">
              <div className="blob" />
              <div className="floating-card float-right"><div className="float-title">3-bureau review</div><div className="float-text">Experian, Equifax, and TransUnion findings organized into simple cards.</div></div>
              <div className="phone"><div className="phone-screen"><div className="app-header"><div className="app-top"><div className="tiny-logo">✓ CreditVivo</div><div className="avatar">TD</div></div><div className="app-title">Your credit case</div><div className="app-sub">AI findings ready for review</div></div><div className="score-card"><div className="score-line"><div><div className="score-label">Progress score</div><div className="score">74%</div></div><span className="badge badge-green">On track</span></div><div className="progress-bar"><div className="progress-fill" /></div></div><div className="findings"><div className="finding"><div className="finding-icon">8</div><div><h4>Negative accounts found</h4><p>Collections, charge-offs, and late payments grouped by priority.</p></div></div><div className="finding"><div className="finding-icon">3</div><div><h4>Possible bureau mismatches</h4><p>Balances, dates, or status fields do not match across bureaus.</p></div></div><div className="finding"><div className="finding-icon">2</div><div><h4>Evidence requested</h4><p>Upload letters or proof before we prepare the strongest next step.</p></div></div></div></div></div>
              <div className="floating-card float-left"><div className="float-title">Next response due</div><div className="float-text">TransUnion dispute response expected in 12 days. We’ll notify you in the portal.</div></div>
            </div>
          </div>
        </section>

        <section className="section" id="how"><div className="container"><div className="section-head"><div className="eyebrow">Simple customer journey</div><h2>Clean on the front. Powerful in the back.</h2><p>The customer should not see complicated scanner logs. CreditVivo turns the backend review into simple findings, account cards, and next steps.</p></div><div className="feature-grid">{["Start the free scan","Upload reports","Review AI findings","Approve disputes","Track every update","Escalate if eligible"].map((title, i) => <div className="feature-card" key={title}><div className="feature-number">{i+1}</div><h3>{title}</h3><p>{["Answer a few questions about your credit goals, negative items, and whether you have all three reports.","Securely upload Experian, Equifax, and TransUnion reports so the backend scanner can organize the file.","See possible inaccuracies, bureau differences, evidence needs, and recommended dispute paths in plain English.","Choose which accounts to challenge. No vague mass disputes. Every action should be specific and evidence-based.","Follow sent dates, response windows, bureau replies, furnisher replies, outcomes, and next steps.","Unresolved serious issues can be packaged for attorney review when evidence supports escalation."][i]}</p></div>)}</div></div></section>

        <section className="section" id="scanner"><div className="container"><div className="band"><div className="band-grid"><div><div className="eyebrow">VivoScan backend</div><h2>The scanner stays hidden.</h2><p>The backend can compare bureau data, detect mismatches, and prepare findings. The customer only sees clear results, not the engine.</p><a className="btn btn-white" href="#portal">See customer view</a></div><div className="scan-panel">{[["Report upload","Experian, Equifax, TransUnion","Secure","badge-blue"],["3-bureau match","Accounts grouped across reports","Internal","badge-green"],["Rule review","Dates, balances, status, duplicates","Needs proof","badge-amber"],["Customer findings","Plain-English recommendations","Ready","badge-green"]].map(([a,b,c,d]) => <div className="scan-row" key={a}><div><strong>{a}</strong><span>{b}</span></div><span className={`badge ${d}`}>{c}</span></div>)}</div></div></div></div></section>

        <section className="section" id="portal"><div className="container"><div className="section-head"><div className="eyebrow">Client portal</div><h2>Make customers feel progress every week.</h2><p>CreditVivo should show what was found, what was sent, what is due, and what happens next.</p></div><div className="portal-grid"><div className="portal-card"><h3>AI finding card</h3><div className="account-card"><div className="account-top"><div className="account-name">Portfolio Recovery</div><div className="account-type">Collection</div></div><div className="account-meta"><span className="meta-chip">Experian</span><span className="meta-chip">TransUnion</span><span className="meta-chip">Balance mismatch</span></div><p className="account-copy">Possible issue: balance and status do not match across bureaus. Upload a collection notice, payment proof, or settlement letter before approval.</p><div className="hero-actions" style={{marginTop:16}}><a className="btn btn-primary" href="#">Approve dispute</a><a className="btn btn-ghost" href="#">Upload evidence</a></div></div></div><div className="portal-card"><h3>Dispute tracker</h3><div className="timeline">{[["✓","AI findings complete","8 negative accounts organized.","Today"],["✓","Evidence requested","Two files needed before dispute.","Next"],["3","Dispute approval","Customer chooses items to challenge.","Ready"],["4","Response tracking","Portal monitors bureau/furnisher deadlines.","30–45d"]].map(([n,t,p,d]) => <div className="step" key={t}><div className="step-dot">{n}</div><div><h4>{t}</h4><p>{p}</p></div><div className="step-date">{d}</div></div>)}</div></div></div></div></section>

        <section className="section" id="plans"><div className="container"><div className="section-head"><div className="eyebrow">Clear pricing</div><h2>Plans that feel simple and trustworthy.</h2><p>Use clean package cards with safe language: no guaranteed removals, no guaranteed score increases.</p></div><div className="plans">{[["Start here","Free Scan","$0","/ today",false],["DIY","AI Guided","$29","/ mo",false],["Most popular","Plus Managed","$119","/ mo",true],["Escalation","Legal Review","Case"," based",false]].map(([tag,name,price,suffix,pop]) => <div className={`plan ${pop ? "popular" : ""}`} key={name as string}><div className="plan-tag">{tag}</div><h3>{name}</h3><div className="price"><strong>{price}</strong><span>{suffix}</span></div><ul><li><span className="check">✓</span>Clear next steps</li><li><span className="check">✓</span>Portal tracking</li><li><span className="check">✓</span>Evidence checklist</li><li><span className="check">✓</span>Safe compliance language</li></ul><a className={`btn ${pop ? "btn-primary" : "btn-ghost"}`} href="#scan">Get started</a></div>)}</div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="brand"><span className="brand-mark">✓</span><span>CreditVivo</span></div><div><div className="footer-links"><a href="#how">How it works</a><a href="#plans">Plans</a><Link href="/login">Client login</Link><a href="#">Privacy</a></div><p className="disclaimer">CreditVivo does not guarantee score increases, approvals, or deletion of accurate, current, and verifiable information. Consumers may dispute information directly with credit bureaus and furnishers for free. Attorney services, if available, require separate eligibility review and attorney engagement.</p></div></div></footer>
    </>
  );
}
