import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import {Input, InputLabel } from '@material-ui/core'
import ProductHeroLayout from './ProductHeroLayout';
import Video from '../components/Video';

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
});

function ProductHero(props) {
  const { classes } = props;

  const [show, setShow] = useState(1);
  const handleBack = () => setShow(1);
  const handleNext = () => setShow(2);

  const [username, setUsername] = useState("")
  const handleChange = (event) => {
    setUsername(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("submitted");
    setShow(1);
  }

  return (
    <>
      <ProductHeroLayout backgroundClassName={classes.background}>
        {show === 1 ?
          <>
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <h2 className="main-title" style={{ marginBottom: '20px' }}>
              <span className="permanent-marker pink">StudyParty</span>
            </h2>
            <span style={{ width: "100px", borderBottom: "4px solid white" }}></span>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
              Rhoncus est pellentesque elit ullamcorper dignissim cras
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
            <div className="row">
              <div className="input-field col s6">
                <InputLabel style={{marginBottom: '30px', color: 'white' }}>Please enter your email address:</InputLabel>
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
            </div>
          </form>}
      </ProductHeroLayout>
    </>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
