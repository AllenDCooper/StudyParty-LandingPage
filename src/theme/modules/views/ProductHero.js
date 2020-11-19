import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

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

  const handleClickOpen = () => {
    console.log('handleClickOpen run')
    props.setShow(1);
  };


  return (
    <>

    {/* Default View / No Modal */}

      <ProductHeroLayout id={'top'} backgroundClassName={classes.background} style={{ background: 'none' }}>
        {/* {helperFunction(props.show)} */}
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
            onClick={handleClickOpen}
          >
            Get Started
          </Button>
        </>
      </ProductHeroLayout>
    </>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
