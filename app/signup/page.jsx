import AuthLoginClient from '../../components/AuthLoginClient';

export const metadata = {
  title: 'Create Account | Credit Vivo',
  description: 'Create your Credit Vivo client portal account.',
};

export default function SignupPage() {
  return <AuthLoginClient mode="signup" />;
}
