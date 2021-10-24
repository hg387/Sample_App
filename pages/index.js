import React, {useEffect, useState} from 'react'
import { SearchBox } from '../components/SearchBox';
import { VenuesInfo } from '../components/VenuesInfo'

export default function  Home({response}) {
     var venuesList = response.response.venues
     const [userInputText, setUserInputText] = useState("");

    return (
        <div>
            <SearchBox userData={userInputText} setUserData={setUserInputText} />
            <VenuesInfo VenuesInit={venuesList} userInputText={userInputText}/>
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
