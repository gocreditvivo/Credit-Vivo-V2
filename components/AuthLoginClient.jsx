'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import BrandLogo from './BrandLogo';
import styles from './AuthLoginClient.module.css';

export default function AuthLoginClient({ mode = 'login' }) {
  const isSignup = mode === 'signup';
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');

  const copy = useMemo(() => {
    if (isSignup) {
      return {
        topLinkText: 'Login',
        topLinkHref: '/login',
        title: 'Create Account',
        subtitle: 'Start your Credit Vivo credit review portal.',
        primary: 'Create Account',
        bottomText: 'Already have an account?',
        bottomLink: 'Login',
        bottomHref: '/login',
      };
    }

    return {
      topLinkText: 'Create Account',
      topLinkHref: '/signup',
      title: 'Welcome Back!',
      subtitle: 'Login to continue',
      primary: 'Login',
      bottomText: 'New to Credit Vivo?',
      bottomLink: 'Create Account',
      bottomHref: '/signup',
    };
  }, [isSignup]);

  function handlePreviewSubmit(event) {
    event.preventDefault();
    setStatus('Launch preview login accepted. Secure authentication, encrypted sessions, and customer consent records are connected before public launch.');
  }

  function handleSocial(provider) {
    setStatus(`${provider} sign-in is not connected yet. No account data was sent.`);
  }

  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <header className={styles.header}>
          <div className={styles.brandWrap}>
            <BrandLogo />
          </div>
          <Link href={copy.topLinkHref} className={styles.topLink}>{copy.topLinkText}</Link>
        </header>

        <div className={styles.copyBlock}>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </div>

        <form className={styles.form} onSubmit={handlePreviewSubmit}>
          <label className={styles.label} htmlFor="email">Email</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon} aria-hidden="true">@</span>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <label className={styles.label} htmlFor="password">Password</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon} aria-hidden="true">*</span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              className={styles.showButton}
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {!isSignup && (
            <Link href="/login" className={styles.forgot}>Forgot your password?</Link>
          )}

          {isSignup && (
            <div style={{ display: 'grid', gap: 10, color: '#475569', fontSize: 14, lineHeight: 1.45 }}>
              <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <input type="checkbox" required />
                <span>I agree to receive portal notices and service communications electronically.</span>
              </label>
              <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <input type="checkbox" required />
                <span>I understand results vary and Credit Vivo does not guarantee deletions, approvals, or credit score increases.</span>
              </label>
              <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <input type="checkbox" required />
                <span>I understand I can dispute inaccurate credit report information directly at no cost.</span>
              </label>
            </div>
          )}

          <button className={styles.primaryButton} type="submit">
            {copy.primary}
          </button>
        </form>

        <div className={styles.divider}><span>or continue with</span></div>

        <div className={styles.socialStack}>
          <button type="button" className={styles.socialButton} onClick={() => handleSocial('Google')}>
            <span className={styles.googleIcon} aria-hidden="true">G</span>
            <span>{isSignup ? 'Sign up with Google' : 'Sign in with Google'}</span>
          </button>
          <button type="button" className={styles.socialButton} onClick={() => handleSocial('Apple')}>
            <span className={styles.appleIcon} aria-hidden="true">A</span>
            <span>{isSignup ? 'Sign up with Apple' : 'Sign in with Apple'}</span>
          </button>
        </div>

        {status && <p className={styles.status}>{status}</p>}

        <p className={styles.bottomNote}>
          {copy.bottomText} <Link href={copy.bottomHref}>{copy.bottomLink}</Link>
        </p>

        <p className={styles.securityNote}>
          Secure customer portal preview. Credit Vivo does not promise a specific credit score result. Final launch should include encrypted storage, privacy policy, and verified OAuth setup.
        </p>
      </section>
    </main>
  );
}
