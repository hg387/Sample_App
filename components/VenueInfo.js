import React from 'react';
import CustomizedAccordion from './CustomizedAccordion';

export const VenueInfo = ({ venue, setSelected, selected }) => (
  <CustomizedAccordion
    venue={venue}
    setSelected={(value) => {
      setSelected(value);
    }}
    selected={selected}
  />
);

export default { VenueInfo };
