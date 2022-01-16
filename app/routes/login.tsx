import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  redirect,
  useSubmit,
} from 'remix';
import ExternalLink from '~/components/ExternalLink';
import { SocialMediaLinks } from '~/constants/external-links';
import { supabase } from '~/db/supabase.server';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import Button from '~/library/components/Button';
import Divider from '~/library/components/Divider';
import FieldInput from '~/library/components/FieldInput';
import Row from '~/library/components/Row';
import { H2, P } from '~/library/components/Typography';
import staticStyles from '~/styles/layouts/static.css';
import loginStyles from '~/styles/pages/login.css';
import { isDefined } from '~/utils';
import { isAuthenticated, supabaseToken } from '~/utils/auth';

interface LoginForm {
  email: string;
  password: string;
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: staticStyles },
  { rel: 'stylesheet', href: loginStyles },
];

export const loader: LoaderFunction = async () => {
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) {
    // reneable one we fix logout
    // return redirect("/dashboard/home");
  }
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  if (typeof email !== 'string' || typeof password !== 'string') {
    return json({
      message: 'Invalid login payload',
      status: 400,
    });
  }

  const { session, error } = await supabase.auth.signIn({ email, password });
  if (session) {
    return redirect('/dashboard/home', {
      headers: {
        'Set-Cookie': await supabaseToken.serialize(session.access_token, {
          expires: new Date(session?.expires_at!),
          maxAge: session.expires_in,
        }),
      },
    });
  }

  if (error && error.status >= 500) {
    console.error(`Unexpected login error; ${error.status} ${error.message}`);
  }

  return { error };
};

function Login() {
  const submit = useSubmit();
  const { register, trigger, control } = useForm<LoginForm>();
  const { errors } = useFormState({ control });
  const submitForm = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    await trigger();
    if (!Object.keys(errors).length) {
      submit(e.currentTarget, { replace: true });
      return;
    }
    e.preventDefault();
  };

  return (
    <StaticContentLayout>
      <div className="login-center">
        <div className="login-container">
          <H2>Login</H2>
          <Divider />
          <form method="post" onSubmit={submitForm}>
            <FieldInput
              label="Email"
              id="login-email"
              fullWidth
              errorMsg={isDefined(errors.email) ? errors.email.message : ''}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email must be valid',
                },
              })}
            />
            <FieldInput
              label="Password"
              id="login-password"
              fullWidth
              errorMsg={
                isDefined(errors.password) ? errors.password.message : ''
              }
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              })}
              type="password"
            />
            <Row justifyContent="flex-end">
              <Button type="submit" size="s" style={{ margin: '1rem' }}>
                LOGIN
              </Button>
            </Row>
          </form>
          <P>
            Don't have an account?{' '}
            <ExternalLink href={SocialMediaLinks.DISCORD}>
              Contact us
            </ExternalLink>{' '}
            for an invite.
          </P>
        </div>
      </div>
    </StaticContentLayout>
  );
}

export default Login;
