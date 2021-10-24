import React, {useEffect, useState} from 'react'
import { SearchBox } from '../components/SearchBox';
import { VenuesInfo } from '../components/VenuesInfo'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { autocompleteClasses } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function  Home({response}) {
     var venuesList = response.response.venues
     const [userInputText, setUserInputText] = useState("");

     function InnerGrid() {
        return (
          <>
            <Grid item xs={12} sx={{p: 0,}}>
                <Item><SearchBox userData={userInputText} setUserData={setUserInputText} /></Item>
            </Grid>
            <Box style={{maxHeight: '80vh', overflow: 'auto', height:'50%',}}>
            <Grid item xs={12}>
                <Item><VenuesInfo VenuesInit={venuesList} userInputText={userInputText}/></Item>
            </Grid>
            </Box>
          </>
        );
      }

    return (
        <>
        <Grid container spacing={0.5} rowSpacing={0.5} columnSpacing={0.5}>
            <Grid item xs={5} sx={{ml: 5, mt: 5, p:0,}}>
                <InnerGrid />
            </Grid>
            <Grid item xs={7}>
                <Item></Item>    
            </Grid>
        </Grid>
        </>
    )
}

export const getServerSideProps = async() => {
    const testForsquare = await fetch('http://localhost:3000/api/venues')
    
    const response = await testForsquare.json()

    return{
        props:{response}
    }
}
