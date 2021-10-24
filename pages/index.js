import React, {useEffect, useState} from 'react'
import { SearchBox } from '../components/SearchBox';
import { VenuesInfo } from '../components/VenuesInfo'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { autocompleteClasses } from '@mui/material';
import { MyMap } from '../components/MyMap';
import styles from '../styles/Home.module.css'


var coordsInitial = [39.95, -75.16]

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function  Home({response}) {
    //var venuesList = response.response.venues

    const [selected, setSelected] = React.useState(null)
    const [userInputText, setUserInputText] = useState("")
    const [venuesList, setVenuesList] = useState(response.response.venues)
    const [latLngMap, setLatLngMap] = useState(coordsInitial)
    
    function InnerGrid() {
        return (
          <>
            <Grid item xs={12} sx={{p: 0,}}>
                <Item><SearchBox userData={userInputText} setUserData={setUserInputText} /></Item>
            </Grid>
            <Box style={{maxHeight: '80vh', overflow: 'auto', height:'50%',}}>
            <Grid item xs={12}>
                <Item><VenuesInfo setLatLngMap={setLatLngMap} VenuesInit={venuesList} userInputText={userInputText}/></Item>
            </Grid>
            </Box>
          </>
        );
      }

    function prevReturn(){
        return (
            <>
            <Grid container spacing={0.5} rowSpacing={0.5} columnSpacing={0.5}>
                <Grid item xs={4} sx={{ml: 5, mt: 5, p:0,}}>
                    <InnerGrid />
                </Grid>
                <Grid item xs={8}>
                    <Item></Item>    
                </Grid>
            </Grid>
            </>
        )
    }

    return (
        <div>  
            <div className={styles.search}>
                <SearchBox userData={userInputText} setUserData={setUserInputText} />
                <div className={styles.infoBar}>
                    <VenuesInfo setLatLngMap={setLatLngMap} VenuesInit={venuesList} userInputText={userInputText}/>
                </div>
            </div>
                
            <MyMap latLngMap={latLngMap}/>
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
