import * as React from 'react';
import { H2, P } from '~/library/components/Typography';

const UnderConstruction = () => (
  <>
    <H2 center>Under Construction</H2>
    <P center>Check back later</P>
    <img
      src="/img/under-construction.svg"
      alt="under construction"
      style={{
        width: '750px',
        maxWidth: '100%',
        display: 'block',
        margin: 'auto',
      }}
    />
  </>
);

export default UnderConstruction;
