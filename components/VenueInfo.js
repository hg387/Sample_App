import React from 'react'
import CustomizedAccordion from './CustomizedAccordion'

export const VenueInfo = ({venue, setSelected, selected}) => {
    return (  
        <CustomizedAccordion venue={venue}  setSelected={(value)=>{setSelected}} selected={selected}/>   
    )
}

export default {VenueInfo}