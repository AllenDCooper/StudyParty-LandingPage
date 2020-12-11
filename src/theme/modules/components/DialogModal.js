import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@material-ui/core'
import axios from 'axios';
// import components
import Button from './Button';
import Dropdown from './Dropdown';
import EmailInput from './EmailInput';
import DateInput from './DateInput';
import ShortAnswerInput from './ShortAnswerInput';
// import question data
import questionArr from '../data/questionArr';

const styles = (theme) => ({
  button: {
    minWidth: 200,
  },
});

function DialogModal(props) {

  console.log(questionArr);
  const { classes } = props;

  // Instantiates an array to capture answers and to be stored in state
  const initialValueArr = questionArr.map((item) => {
    const name = item.name;
    const newObj = {}
    newObj[name] = null
    return newObj
  })

  // Hooks
  const [valueArr, setValueArr] = useState(initialValueArr);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleClose = () => {
    props.setShow(0);
  };

  // Sends data to populate Google Sheet
  const sendToGoogleForms = () => {
    props.setShow(props.show + 1);
    console.log(props.show)
    console.log(valueArr)
    const [testType, testDate, groupSize, testPrep, targetScore, targetSection, email, name] = valueArr
    const url = 'https://script.google.com/macros/s/AKfycbxSQuoJeJTkKolxST5eVJrBi3MrNUebPlZi6tGQzmll34dl1HE/exec'
    axios.get(url, {
      params: {
        email: email,
        name: name,
        testType: testType,
        testDateMonth: testDate.getMonth() + 1,
        testDateYear: testDate.getFullYear(),
        testPrep: testPrep,
        groupSize: groupSize,
        targetScore: targetScore,
        targetSection: targetSection
      }
    })
      .then(function (response) {
        setResponseRecieved(true);
        console.log("submitted");
        console.log(response)
      })
      .catch(function (error) {
        setSubmitError(true);
        console.log(error)
      })
  }

  const handleSubmit = () => {
    sendToGoogleForms();
  }

  return (
    <>
    {/* Autogenerate form from question array */}
      {questionArr.map((item, index) =>
        item.questionType === 'dropdown' ?
          <Dropdown
            questionObj={item}
            valueArr={valueArr}
            setValueArr={setValueArr}
            show={props.show}
            setShow={props.setShow}
            index={index}
            questionArrLength={questionArr.length}
            handleSubmit={handleSubmit}
            handleClose={handleClose} />
          :
          item.questionType === 'emailInput' ?
            <EmailInput
              questionObj={item}
              valueArr={valueArr}
              setValueArr={setValueArr}
              show={props.show}
              setShow={props.setShow}
              index={index}
              questionArrLength={questionArr.length}
              handleSubmit={handleSubmit}
              handleClose={handleClose} />
            :
            item.questionType === 'dateSelect' ?
              <DateInput
                questionObj={item}
                valueArr={valueArr}
                setValueArr={setValueArr}
                show={props.show}
                setShow={props.setShow}
                index={index}
                questionArrLength={questionArr.length}
                handleSubmit={handleSubmit}
                handleClose={handleClose} />
              :
              item.questionType === 'shortAnswer' ?
              <ShortAnswerInput
                questionObj={item}
                valueArr={valueArr}
                setValueArr={setValueArr}
                show={props.show}
                setShow={props.setShow}
                index={index}
                questionArrLength={questionArr.length}
                handleSubmit={handleSubmit}
                handleClose={handleClose} />
              :
              null
      )}

      {/* Display upon submission */}
      <Dialog
        open={props.show === (questionArr.length + 1)}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        {!responseRecieved ?
          <DialogContentText
            style={{
              textAlign: 'center',
              height: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CircularProgress />
          </DialogContentText>
          :
          <>
            <DialogTitle id="form-dialog-title">Thank you!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {!submitError ?
                  `Thanks for signing up! We'll be in touch soon.`
                  :
                  `There was an error. Please try again.`
                }
                <br></br><br></br>Cheers,<br></br>Team StudyParty
          </DialogContentText>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Back to Home
          </Button>
              </DialogActions>
            </DialogContent>
          </>
        }
      </Dialog>
    </>
  )
}

DialogModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogModal);