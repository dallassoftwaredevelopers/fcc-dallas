import * as React from 'react';
import { match } from 'ts-pattern';
import { H4 } from '~/library/components/Typography';
import { ApplicantResponse } from '~/routes/dashboard/admin/cohort-rosters';

interface RosterExpandedProps {
  data: ApplicantResponse;
}

const DataPoint = ({ label, data }: { label: string; data: string | number }) => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <div>
      <strong>{label}</strong>
    </div>
    <div>{data}</div>
  </div>
);

export const RosterExpanded: React.FC<RosterExpandedProps> = ({ data }) => (
  <div style={{ margin: '1rem 0' }}>
    <H4>
      {data.first_name} {data.last_name}
    </H4>
    <DataPoint label="Email" data={data.email} />
    <DataPoint label="Preferred Contact" data={data.way_to_contact} />
    <DataPoint label="Preferred Stack" data={data.preferred_stack} />
    <DataPoint
      label="Preferred Role"
      data={match(data.role)
        .with('FS', () => 'Full Stack')
        .with('FE', () => 'Front End')
        .with('BE', () => 'Back End')
        .with('UX', () => 'UX Designer')
        .exhaustive()}
    />
    <DataPoint label="Wants to lead" data={data.leader ? 'Yes' : 'No'} />
    <DataPoint label="Previous Participated" data={data.previously_participated ? 'Yes' : 'No'} />
    <DataPoint label="Tier" data={data.tier} />
    <DataPoint label="Availability" data={data.when_available} />
    <DataPoint label="Would like to Improve" data={data.would_like_to_improve} />
    <DataPoint
      label="How heard about Cohorts"
      data={data.how_heard_about?.trim() || '[[No response]]'}
    />
  </div>
);
