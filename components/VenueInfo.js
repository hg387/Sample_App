import React from 'react'
import CustomizedAccordion from './CustomizedAccordion'

export const VenueInfo = ({venue}) => {
    return (  
        <CustomizedAccordion venue = {venue}/>         
        // <div key={venue.id}>
        //     <h2>{venue.id}</h2>
        //     <h1>{venue.name}</h1>
        // </div>
    )
}
