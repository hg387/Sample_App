import React, {useEffect} from 'react'
import { VenuesInfo } from '../components/VenuesInfo'

export default function  Home({response}) {
    
    var venuesList = response.response.venues
    return (
        <div>
          <VenuesInfo VenuesInit={venuesList}/>
        </div>
    )
}

export const getServerSideProps = async() => {
    const testForsquare = await fetch('http://localhost:3000/api/venues')
    
    const response = await testForsquare.json()

    return{
        props:{response}
    }
}
