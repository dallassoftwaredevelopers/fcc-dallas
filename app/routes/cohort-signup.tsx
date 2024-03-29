/* eslint-disable camelcase */
import { format } from 'date-fns';
import * as React from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
  useSubmit,
} from 'remix';
import { ProjectTier } from '~/constants/cohorts';
import { supabase } from '~/db/supabase.server';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import Button from '~/library/components/Button';
import Divider from '~/library/components/Divider';
import ErrorMsg from '~/library/components/ErrorMsg';
import FieldInput from '~/library/components/FieldInput';
import RadioButton from '~/library/components/RadioButton';
import RadioGroup from '~/library/components/RadioGroup';
import Row from '~/library/components/Row';
import { H2, P } from '~/library/components/Typography';
import staticStyles from '~/styles/layouts/static.css';
import { areAllDefined, isDefined } from '~/utils';

export interface CohortSignUpForm {
  cohortId: string;
  firstName: string;
  lastName: string;
  email: string;
  discordUsername: string;
  preferredStack: string;
  role: 'FE' | 'BE' | 'FS' | 'UX';
  tier: ProjectTier;
  wantsToLead: boolean;
  previouslyParticipated: boolean;
  howHeardAboutCohort: string;
  whenAvailable: string;
  wouldLikeToImprove: string;
  bestWayToContact: string;
}

interface LoaderData {
  cohort: {
    id?: string;
    name: string;
    start_date: Date;
    end_date: Date;
  };
  errorParam?: string;
  error?: string;
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: staticStyles }];

export const meta: MetaFunction = () => ({
  title: 'Cohort Sign Up',
  description: 'freeCodeCamp Dallas Cohort Sign Up',
});

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const futureCohorts = await supabase
      .from('cohort')
      .select('name, id, start_date, end_date')
      .gt('start_date', new Date().toISOString())
      .limit(1);

    if (futureCohorts.error) {
      console.error('Cohorts Form Error Database Fetch Error:', futureCohorts.error);
      return json(
        {
          cohort: '',
          error: 'Unexpected error retrieving cohort information',
        },
        futureCohorts.status
      );
    }

    if (!futureCohorts.body || !futureCohorts.body.length || !futureCohorts.body[0].name) {
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
      errorParams: params.error,
    });
  } catch (e) {
    return json({
      cohort: '',
      error: `Unexpected error ${e}`,
    });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  // snake_case to match db convention
  const cohort_fk = form.get('cohortId');
  const first_name = form.get('firstName');
  const last_name = form.get('lastName');
  const email = form.get('email');
  const discord_username = form.get('discordUsername');
  const preferred_stack = form.get('preferredStack');
  const tier = form.get('tier');
  const role = form.get('role') ?? null;
  const leader = form.get('wantsToLead') === 'true';
  const previously_participated = form.get('previouslyParticipated') === 'true';
  const how_heard_about = form.get('howHeardAboutCohort');
  const when_available = form.get('whenAvailable');
  const would_like_to_improve = form.get('wouldLikeToImprove');
  const way_to_contact = form.get('bestWayToContact');

  if (!cohort_fk) {
    console.warn('Form submission missing cohorts ID');
    return redirect('/cohort-signup?error=missingId', 400);
  }
  if (
    !areAllDefined(
      first_name,
      last_name,
      email,
      discord_username,
      preferred_stack,
      tier,
      role,
      leader,
      previously_participated,
      how_heard_about,
      when_available,
      would_like_to_improve,
      way_to_contact
    )
  ) {
    console.warn('Form submission missing data');
    return redirect('/cohort-signup?error=missingData', 400);
  }

  try {
    const result = await supabase.from('cohort_application').insert(
      {
        cohort_fk,
        first_name,
        last_name,
        email,
        discord_username,
        preferred_stack,
        tier: Number(tier),
        role,
        leader,
        previously_participated,
        how_heard_about,
        when_available,
        would_like_to_improve,
        way_to_contact,
      },
      {
        returning: 'minimal',
      }
    );
    if (result.error) {
      console.log(result);
      return redirect('/cohort-signup?error=dbError', result.status);
    }
  } catch (e) {
    console.error('Error', e);
    return redirect('/cohort-signup?error=error', 500);
  }
  return redirect('/cohort-signup-success');
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
    e.preventDefault();
  };

  if (!loaderData?.cohort?.name) {
    return (
      <StaticContentLayout>
        <H2>No upcoming Cohorts</H2>
      </StaticContentLayout>
    );
  }

  return (
    <StaticContentLayout>
      <H2>
        Apply for <strong>{loaderData.cohort.name}</strong>
      </H2>
      <Row gap={16}>
        <P style={{ marginBottom: 0 }}>
          <strong>Start Date:</strong>{' '}
          {format(new Date(loaderData.cohort.start_date), 'MMMM dd, yyyy')}
        </P>
        <P style={{ marginBottom: 0 }}>
          <strong>End Date:</strong> {format(new Date(loaderData.cohort.end_date), 'MMMM dd, yyyy')}
        </P>
      </Row>
      <Divider />
      {loaderData.errorParam && (
        <ErrorMsg>
          Failed to Submit Form. Please try again or contact us: {loaderData.errorParam}
        </ErrorMsg>
      )}
      <form method="post" onSubmit={submitForm}>
        <input {...register('cohortId')} type="hidden" value={loaderData.cohort.id} />
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
          label="Email"
          id="email-field"
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
          label="Preferred Technology, Languages, or Frameworks"
          id="preferred-stack"
          fullWidth
          errorMsg={isDefined(errors.preferredStack) ? errors.preferredStack.message : ''}
          {...register('preferredStack', {
            required: {
              value: true,
              message: 'Preferred Stack is required',
            },
          })}
        />
        <FieldInput
          label="Discord Username (optional)"
          id="discord-username"
          fullWidth
          {...register('discordUsername')}
        />
        <Controller
          control={control}
          name="role"
          rules={{
            required: {
              value: true,
              message: 'Preferred Role is required',
            },
          }}
          render={({ field: { name, onChange } }) => (
            <RadioGroup
              label="Which is your preferred role on a project?"
              errorMsg={isDefined(errors.role) ? errors.role.message : ''}
            >
              <RadioButton
                onChange={onChange}
                name={name}
                label="Front End"
                id="role-fe"
                value="FE"
              />
              <RadioButton
                onChange={onChange}
                name={name}
                label="Back End"
                id="role-be"
                value="BE"
              />
              <RadioButton
                onChange={onChange}
                name={name}
                label="Full Stack"
                id="role-fs"
                value="FS"
              />
              <RadioButton
                onChange={onChange}
                name={name}
                label="UI/UX Designer"
                id="role-ux"
                value="UX"
              />
            </RadioGroup>
          )}
        />
        <Controller
          control={control}
          name="tier"
          rules={{
            required: {
              value: true,
              message: 'Project type is required',
            },
          }}
          render={({ field: { name, onChange } }) => (
            <RadioGroup
              label="Which kind of project are you most interested in?"
              errorMsg={isDefined(errors.tier) ? errors.tier.message : ''}
            >
              <RadioButton
                onChange={onChange}
                name={name}
                label="HTML/CSS/JS (Beginner)"
                id="tier-beginner"
                value={ProjectTier.BEGINNER}
              />
              <RadioButton
                onChange={onChange}
                name={name}
                label="Frontend Framework (Intermediate)"
                id="tier-intermediate"
                value={ProjectTier.INTERMEDIATE}
              />
              <RadioButton
                onChange={onChange}
                name={name}
                label="Full stack (Advanced)"
                id="tier-advanced"
                value={ProjectTier.ADVANCED}
              />
            </RadioGroup>
          )}
        />
        <Controller
          control={control}
          name="wantsToLead"
          rules={{
            required: {
              value: true,
              message: 'Leadership preference is required',
            },
          }}
          render={({ field: { name, onChange } }) => (
            <RadioGroup
              label="Would you be interested in leading a team?"
              errorMsg={isDefined(errors.wantsToLead) ? errors.wantsToLead.message : ''}
            >
              <RadioButton
                onChange={onChange}
                name={name}
                label="Yes"
                id="wants-to-lead-yes"
                value="true"
              />
              <RadioButton
                onChange={onChange}
                name={name}
                label="No"
                id="wants-to-lead-no"
                value="false"
              />
            </RadioGroup>
          )}
        />
        <Controller
          control={control}
          name="previouslyParticipated"
          rules={{
            required: {
              value: true,
              message: 'Previously participated is required',
            },
          }}
          render={({ field: { name, onChange } }) => (
            <RadioGroup
              label="Have you participated in a previous cohort?"
              errorMsg={
                isDefined(errors.previouslyParticipated)
                  ? errors.previouslyParticipated.message
                  : ''
              }
            >
              <RadioButton
                onChange={onChange}
                name={name}
                label="Yes"
                id="prev-participated-yes"
                value="true"
              />
              <RadioButton
                onChange={onChange}
                name={name}
                label="No"
                id="prev-participated-no"
                value="false"
              />
            </RadioGroup>
          )}
        />
        <FieldInput
          label="How did you hear about the Cohort? (Optional)"
          id="heard-about-cohort"
          fullWidth
          errorMsg={isDefined(errors.howHeardAboutCohort) ? errors.howHeardAboutCohort.message : ''}
          {...register('howHeardAboutCohort')}
        />
        <FieldInput
          label="When are you available for weekly virtual meetings?"
          id="weekly-availability"
          fullWidth
          errorMsg={isDefined(errors.whenAvailable) ? errors.whenAvailable.message : ''}
          {...register('whenAvailable', {
            required: {
              value: true,
              message: 'Availability is required',
            },
          })}
        />
        <FieldInput
          label="What skills would you like to improve? (Optional)"
          id="improve-skills"
          fullWidth
          errorMsg={isDefined(errors.wouldLikeToImprove) ? errors.wouldLikeToImprove.message : ''}
          {...register('wouldLikeToImprove')}
        />
        <FieldInput
          label="What is the best way to contact you?"
          id="best-way-contact"
          fullWidth
          errorMsg={isDefined(errors.bestWayToContact) ? errors.bestWayToContact.message : ''}
          {...register('bestWayToContact', {
            required: {
              value: true,
              message: 'Best way to contact is required',
            },
          })}
        />
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
