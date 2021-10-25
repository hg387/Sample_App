import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import {server} from '../config/'

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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: 2, p: 0, m: 0 }} />}
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
    fontSize: '1.5vw',
    padding: 0,
  },
  '.MuiButtonBase-root': {
    display: 'flex',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordion({ venue, selected, setSelected }) {
  const [details, setDetails] = useState([]);
  const [expanded, setExpanded] = useState('');
  const [data, setData] = useState('');
  const [ratings, setRatings] = useState(0);
  const [URL, setURL] = useState('');
  const [phone, setPhone] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const fetchDesc = async () => {
    const dataNew = await fetch(`${server}/api/venue/${venue.id}`);
    const res = await dataNew.json();

    // console.log(res.response.venue)

    if (res.meta.code !== 200){
      return; 
    }

    if (res.response.venue) {
      setDetails(res.response.venue);
    } else {
      setDetails([]);
    }

    if (!res.response.venue.description) {
      setData('No Description Available');
    } else {
      setData(res.response.venue.description);
    }

    if (res.response.venue.rating) {
      setRatings(res.response.venue.rating);
    } else {
      setRatings(0);
    }

    if (res.response.venue.url) {
      setURL(res.response.venue.url);
    } else {
      setURL('');
    }

    if (res.response.venue.contact) {
      setPhone(res.response.venue.contact.formattedPhone);
    } else {
      setPhone('');
    }

    if (res.response.venue.bestPhoto) {
      // console.log(`${res.response.venue.bestPhoto.prefix}300x300${res.response.venue.bestPhoto.suffix}`)
      setPhotoURL(
        `${res.response.venue.bestPhoto.prefix}300x300${res.response.venue.bestPhoto.suffix}`
      );
    } else {
      setPhotoURL('');
    }
  };

  const handleChange = (panel) => async (event, newExpanded) => {
    if (newExpanded) {
      if (details.length === 0) {
        await fetchDesc();
      }
      setSelected(venue);
    }

    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Grid container spacing={0.1} rowSpacing={0.1} columnSpacing={0.1}>
            <Grid item xs={3}>
              <Typography
                sx={{ fontSize: '15px', display: 'block', fontWeight: 'bold' }}
              >
                {venue.name}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography sx={{ fontSize: '12px', display: 'block' }}>
                {venue.location.formattedAddress.join()}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          {photoURL ? (
            <Box
              component="img"
              sx={{
                height: '25%',
                width: '90%',
                m: 0,
                padding: 0,
              }}
              alt="Image"
              src={photoURL}
            />
          ) : (
            <></>
          )}
          <Typography sx={{ fontSize: 'x-small' }}>{data}</Typography>
          {URL ? (
            <Link href={URL} underline="hover">
              Link
            </Link>
          ) : (
            <></>
          )}
          {phone ? (
            <Typography sx={{ fontSize: 'x-small', fontStyle: 'italic' }}>
              {phone}
            </Typography>
          ) : (
            <></>
          )}
          {ratings !== 0 ? (
            <Rating
              name="read-only"
              precision={0.5}
              size="small"
              value={ratings / 2}
              readOnly
            />
          ) : (
            <Rating name="read-only" size="small" value={ratings} disabled />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
