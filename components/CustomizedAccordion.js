import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: 2 }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0.5),
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2vw',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordion({venue}) {
  const [expanded, setExpanded] = useState("")
  const[data, setData]  = useState("")

  const fetchDesc = async() => {
      const data = await fetch(`http://localhost:3000/api/venue/${venue.id}`)
      const res = await data.json()

      console.log(res.response.venue)
      
      if (!res.response.venue.description){
        setData("No Description Available")
      }
      else{
        setData(res.response.venue.description)
      }
  }

  const handleChange = (panel) => async (event, newExpanded) => {
    if (newExpanded) {
      await(fetchDesc())
    }

    setExpanded(newExpanded ? panel : false)
    
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Grid container spacing={0.1} rowSpacing={0.1} columnSpacing={0.1}>
          <Grid item xs={3}>
              <Typography sx ={{fontSize: '1.5vw', display:'block', fontWeight: 'bold',}}>{venue.name}</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx ={{fontSize: '1.25vw', display:'block'}}>{venue.location.formattedAddress.join()}</Typography>
          </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx ={{fontSize: 'xx-small'}}>
            {data}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
