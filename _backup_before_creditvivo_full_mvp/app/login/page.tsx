import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-body">
      <div className="login-shell">
        <aside className="login-panel">
          <Link href="/" className="brand" aria-label="CreditVivo home"><span className="brand-mark">✓</span><span>CreditVivo</span></Link>
          <div>
            <div className="kicker" style={{background:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.12)",color:"#d9fffb"}}><span className="dot" /> Secure client portal</div>
            <h1>Track your credit case without the clutter.</h1>
            <p>Review AI findings, upload evidence, approve disputes, and follow bureau and furnisher updates inside one secure dashboard.</p>
            <div className="login-stats"><div className="login-stat"><strong>3</strong><span>Bureau reports organized</span></div><div className="login-stat"><strong>30–45</strong><span>Day response tracking</span></div><div className="login-stat"><strong>24/7</strong><span>Portal access</span></div></div>
          </div>
          <p style={{fontSize:".84rem",color:"rgba(255,255,255,.62)",margin:0}}>Sensitive credit details stay inside the portal. Email/text alerts should only notify you that an update is ready.</p>
        </aside>
        <section className="login-form-wrap">
          <form className="login-form" action="#" method="post">
            <h2>Welcome back</h2>
            <p>Log in to review your AI findings, evidence requests, dispute status, and next recommended step.</p>
            <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /></div>
            <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" /></div>
            <div className="login-options"><label><input type="checkbox" /> Remember this device</label><a href="#">Forgot password?</a></div>
            <button className="btn btn-primary" type="submit" style={{width:"100%"}}>Log in to portal</button>
            <Link className="btn btn-ghost" href="/#scan" style={{width:"100%",marginTop:12}}>Start free AI scan</Link>
            <div className="secure-note"><strong>Security note:</strong> Use multi-factor authentication before launch. Do not put credit-report details in email or text messages.</div>
          </form>
        </section>
      </div>
    </main>
  );
}
