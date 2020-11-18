import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { Radio, RadioGroup, FormControlLabel, TextField, Input, InputLabel, Grid, FormControl, FormHelperText } from '@material-ui/core'
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

  const handleNext = () => props.setShow(props.show + 1);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [testType, setTestType] = useState("");
  const [testTypeError, setTestTypeError] = useState(null);
  const [testTypeErrorMessage, setTestTypeErrorMessage] = useState("");

  const [testDate, setTestDate] = useState("");
  const [testDateError, setDateTypeError] = useState(null);
  const [testDateErrorMessage, setTestDateErrorMessage] = useState("");

  const [testTargetScore, setTestTargetScore] = useState("");
  const [testTargetScoreError, setTestTargetScoreError] = useState(null);
  const [testTargetScoreErrorMessage, setTestTargetScoreErrorMessage] = useState("");

  const [groupSize, setGroupSize] = useState("");
  const [groupSizeError, setGroupSizeError] = useState(null);
  const [groupSizeErrorMessage, setGroupSizeErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    console.log(event.currentTarget.value)
    setEmail(event.currentTarget.value)
  }

  const handleTestTypeChange = (event) => {
    console.log(event.currentTarget.value)
    setTestType(event.currentTarget.value)
  }

  const handleTestDateChange = (event) => {
    console.log(event.currentTarget.value)
    setTestDate(event.currentTarget.value)
  }

  const handleTestTargetScoreChange = (event) => {
    console.log(event.currentTarget.value)
    setTestTargetScore(event.currentTarget.value)
  }

  const handleGroupSizeChange = (event) => {
    console.log(event.currentTarget.value)
    setGroupSize(event.currentTarget.value)
  }

  const handleBack = () => {
    props.setShow(props.show - 1);
    setEmailError(false);
    setEmailErrorMessage("");
    if (props.show === 2) {
      setEmail("");
    }
  }

  const sendToGoogleForms = (email, testType, testDate, testTargetScore, groupSize) => {
    const url = 'https://script.google.com/macros/s/AKfycbxSQuoJeJTkKolxST5eVJrBi3MrNUebPlZi6tGQzmll34dl1HE/exec'
    axios.get(url, {
      params: {
        email: email,
        testType: testType,
        testDate: testDate,
        testTargetScore: testTargetScore,
        groupSize: groupSize
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

  const handleNextEmail = (event) => {
    event.preventDefault()
    if (ValidateEmail(email)) {
      handleNext()
    } else {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address")
    }
  }

  const handleSubmit = () => {
    completeSubmit(email, testType, testDate, testTargetScore, groupSize);
  }

  const handleExit = () => {
    props.setShow(1)
  }

  const completeSubmit = (email, testType, testDate, testTargetScore, groupSize) => {
    console.log(email, testType, testDate, testTargetScore, groupSize);
    sendToGoogleForms(email, testType, testDate, testTargetScore, groupSize);
    console.log("submitted");
    setEmail("");
    setTestType("");
    props.setShow(props.show + 1);
  }

  const helperFunction = (show) => {
    switch (props.show) {
      case 1:
        return (
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
        )
        break;
      case 2:
        return (
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto', textAlign: 'center' }} justify="center">
                <h4 style={{ textAlign: "center", width: '100%' }} className={classes.formColor} >Let's start by getting your email address!</h4>

              </Grid>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto' }}>
                <TextField
                  style={{ width: '100%', color: 'black', margin: '0 auto' }}
                  type="text"
                  id="email"
                  name="email"
                  label="email address"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                />
                {emailError ?
                  <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{emailErrorMessage}</FormHelperText>
                  : null}
              </Grid>
              <Grid item xs={12} >
                <Button onClick={handleBack} className={classes.formColor} >
                  Back
              </Button>
                <Button onClick={handleNextEmail} className={classes.formColor} >
                  Next
              </Button>
              </Grid>

            </Grid>
          </FormControl>
        )
        break;

      case 3:
        return (
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto', textAlign: 'center' }} justify="center">
                <h4 style={{ textAlign: "center", width: '100%' }} className={classes.formColor} >Which test are you studying for?</h4>

              </Grid>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto' }}>
                <RadioGroup aria-label="test-type" name="test-type" onChange={handleTestTypeChange}>
                  <FormControlLabel value="LSAT" control={<Radio />} label="LSAT" />
                  <FormControlLabel value="GRE" control={<Radio />} label="GRE" />
                  <FormControlLabel value="GMAT" control={<Radio />} label="GMAT" />
                </RadioGroup>
                {testTypeError ?
                  <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{testTypeErrorMessage}</FormHelperText>
                  : null}
              </Grid>
              <Grid item xs={12} >
                <Button onClick={handleBack} className={classes.formColor} >
                  Back
            </Button>
                <Button onClick={handleNext} className={classes.formColor} >
                  Next
            </Button>
              </Grid>

            </Grid>
          </FormControl>
        )
        break;

      case 4:
        return (
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto', textAlign: 'center' }} justify="center">
                <h4 style={{ textAlign: "center", width: '100%' }} className={classes.formColor} >When are you next taking the test?</h4>

              </Grid>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto' }}>
                <form className={classes.container} noValidate>
                  <TextField
                    onChange={handleTestDateChange}
                    id="date"
                    label="Test Date"
                    type="date"
                    variant="outlined"
                    // defaultValue="2021-02-10"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                {testDateError ?
                  <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{testDateErrorMessage}</FormHelperText>
                  : null}
              </Grid>
              <Grid item xs={12} >
                <Button onClick={handleBack} className={classes.formColor} >
                  Back
              </Button>
                <Button onClick={handleNext} className={classes.formColor} >
                  Next
              </Button>
              </Grid>

            </Grid>
          </FormControl>
        )
        break;

      case 5:
        return (
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto', textAlign: 'center' }} justify="center">
                <h4 style={{ textAlign: "center", width: '100%' }} className={classes.formColor} >What is your target score?</h4>

              </Grid>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto' }}>
                <form className={classes.container} noValidate>
                  <TextField
                    onChange={handleTestTargetScoreChange}
                    id="score"
                    label="Target Score"
                    type="number"
                    variant="outlined"
                    // defaultValue="2021-02-10"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                {testTargetScoreError ?
                  <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{testTargetScoreErrorMessage}</FormHelperText>
                  : null}
              </Grid>
              <Grid item xs={12} >
                <Button onClick={handleBack} className={classes.formColor} >
                  Back
                </Button>
                <Button onClick={handleNext} className={classes.formColor} >
                  Next
                </Button>
              </Grid>

            </Grid>
          </FormControl>
        )
        break;
      case 6:
        return (
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto', textAlign: 'center' }} justify="center">
                <h4 style={{ textAlign: "center", width: '100%' }} className={classes.formColor} >Would you prefer to study with a partner or group?</h4>

              </Grid>
              <Grid item xs={12} sm={7} style={{ margin: '0 auto' }}>
                <form className={classes.container} noValidate>
                  <RadioGroup aria-label="test-type" name="test-type" onChange={handleGroupSizeChange}>
                    <FormControlLabel value="Partner" control={<Radio />} label="Partner" />
                    <FormControlLabel value="Group" control={<Radio />} label="Group" />
                  </RadioGroup>
                </form>
                {groupSizeError ?
                  <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{groupSizeErrorMessage}</FormHelperText>
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
        )
        break;

      case 7:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <p>Thank you for submitting your form. We will be in touch soon!</p>
              <Button onClick={handleExit} className={classes.formColor} >
                Back to Home
        </Button>
            </Grid>
          </Grid>
        )
        break;

      default:
        return (
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
        )
    }
  }

  return (
    <>
      <ProductHeroLayout id={'top'} backgroundClassName={classes.background} style={{ background: 'none' }}>
        {helperFunction(props.show)}
      </ProductHeroLayout>
    </>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
