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
import CalendarInput from './CalendarInput';
// import question data
import questionArr from '../data/questionArr';
import { DateTime } from 'luxon';

const styles = (theme) => ({
  button: {
    minWidth: 200,
  },
});

function DialogModal(props) {

  // console.log(questionArr); 
  const { classes } = props;

  // Hooks
  const [valueObj, setValueObj] = useState({
    testDate: null,
    availability: null,
    studyGroup: null,
    testPrep: null,
    targetScore: null,
    targetSection: null,
    timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1],
    timeZoneOffset:new Date().getTimezoneOffset(),
    timeZoneLocation:DateTime.fromMillis(new Date().getTime()).zoneName,
    email: null,
    name: null,
  });
  // const [responseRecieved, setResponseRecieved] = useState(false);
  const [emailResponseReceived, setEmailResponseRecieved] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleClose = () => {
    props.setShow(0);
  };

  // send user name and email address to server to generate automated email
  const sendToServer = (valueObj) => {
    axios.post(process.env.REACT_APP_BACKEND_URL, {
      ...valueObj
    },
      {
        headers:
          { 'Access-Control-Allow-Origin': '*' }
      }
    )
      .then(response => {
        console.log("email sent")
        if(response.status===200){
          setEmailResponseRecieved(true);
        }
      })
      .catch(error => {
        console.log(error);
        setEmailResponseRecieved(true);
        setSubmitError(true);
      });
  }

  const handleSubmit = () => {
    sendToServer(valueObj);
  }

  return (
    <>
      {/* Autogenerate form from question array */}
      {questionArr.map((item, index) =>
        item.questionType === 'dropdown' ?
          <Dropdown
            questionObj={item}
            valueObj={valueObj}
            index={index}
            setValueObj={setValueObj}
            show={props.show}
            setShow={props.setShow}
            questionArrLength={questionArr.length}
            handleSubmit={handleSubmit}
            handleClose={handleClose} />
          :
          item.questionType === 'emailInput' ?
            <EmailInput
              questionObj={item}
              valueObj={valueObj}
              setValueObj={setValueObj}
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
                valueObj={valueObj}
                setValueObj={setValueObj}
                show={props.show}
                setShow={props.setShow}
                index={index}
                questionArrLength={questionArr.length}
                handleSubmit={handleSubmit}
                handleClose={handleClose} />
              :
              item.questionType === 'multipleShortAnswer' ?
                <ShortAnswerInput
                  questionObj={item}
                  valueObj={valueObj}
                  setValueObj={setValueObj}
                  show={props.show}
                  setShow={props.setShow}
                  index={index}
                  questionArrLength={questionArr.length}
                  handleSubmit={handleSubmit}
                  handleClose={handleClose} />
                :
                item.questionType === 'calendar' ?
                  <CalendarInput
                    questionObj={item}
                    valueObj={valueObj}
                    setValueObj={setValueObj}
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
      // transitionDuration={400}
      >
        {!emailResponseReceived ?
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