import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.5rem' }} />}
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
    marginLeft: theme.spacing(1),
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
          <Typography sx ={{fontSize: 'small'}}><h2>{venue.name}</h2><p>{venue.location.formattedAddress.join()}</p></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {data}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
