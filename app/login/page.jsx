import AuthLoginClient from '../../components/AuthLoginClient';

export const metadata = {
  title: 'Login | Credit Vivo',
  description: 'Sign in to the Credit Vivo client portal.',
};

export default function LoginPage() {
  return <AuthLoginClient mode="login" />;
}
