import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import { Box, Button, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { addResumeAPI } from '../services/addapi';
import swal from 'sweetalert';
// import * as yup from 'yup'
import { useFormik } from 'formik'



function Steps({ userInput, setUserInput, setFinish ,setResumeId}) {
  // console.log(userInput);

  // const validationSchema = Yup.Object({
  //   personalDetails: Yup.Object({
  //     name: Yup.string().required("")
  //   })
  // })

  const userSkillRef = React.useRef()

  const steps = ['Basic Information', 'Contact Details', 'Education Details', 'Work Experience', 'Skills & Certifications', 'Review & Submit'];
  const suggestionSkills = ['REACT', 'ANGULAR', 'NODE', 'EXPRESS', 'MONGODB', 'JAVASCRIPT', 'GIT', 'TAILWIND']

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());


  // formik initial values
  const formik = useFormik({
    initialValues: {
      name: userInput.personalDetails.name,
      jobTitle: userInput.personalDetails.jobTitle,
      location: userInput.personalDetails.location,
      email: userInput.personalDetails.email,
      phone: userInput.personalDetails.phone,
      github: userInput.personalDetails.github,
      linkedIn: userInput.personalDetails.linkedIn,
      portfolio: userInput.personalDetails.portfolio,
      course: userInput.education.course,
      college: userInput.education.college,
      university: userInput.education.university,
      year: userInput.education.year,
      job: userInput.experience.job,
      company: userInput.experience.company,
      expLocation: userInput.experience.location,
      duration: userInput.experience.duration,
      summary: userInput.summary,
      skills: userInput.skills

    },

    validate: (values) => {
      const errors = {}

      if (activeStep === 0) {
        if (!values.name) {
          errors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
          errors.name = 'Name must contain only letters';
        }
        if (!values.jobTitle) errors.jobTitle = 'Job title is required';
        if (!values.location) errors.location = 'Location is required';
      }

      if (activeStep === 1) {
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.phone) {
          errors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(values.phone)) {
          errors.phone = 'Phone number must be exactly 10 digits';
        }
      }


      return errors;
    },
    onSubmit: async (values) => {
      try {
        // const result = await addResumeAPI({
        //   personalDetails: {
        //     name: values.name,
        //     jobTitle: values.jobTitle,
        //     location: values.location,
        //     email: values.email,
        //     phone: values.phone,
        //     github: values.github,
        //     linkedIn: values.linkedIn,
        //     portfolio: values.portfolio,
        //   },
        //   education: {
        //     course: values.course,
        //     college: values.college,
        //     university: values.university,
        //     year: values.year,
        //   },
        //   experience: {
        //     job: values.job,
        //     company: values.company,
        //     location: values.expLocation,
        //     duration: values.duration,
        //   },
        //   skills: values.skills,
        //   summary: values.summary,
        // });
        // // setUserInput(result)

        // swal('Successful', 'Resume Added Successfully!', 'success');
        // setFinish(true);
        console.log(values);
      } catch (error) {
        swal('Error', 'Failed to Add Resume!', 'error');
      }
    }

  })

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    const formErrors = await formik.validateForm(); // 
    if (Object.keys(formErrors).length === 0) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Mark all invalid fields as touched so their errors display
      formik.setTouched(
        Object.keys(formErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // add skill
  const addSkill = (inputSkill) => {
    if (inputSkill) {
      if (userInput.skills.includes(inputSkill)) {
        alert("Skill already exist... add another skill")
      }
      else {
        setUserInput({ ...userInput, skills: [...userInput.skills, inputSkill] })
      }
    }
  }

  //remove skill
  const removeSkill = (skill) => {
    setUserInput({ ...userInput, skills: userInput.skills.filter(item => item != skill) })
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0: return (
        <div>
          <h3 className='mt-2'>Personal details</h3>
          <div className='d-flex row p-3'>
            {/* nme */}
            <TextField
              label="Full Name"
              variant="standard"
              name="name" // same Fomk initlValues
              onChange={(e) => {
                formik.handleChange(e); // updates Formik values
                setUserInput({
                  ...userInput,
                  personalDetails: {
                    ...userInput.personalDetails,
                    name: e.target.value,
                  },
                }); //  preview  sync
              }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <p className="text-danger">{formik.errors.name}</p> : null}


            <TextField
              label="Job Title"
              variant="standard"
              name="jobTitle"
              onChange={(e) => {
                formik.handleChange(e);
                setUserInput({
                  ...userInput,
                  personalDetails: {
                    ...userInput.personalDetails,
                    jobTitle: e.target.value,
                  },
                });
              }}
              value={formik.values.jobTitle}
              onBlur={formik.handleBlur}
            />
            {formik.errors.jobTitle && formik.touched.jobTitle ? <p className="text-danger">{formik.errors.jobTitle}</p> : null}


            <TextField
              label="Location"
              variant="standard"
              name="location"
              onChange={(e) => {
                formik.handleChange(e);
                setUserInput({
                  ...userInput,
                  personalDetails: {
                    ...userInput.personalDetails,
                    location: e.target.value,
                  },
                });
              }}
              value={formik.values.location}
              onBlur={formik.handleBlur}
            />
            {formik.errors.location && formik.touched.location ? <p className="text-danger">{formik.errors.location}</p> : null}
          </div>

        </div>
      )
      case 1: return (
        <div>
          <h3 className='mt-2'>Contact Deatils</h3>
          <div className='d-flex row p-3'>


            <TextField
              label="Email"
              variant="standard"
              name="email"
              onChange={(e) => {
                formik.handleChange(e);
                setUserInput({
                  ...userInput,
                  personalDetails: {
                    ...userInput.personalDetails,
                    email: e.target.value,
                  },
                });
              }}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <p className="text-danger">{formik.errors.email}</p> : null}



            <TextField
              label="Phone number"
              variant="standard"
              name="phone"
              onChange={(e) => {
                formik.handleChange(e);
                setUserInput({
                  ...userInput,
                  personalDetails: {
                    ...userInput.personalDetails,
                    phone: e.target.value,
                  },
                });
              }}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? <p className="text-danger">{formik.errors.phone}</p> : null}
            <TextField id='standard-basic' label='GitHub Link' variant='standard' onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, github: e.target.value } })} value={userInput.personalDetails.github} />
            <TextField id='standard-basic' label='LinkedIn Link' variant='standard' onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, linkedIn: e.target.value } })} value={userInput.personalDetails.linkedIn} />
            <TextField id='standard-basic' label='Portfolio Link' variant='standard' onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, portfolio: e.target.value } })} value={userInput.personalDetails.portfolio} />
          </div>
        </div>
      )
      case 2: return (
        <div>
          <h3 className='mt-2'>Education Details</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-basic" label="Course Name" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, course: e.target.value } })} value={userInput.education.course} />
            <TextField id="standard-basic" label="College Name" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, college: e.target.value } })} value={userInput.education.college} />
            <TextField id="standard-basic" label="University" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, university: e.target.value } })} value={userInput.education.university} />
            <TextField id="standard-basic" label="Year of Passout" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, year: e.target.value } })} value={userInput.education.year} />
          </div>
        </div>
      )
      case 3: return (
        <div>
          <h3 className='mt-2'>Professional Details</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-basic" label="Job or Internship" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, job: e.target.value } })} value={userInput.experience.job} />
            <TextField id="standard-basic" label="Company Name" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, company: e.target.value } })} value={userInput.experience.company} />
            <TextField id="standard-basic" label="Location" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, location: e.target.value } })} value={userInput.experience.location} />
            <TextField id="standard-basic" label="Duration" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, duration: e.target.value } })} value={userInput.experience.duration} />
          </div>
        </div>
      )
      case 4: return (
        <div>
          <h3 className='mt-2'>Skills</h3>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} >
              {/* <TextField id="standard-basic" label="Add Skill" variant="standard" /> */}
              <input ref={userSkillRef} type="text" className='form-control' placeholder='Add Skill' />
              <Button onClick={() => addSkill(userSkillRef.current.value)} className='mb-3' variant="contained" sx={{ maxWidth: '40px' }}>Add</Button>
            </Stack>
            <div>
              <h5>Suggestions:</h5>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {
                  suggestionSkills.map(skills => (
                    <Button onClick={() => addSkill(skills)} variant='outlined'>{skills}</Button>
                  ))
                }
              </div>
            </div>
            <div>
              <h5>Added Skills:</h5>
              <div className="d-flex flex-wrap gap-2">
                {
                  userInput.skills.length > 0 ? userInput.skills.map(skill => (
                    <span className='btn btn-primary d-flex justify-content-center align-items-center '>{skill} <button onClick={() => removeSkill(skill)} className='btn text-light'><RxCross2 /></button></span>
                  )) : <p>Nothing to display</p>

                }

              </div>
            </div>
          </Box>
        </div>
      )
      case 5: return (
        <div>
          <h3 className='mt-2'>Professional Summary</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-multiline-static" label="Write a short summary of yourself"
              multiline
              rows={4}
              defaultValue="Eg: I'm a passionate full-stack developer with hands-on experience in React,Node"
              variant="standard"
              value={userInput.summary}
              onChange={e => setUserInput({ ...userInput, summary: e.target.value })}
            />

          </div>
        </div>
      )
      default: return null
    }
  }

  const handleAddResume = async() => {
    // alert("api called")
    const { name, jobTitle, location } = userInput.personalDetails
    if (name && jobTitle && location) {
      try {
        const result =await addResumeAPI(userInput)
        console.log(result);
        setFinish(true)
         setResumeId(result.data.id)
        swal("Success!", "Resume Created!", "success");
        
      }
      catch (err) {
        console.log(err);
        swal("Error!", "Resume Creation Failed!", "error");
      }
    }
    else {
      alert("Please fill the missing fields")
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}
            <Box>
              {renderStepContent(activeStep)}
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {activeStep === steps.length - 1 ? <Button onClick={handleAddResume}>Finish</Button> : <Button onClick={handleNext}>Next</Button>}

          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}

export default Steps