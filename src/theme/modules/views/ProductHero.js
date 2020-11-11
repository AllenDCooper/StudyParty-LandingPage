import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { Input, InputLabel, Grid, FormControl, FormHelperText } from '@material-ui/core'
import ProductHeroLayout from './ProductHeroLayout';
import Video from '../components/Video';
import axios from 'axios';
import { PlayCircleFilledWhite } from '@material-ui/icons';

const backgroundImage =
  '';

const styles = (theme) => ({
  background: {
    // backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  formColor: {
    color: 'black'
  }
});

function ProductHero(props) {
  console.log(props)
  const { classes } = props;

  const handleNext = () => props.setShow(2);

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setEmail(event.currentTarget.value)
  }

  const handleBack = () => {
    props.setShow(1);
    setEmail("");
    setError(false);
    setErrorMessage("");
  }

  const sendToGoogleForms = (email) => {
    const url = 'https://script.google.com/macros/s/AKfycbxSQuoJeJTkKolxST5eVJrBi3MrNUebPlZi6tGQzmll34dl1HE/exec'
    axios.get(url, {
      params: {
        email: email
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const ValidateEmail = (emailTest) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailTest)) {
      return (true)
    }
    return (false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (ValidateEmail(email)) {
      completeSubmit(email);
    } else {
      setError(true);
      setErrorMessage("Please enter a valid email address")
    }
  }

  const completeSubmit = (email) => {
    console.log(email)
    sendToGoogleForms(email)
    console.log("submitted");
    setEmail("")
    props.setShow(3);
  }

  return (
    <>
      <ProductHeroLayout id={'top'} backgroundClassName={classes.background} style={{ background: 'none' }}>
        {/* <div style={{backgroundColor: 'white', opacity: '0.25'}}> */}
        {props.show === 1 ?
          <>
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center" style={{ textTransform: "none", fontFamily: 'PT Sans, sans-serif', fontWeight: '700' }}>
              Better Scores, <br></br>More Fun
            </Typography>
            {/* <span style={{ width: "100px", borderBottom: "4px solid white" }}></span> */}
            <Typography color="inherit" align="center" variant="h5" className={classes.h5} style={{ fontWeight: '400', fontSize: '16px', marginTop: '40px', maxWidth: '500px' }}>
              Studying for the LSAT? Study Party is a new way to find a virtual study partner or group. Improve your score while meeting other future law students.
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              className={classes.button}
              component="a"
              onClick={handleNext}
            >
              Get Started
            </Button>
          </>
          :
          props.show === 2 ?

            <FormControl>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputLabel style={{ marginBottom: '30px', width: '100%' }} className={classes.formColor} >Please enter your email address:</InputLabel>

                </Grid>
                <Grid item xs={10} style={{ margin: '0 auto' }}>
                  <Input
                    style={{ width: '80%', color: 'black' }}
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    error={error}
                  />
                  {error ? 
                  <FormHelperText id="helper-text" style={{textAlign: 'center', marginTop: '20px', color: 'red'}} >{errorMessage}</FormHelperText> 
                  : null}
                </Grid>
                <Grid item xs={12} >
                  <Button onClick={handleBack} className={classes.formColor} >
                    Back
              </Button>
                  <Button onClick={handleSubmit} className={classes.formColor} >
                    Submit
              </Button>
                </Grid>

              </Grid>
            </FormControl>
            :
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <p>Thank you for submitting your form. We will be in touch soon!</p>
                <Button onClick={handleBack} className={classes.formColor} >
                  Back
                </Button>
              </Grid>
            </Grid>
        }
        {/* </div> */}
      </ProductHeroLayout>
    </>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
