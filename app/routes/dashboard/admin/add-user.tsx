import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { ActionFunction, json, LinksFunction, MetaFunction, useActionData, useSubmit } from 'remix';
import { match, P as Pattern } from 'ts-pattern';
import FieldInput from '~/library/components/FieldInput';
import { H2, P } from '~/library/components/Typography';
import { isDefined } from '~/utils';
import staticStyles from '~/styles/layouts/static.css';
import { supabase } from '~/db/supabase.server';
import Button from '~/library/components/Button';
import ErrorMsg from '~/library/components/ErrorMsg';
import { getRole } from '~/utils/auth';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: staticStyles }];

export const meta: MetaFunction = () => ({
  title: 'Add User',
  description: 'Add a new user to fCC Dallas',
});

interface AddUserForm {
  email: string;
  password: string;
}

type ActionData = { type: 'error'; message: string } | { type: 'success' };
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw json(
      {
        message: 'Invalid add user email or password payload',
      },
      400
    );
  }
  if (password.length < 8) {
    throw json(
      {
        message: 'Password is too short',
      },
      400
    );
  }

  const role = await getRole(request);
  if (role !== 'ADMIN') {
    throw json(
      {
        message: 'Unauthorized',
      },
      401
    );
  }

  const correctedEmail = email.toLowerCase().trim();
  const { user, error } = await supabase.auth.signUp({
    email: correctedEmail,
    password: password.trim(),
  });

  if (error) {
    console.error('User invite error:', error);
    return json({
      type: 'error',
      message: `An unexpected invite error occurred: ${error.status}: ${error.message}`,
    });
  }

  // todo: we really should have a db transaction handle this so
  // signUp user is rolled back if user details fails
  const { error: detailsError } = await supabase
    .from('user_details')
    .insert([{ user_fk: correctedEmail }]);

  if (detailsError) {
    console.error('User details insert error:', detailsError);
    return json({
      type: 'error',
      message: `An unexpected user details error occurred: ${detailsError.message}`,
    });
  }

  return json({
    type: 'success',
    user,
  });
};

const AddUser = () => {
  const submit = useSubmit();
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, trigger, control } = useForm<AddUserForm>();
  const { errors } = useFormState({ control });
  const actionData = useActionData<ActionData>();

  const submitForm = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    setIsLoading(true);
    await trigger();
    if (!Object.keys(errors).length) {
      submit(e.currentTarget, { replace: true });
      setIsLoading(false);
      return;
    }
    e.preventDefault();
    setIsLoading(false);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <H2>Add User</H2>
      <P>Invite a new user to join the fcc dallas website portal.</P>
      {match(actionData)
        .with(Pattern.nullish, () => null)
        .with({ type: 'error' }, (d) => <ErrorMsg>{d.message}</ErrorMsg>)
        .with({ type: 'success' }, () => <H2 style={{ color: 'green' }}>User Invited!</H2>)
        .exhaustive()}
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
          errorMsg={isDefined(errors.password) ? errors.password.message : ''}
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters in length',
            },
          })}
        />
        <Button type="submit">Send Invite</Button>
      </form>
    </div>
  );
};

export default AddUser;
