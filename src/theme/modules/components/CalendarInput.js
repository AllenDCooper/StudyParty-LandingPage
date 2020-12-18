import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormHelperText } from '@material-ui/core'
import CalendarSelect from './CalendarSelect';

const styles = (theme) => ({
  button: {
    minWidth: 200,
  },
});

function CalendarInput(props) {
  // console.log(props)
  const { classes } = props;

  // destructure question object from props
  const { questionName, questionText, questionErrorMessage } = props.questionObj;

  const questionNum = props.index + 1;

  // hooks
  const [value, setValue] = useState("");
  const [error, setError] = useState("null");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (value) => {
    setValue(value)
    console.log(value)
  }

  const updateValueArr = () => {
    const obj = {...props.valueArr};
    obj[questionName] = value
    props.setValueArr(obj);
  }

  const handleNext = () => {
    console.log(value)
    if (value.length > 2) {
      setError(false);
      setErrorMessage("");
      updateValueArr();
      props.setShow(props.show + 1)
    } else {
      console.log(`error run`)
      console.log(questionErrorMessage)
      setError(true);
      setErrorMessage(questionErrorMessage)
    }
  }

  const handleBack = () => {
    setValue("");
    setError(false);
    setErrorMessage("");
    props.setShow(props.show - 1)
  }

  return (
    <>
      <Dialog
        open={props.show === questionNum}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'lg'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Sign up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {questionText}
          </DialogContentText>
          <CalendarSelect
            style={{ width: '100%', color: 'black', margin: '0 auto' }}
            id={questionName}
            name={questionName}
            label={questionName}
            variant="outlined"
            value={value}
            onChange={handleChange}
            error={errorMessage}
          />
          {/* <TextField
            style={{ width: '100%', color: 'black', margin: '0 auto' }}
            type="text"
            id="email"
            name="email"
            label="email address"
            variant="outlined"
            value={value}
            onChange={handleChange}
            error={errorMessage}
          /> */}
          {error ?
            <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{errorMessage}</FormHelperText>
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} color="primary">
            Back
          </Button>
          {props.index === (props.questionArrLength - 1) ?
            <Button onClick={() => { updateValueArr(); props.handleSubmit() }}>
              Submit
          </Button>
            :
            <Button onClick={handleNext} color="primary">
              Next
          </Button>}
        </DialogActions>
      </Dialog>
    </>
  )
}

CalendarInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarInput);