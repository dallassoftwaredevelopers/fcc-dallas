import * as React from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { match, P as Pattern } from 'ts-pattern';
import {
  ActionFunction,
  Form,
  json,
  LinksFunction,
  MetaFunction,
  useActionData,
  useSubmit,
} from 'remix';
import { supabase } from '~/db/supabase.server';
import FieldInput from '~/library/components/FieldInput';
import { H2, P } from '~/library/components/Typography';
import { isDefined } from '~/utils';
import ErrorMsg from '~/library/components/ErrorMsg';
import Label from '~/library/components/Label';
import Button from '~/library/components/Button';
import { getRole } from '~/utils/auth';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/4.8.0/react-datepicker.min.css',
  },
];

export const meta: MetaFunction = () => ({
  title: 'Create Cohort',
  description: 'Create new Cohort',
});

type ActionData = { type: 'error'; message: string } | { type: 'success' };
interface NewCohortForm {
  name: string;
  startDate: Date;
  endDate: Date;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const startDate = form.get('startDate');
  const endDate = form.get('endDate');
  if (typeof name !== 'string') {
    throw json(
      {
        message: 'Name is required',
      },
      400
    );
  }
  if (typeof startDate !== 'object' || !startDate) {
    throw json(
      {
        message: 'Start Date is required',
      },
      400
    );
  }
  if (typeof endDate !== 'object' || !endDate) {
    throw json(
      {
        message: 'End Date is required',
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
  const { data, error } = await supabase.from('cohort').insert([
    {
      name,
      start_date: startDate,
      end_date: endDate,
    },
  ]);
  if (error) {
    return json({
      type: 'error',
      message: `Unexpected error: ${error}`,
    });
  }
  return json({
    type: 'success',
    data,
  });
};

function CreateCohort() {
  const submit = useSubmit();
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, trigger, control } = useForm<NewCohortForm>();
  const { errors } = useFormState({ control });
  const actionDate = useActionData<ActionData>();

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
      <Form method="post" onSubmit={submitForm}>
        <H2>Create Cohort (WORK IN PROGRESS)</H2>
        <P>
          Create a new cohort. If the cohort start date is in the future, and there are no other
          more recent cohort start dates, it will display on the Cohort Signup Page.
        </P>
        <FieldInput
          label="Name"
          id="name"
          fullWidth
          errorMsg={isDefined(errors.name) ? errors.name.message : ''}
          {...register('name', {
            required: {
              value: true,
              message: 'Name is required',
            },
          })}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Label label="Start Date" htmlFor="startDate" />
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker selected={value} onChange={onChange} />
              )}
            />
            {match(errors.startDate?.message)
              .with(Pattern.nullish, () => null)
              .otherwise((m) => (
                <ErrorMsg>{m}</ErrorMsg>
              ))}
          </div>
          <div>
            <Label label="End Date" htmlFor="endDate" />
            <Controller
              name="endDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker selected={value} onChange={onChange} />
              )}
            />
            {match(errors.endDate?.message)
              .with(Pattern.nullish, () => null)
              .otherwise((m) => (
                <ErrorMsg>{m}</ErrorMsg>
              ))}
          </div>
        </div>
        <Button type="submit" style={{ margin: '1rem 0' }}>
          Create Cohort
        </Button>
      </Form>
      {match(actionDate)
        .with({ type: 'error' }, ({ message }) => <ErrorMsg>{message}</ErrorMsg>)
        .otherwise(() => null)}
    </div>
  );
}

export default CreateCohort;
