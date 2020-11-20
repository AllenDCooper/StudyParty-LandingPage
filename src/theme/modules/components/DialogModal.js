import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import { Dialog, Radio, RadioGroup, FormControlLabel, TextField, FormHelperText } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { DatePicker } from "@material-ui/pickers";

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

function DialogModal(props) {
  console.log(props)
  const { classes } = props;

  const handleNext = () => props.setShow(props.show + 1);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [testType, setTestType] = useState("");
  const [testTypeError, setTestTypeError] = useState(null);
  const [testTypeErrorMessage, setTestTypeErrorMessage] = useState("");

  const [testDate, handleTestDate] = useState(new Date());
  const [testDateError, setTestDateError] = useState(null);
  const [testDateErrorMessage, setTestDateErrorMessage] = useState("");
  const curDate = new Date()

  const getFutureDate = () => {
    const curDateCopy = new Date()
    curDateCopy.setMonth(curDateCopy.getMonth() + 12)
    return curDateCopy
  }

  const [testPrep, setTestPrep] = useState("");
  const [testPrepError, setTestPrepError] = useState(null);
  const [testPrepErrorMessage, setTestPrepErrorMessage] = useState("");

  const [groupSize, setGroupSize] = useState("");
  const [groupSizeError, setGroupSizeError] = useState(null);
  const [groupSizeErrorMessage, setGroupSizeErrorMessage] = useState("");

  const [open, setOpen] = useState(0);


  const handleClickOpen = () => {
    console.log('handleClickOpen run')
    props.setShow(1);
  };

  const handleClose = () => {
    props.setShow(0);
    setTestType("");
    setTestTypeError(false);
    setTestTypeErrorMessage("")
    setGroupSize("");
    setGroupSizeError(false);
    setGroupSizeErrorMessage("");
    setTestPrep("");
    setTestPrepError(false);
    setTestPrepErrorMessage("");
    setEmail("")
    setEmailError(false);
    setEmailErrorMessage("")
  };

  const handleEmailChange = (event) => {
    console.log(event.currentTarget.value)
    setEmail(event.currentTarget.value)
  }

  const handleTestTypeChange = (event) => {
    console.log(event.currentTarget.value)
    setTestType(event.currentTarget.value)
  }

  const handleTestPrep = (event) => {
    console.log(event.currentTarget.value)
    setTestPrep(event.currentTarget.value)
  }

  const handleGroupSizeChange = (event) => {
    console.log(event.currentTarget.value)
    setGroupSize(event.currentTarget.value)
  }

  const handleBack = () => {
    props.setShow(props.show - 1);
  }

  const sendToGoogleForms = (email, testType, testDate, testPrep, groupSize) => {
    const url = 'https://script.google.com/macros/s/AKfycbxSQuoJeJTkKolxST5eVJrBi3MrNUebPlZi6tGQzmll34dl1HE/exec'
    axios.get(url, {
      params: {
        email: email,
        testType: testType,
        testDateMonth: testDate.getMonth() + 1,
        testDateYear: testDate.getFullYear(),
        testPrep: testPrep,
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

  const handleNextTestType = (event) => {
    event.preventDefault()
    if (testType) {
      handleNext()
    } else {
      setTestTypeError(true);
      setTestTypeErrorMessage("Please select an option")
    }
  }

  const handleBackTestType = (event) => {
    setTestType("");
    setTestTypeError(false);
    setTestTypeErrorMessage("")
    handleBack()
  }

  const handleNextGroupSize = (event) => {
    event.preventDefault()
    if (groupSize) {
      handleNext()
    } else {
      setGroupSizeError(true);
      setGroupSizeErrorMessage("Please select an option")
    }
  }

  const handleBackGroupSize = () => {
    setGroupSize("");
    setGroupSizeError(false);
    setGroupSizeErrorMessage("");
    handleBack();
  }

  const handleNextTestPrep = (event) => {
    event.preventDefault()
    if (testPrep) {
      handleNext()
    } else {
      setTestPrepError(true);
      setTestPrepErrorMessage("Please select an option")
    }
  }

  const handleBackTestPrep = () => {
    setTestPrep("");
    setTestPrepError(false);
    setTestPrepErrorMessage("");
    handleBack();
  }

  const handleBackTestDate = () => {
    setTestDateError(false);
    setTestDateErrorMessage("");
    handleBack();
  }

  const handleBackEmail = () => {
    setEmail("");
    setEmailError(false);
    setEmailErrorMessage("");
    handleBack();
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (ValidateEmail(email)) {
      completeSubmit()
    } else {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address")
    }
  }

  const completeSubmit = () => {
    console.log(email, testType, testDate.getMonth() + 1, testDate.getFullYear(), testPrep, groupSize);
    sendToGoogleForms(email, testType, testDate, testPrep, groupSize);
    console.log("submitted");
    setEmail("");
    setTestType("");
    props.setShow(props.show + 1);
  }

  return (
    <>

      {/* Dialog #1: Test Type */}

      <Dialog
        open={props.show === 1}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Sign up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What test are you studying for?
          </DialogContentText>
          <RadioGroup aria-label="test-type" name="test-type" onChange={handleTestTypeChange}>
            <FormControlLabel value="LSAT" control={<Radio />} label="LSAT" />
            <FormControlLabel value="GRE" control={<Radio />} label="GRE" />
            <FormControlLabel value="GMAT" control={<Radio />} label="GMAT" />
            <FormControlLabel value="MCAT" control={<Radio />} label="MCAT" />
          </RadioGroup>
          {testTypeError ?
            <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{testTypeErrorMessage}</FormHelperText>
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackTestType} color="primary">
            Back
          </Button>
          <Button onClick={handleNextTestType} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog #2: What is your anticipated test date? */}

      <Dialog
        open={props.show === 2}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Sign up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What is your anticipated test date?
          </DialogContentText>
          <form className={classes.container} noValidate>
            <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              // helperText="With min and max"
              minDate={curDate}
              maxDate={getFutureDate()}
              value={testDate}
              onChange={handleTestDate}
            />
            {/* <DatePicker
              variant="inline"
              openTo="year"
              views={["year", "month"]}
              label="Year and Month"
              // helperText="Start from year selection"
              minDate={curDate}
              maxDate={getFutureDate()}
              value={testDate}
              onChange={handleTestDate}
            /> */}
          </form>
          {testDateError ?
            <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{testDateErrorMessage}</FormHelperText>
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackTestDate} color="primary">
            Back
          </Button>
          <Button onClick={handleNext} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog #3: Group Size */}

      <Dialog
        open={props.show === 3}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Sign up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you looking for a study partner or group?
          </DialogContentText>
          <form className={classes.container} noValidate>
            <RadioGroup aria-label="test-type" name="test-type" onChange={handleGroupSizeChange}>
              <FormControlLabel value="Partner" control={<Radio />} label="Partner" />
              <FormControlLabel value="Group" control={<Radio />} label="Group" />
            </RadioGroup>
          </form>
          {groupSizeError ?
            <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{groupSizeErrorMessage}</FormHelperText>
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackGroupSize} color="primary">
            Back
          </Button>
          <Button onClick={handleNextGroupSize} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog #4: Test Prep */}

      <Dialog
        open={props.show === 4}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Sign up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How much test prep have you already done?
          </DialogContentText>
          <form className={classes.container} noValidate>
            <RadioGroup aria-label="test-prep" name="test-prep" onChange={handleTestPrep}>
              <FormControlLabel value="A lot" control={<Radio />} label="A lot" />
              <FormControlLabel value="A little" control={<Radio />} label="A little" />
              <FormControlLabel value="None" control={<Radio />} label="None" />
            </RadioGroup>
          </form>
          {testPrepError ?
            <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{testPrepErrorMessage}</FormHelperText>
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackTestPrep} color="primary">
            Back
          </Button>
          <Button onClick={handleNextTestPrep} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog #5: Email */}

      <Dialog
        open={props.show === 5}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Sign up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let's start by getting your email address:
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackEmail} color="primary">
            Back
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog #5: Thank You */}

      <Dialog
        open={props.show === 6}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Thank you!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thanks for your submission!  We'll be in touch soon. <br></br><br></br>Cheers,<br></br>Team StudyParty
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Back to Home
          </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

DialogModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogModal);