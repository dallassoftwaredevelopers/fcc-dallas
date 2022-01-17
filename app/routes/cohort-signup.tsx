/* eslint-disable camelcase */
import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  redirect,
  useLoaderData,
  useSubmit,
} from 'remix';
import { supabase } from '~/db/supabase.server';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import FieldInput from '~/library/components/FieldInput';
import { H2 } from '~/library/components/Typography';
import { areAllDefined, isDefined } from '~/utils';
import staticStyles from '~/styles/layouts/static.css';
import Divider from '~/library/components/Divider';
import RadioGroup from '~/library/components/RadioGroup';
import RadioButton from '~/library/components/RadioButton';
import Button from '~/library/components/Button';
import Row from '~/library/components/Row';

interface CohortSignUpForm {
  cohortId: string;
  firstName: string;
  lastName: string;
  preferredStack: string;
  role: 'FE' | 'BE' | 'FS' | 'UX';
  wantsToLead: boolean;
  previouslyParticipated: boolean;
}

interface LoaderData {
  cohort: {
    id?: string;
    name: string;
  };
  error?: string;
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: staticStyles },
];

export const loader: LoaderFunction = async () => {
  const futureCohorts = await supabase
    .from('cohort')
    .select('name, id')
    .gt('start_date', new Date().toISOString())
    .limit(1);

  if (futureCohorts.error) {
    console.error(
      'Cohorts Form Error Database Fetch Error:',
      futureCohorts.error
    );
    return json(
      {
        cohort: '',
        error: 'Unexpected error retrieving cohort information',
      },
      futureCohorts.status
    );
  }

  if (
    !futureCohorts.body ||
    !futureCohorts.body.length ||
    !futureCohorts.body[0].name
  ) {
    console.warn('No new cohorts found');
    return json(
      {
        cohort: '',
        error: 'Unable to find future Cohort',
      },
      400
    );
  }

  return json({
    cohort: futureCohorts.body[0],
  });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  // snake_case to match db convention
  const cohort_fk = form.get('cohortId');
  const first_name = form.get('firstName');
  const last_name = form.get('lastName');
  const preferred_stack = form.get('preferredStack');
  const role = form.get('role');
  const leader = form.get('wantsToLead') === 'true';
  const previously_participated = form.get('previouslyParticipated') === 'true';

  if (!cohort_fk) {
    console.warn('Form submission missing cohorts ID');
    return redirect('/cohort-signup?error=missingId', 400);
  }
  console.log(form);
  if (
    !areAllDefined(
      first_name,
      last_name,
      preferred_stack,
      role,
      leader,
      previously_participated
    )
  ) {
    console.warn('Form submission missing data');
    return redirect('/cohort-signup?error=missingData', 400);
  }

  try {
    const result = await supabase.from('cohort_application').insert({
      cohort_fk,
      first_name,
      last_name,
      preferred_stack,
      role,
      leader,
      previously_participated,
    });
    if (result.error) {
      console.log(result);
      return redirect('/cohort-signup?error=dbError', result.status);
    }
  } catch (e) {
    console.error(e);
  }
  return redirect('/cohort-signup?success=true');
};

// todo need to figure react hook form validations for radio buttons
const CohortSignUp = () => {
  const submit = useSubmit();
  const { register, trigger, control } = useForm<CohortSignUpForm>();
  const { errors } = useFormState({ control });
  const loaderData = useLoaderData<LoaderData>();

  const submitForm = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    await trigger();
    if (!Object.keys(errors).length) {
      submit(e.currentTarget, { replace: true });
      return;
    }
    console.log(Object.keys(errors));
    e.preventDefault();
  };

  if (!loaderData?.cohort?.name) {
    return <H2>No upcoming Cohorts</H2>;
  }

  return (
    <StaticContentLayout>
      <H2>
        Apply for <strong>{loaderData.cohort.name}</strong>
      </H2>
      <Divider />
      <form method="post" onSubmit={submitForm}>
        <input
          {...register('cohortId')}
          type="hidden"
          value={loaderData.cohort.id}
        />
        <FieldInput
          label="First Name"
          id="first-name"
          fullWidth
          errorMsg={isDefined(errors.firstName) ? errors.firstName.message : ''}
          {...register('firstName', {
            required: {
              value: true,
              message: 'First Name is required',
            },
          })}
        />
        <FieldInput
          label="Last Name"
          id="last-name"
          fullWidth
          errorMsg={isDefined(errors.lastName) ? errors.lastName.message : ''}
          {...register('lastName', {
            required: {
              value: true,
              message: 'Last Name is required',
            },
          })}
        />
        <FieldInput
          label="Preferred Stack"
          id="preferred-stack"
          fullWidth
          errorMsg={
            isDefined(errors.preferredStack)
              ? errors.preferredStack.message
              : ''
          }
          {...register('preferredStack', {
            required: {
              value: true,
              message: 'Preferred Stack is required',
            },
          })}
        />
        <RadioGroup
          label="Which is your preferred role on a project?"
          errorMsg={isDefined(errors.role) ? errors.role.message : ''}
        >
          <RadioButton
            {...register('role')}
            label="Front End"
            id="role-fe"
            value="FE"
          />
          <RadioButton
            {...register('role')}
            label="Back End"
            id="role-be"
            value="BE"
          />
          <RadioButton
            {...register('role')}
            label="Full Stack"
            id="role-fs"
            value="FS"
          />
          <RadioButton
            {...register('role')}
            label="UI/UX Designer"
            id="role-ux"
            value="UX"
          />
        </RadioGroup>
        <RadioGroup
          label="Would you be interested in leading a team?"
          errorMsg={
            isDefined(errors.wantsToLead) ? errors.wantsToLead.message : ''
          }
        >
          <RadioButton
            {...register('wantsToLead')}
            label="Yes"
            id="wants-to-lead-yes"
            value="true"
          />
          <RadioButton
            {...register('wantsToLead')}
            label="No"
            id="wants-to-lead-no"
            value="false"
          />
        </RadioGroup>
        <RadioGroup
          label="Have you participated in a previous cohort?"
          errorMsg={
            isDefined(errors.previouslyParticipated)
              ? errors.previouslyParticipated.message
              : ''
          }
        >
          <RadioButton
            {...register('previouslyParticipated')}
            label="Yes"
            id="prev-participated-yes"
            value="true"
          />
          <RadioButton
            {...register('previouslyParticipated')}
            label="No"
            id="prev-participated-no"
            value="false"
          />
        </RadioGroup>
        <Row justifyContent="flex-end">
          <Button size="m" type="submit">
            Submit
          </Button>
        </Row>
      </form>
    </StaticContentLayout>
  );
};

export default CohortSignUp;
