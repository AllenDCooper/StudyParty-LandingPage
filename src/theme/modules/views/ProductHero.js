import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { Input, InputLabel, Grid } from '@material-ui/core'
import ProductHeroLayout from './ProductHeroLayout';
import Video from '../components/Video';
import axios from 'axios';
import { PlayCircleFilledWhite } from '@material-ui/icons';

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(//player.vimeo.com/video/422929122?background=1&muted=1&autoplay=1&loop=1&badge=0&byline=0&title=0&portrait=0)`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
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
    color: 'white'
  }
});

function ProductHero(props) {
  console.log(props)
  const { classes } = props;

  // const [show, setShow] = useState(1);
  const handleBack = () => props.setShow(1);
  const handleNext = () => props.setShow(2);

  const [username, setUsername] = useState("")
  const handleChange = (event) => {
    setUsername(event.currentTarget.value)
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

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(username)
    sendToGoogleForms(username)
    console.log("submitted");
    setUsername("")
    props.setShow(1);
  }

  return (
    <>
      <ProductHeroLayout id={'top'} backgroundClassName={classes.background}>
        {props.show === 1 ?
          <>
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center">
              Better scores, more fun
      </Typography>
            {/* <span style={{ width: "100px", borderBottom: "4px solid white" }}></span> */}
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
              Sign up today to find your StudyParty
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
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputLabel style={{ marginBottom: '30px', width: '100%' }} className={classes.formColor} >Please enter your email address:</InputLabel>

              </Grid>
              <Grid item xs={12}>
                <Input style={{width: '80%', color: 'white'}} type="text" id="username" placeholder="email address" name="username" value={username} onChange={handleChange} />
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

            {/* <div className="row">
              <div className="input-field col s6 ">
                <InputLabel style={{ marginBottom: '30px', color: 'white', width: '100%' }}>Please enter your email address:</InputLabel>
                <Input type="text" id="username" placeholder="email address" name="username" value={username} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <Button onClick={handleBack} >
                Back
            </Button>
              <Button onClick={handleSubmit}>
                Submit
            </Button>
            </div> */}
          </form>}
      </ProductHeroLayout>
    </>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
