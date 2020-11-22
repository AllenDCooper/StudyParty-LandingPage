const questionArr = [
  { questionName: 'testType', questionText: 'Which test are you studying for?', answerOptionsArr: ['LSAT', 'GRE', 'GMAT', 'MCAT'], questionErrorMessage: 'Please select an option', questionType: 'dropdown' },
  { questionName: 'testDate', questionText: 'What is your anticipated test date?', questionType: 'dateSelect' },
  { questionName: 'studyGroup', questionText: 'Are you looking for a study partner or group?', answerOptionsArr: ['Partner', 'Group'], questionErrorMessage: 'Please select an option', questionType: 'dropdown' },
  { questionName: 'testPrep', questionText: 'How much test prep have you already done?', answerOptionsArr: ['A lot', 'A little', 'none'], questionErrorMessage: 'Please select an option', questionType: 'dropdown' },
  { questionName: 'email', questionText: 'Please provide your email address:', questionErrorMessage: 'Please enter a valid email address', questionType: 'emailInput' }
]

export default questionArr;