import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from "react-icons/fa";
import TextField from '@mui/material/TextField'
import { RxCross2 } from "react-icons/rx";
import { editResumeAPI, getResumeAPI } from '../services/addapi';
import { useFormik } from 'formik'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Edit({ resumeId, setupdateresume }) {



  console.log(resumeId);

  const [userInput, setUserInput] = React.useState({
    personalDetails: {},
    education: {},
    experience: {},
    skills: [],
    summary: ""
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userskill, setUserSkills] = React.useState('')

  const getEditResumeDetails = async () => {
    try {
      const result = await getResumeAPI(resumeId)
      setUserInput(result?.data)

    }
    catch (err) {
      console.log(err);

    }
  }

  React.useEffect(() => {
    resumeId && getEditResumeDetails()
  }, [resumeId])

  console.log(userInput);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userInput?.personalDetails?.name || '',
      jobTitle: userInput?.personalDetails?.jobTitle || '',
      location: userInput?.personalDetails?.location || '',
      email: userInput?.personalDetails?.email || '',
      phone: userInput?.personalDetails?.phone || '',
      github: userInput?.personalDetails?.github || '',
      linkedIn: userInput?.personalDetails?.linkedIn || '',
      portfolio: userInput?.personalDetails?.portfolio || '',
      course: userInput?.education?.course || '',
      college: userInput?.education?.college || '',
      university: userInput?.education?.university || '',
      year: userInput?.education?.year || '',
      job: userInput?.experience?.job || '',
      company: userInput?.experience?.company || '',
      expLocation: userInput?.experience?.location || '',
      duration: userInput?.experience?.duration || '',
      summary: userInput?.summary || '',
      skills: userInput?.skills || [],
    },

    validate: (values) => {
      const errors = {}

      if (!values.name) {
        errors.name = 'Name is required';
      } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
        errors.name = 'Name must contain only letters';
      }
      if (!values.jobTitle) errors.jobTitle = 'Job title is required';
      if (!values.location) errors.location = 'Location is required';

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

      return errors;
    },
    onSubmit: async (values) => {
      try {

        console.log(values);
      } catch (error) {
        swal('Error', 'Failed to Add Resume!', 'error');
      }
    }

  })


  const addSkill = () => {
    if (userskill) {
      if (userInput.skills.includes(userskill)) {
        alert("Skill already exist... add another skill")
      }
      else {
        setUserInput({ ...userInput, skills: [...userInput.skills, userskill] })
      }
    }
  }

  const removeSkill = (skill) => {
    setUserInput({ ...userInput, skills: userInput.skills.filter(item => item != skill) })
  }

  const handleupdate = async () => {
    try {
      const result = await editResumeAPI(userInput?.id, userInput)
      console.log(result);
      handleClose()
      setupdateresume(result?.data)

      swal('Success', 'Resume Updated', 'success');


    } catch (error) {
      console.log(error);

    }
  }













  return (
    <div>
      <button onClick={handleOpen} className='btn text-primary fs-3'><FaEdit /></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Personal Details */}

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
                value={formik?.values?.name}
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
                value={formik?.values?.jobTitle}
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
                value={formik?.values?.location}
                onBlur={formik.handleBlur}
              />
              {formik.errors.location && formik.touched.location ? <p className="text-danger">{formik.errors.location}</p> : null}
            </div>



            {/* Contact Details */}
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
                value={formik?.values?.email}
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
                value={formik?.values?.phone}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? <p className="text-danger">{formik.errors.phone}</p> : null}
              <TextField id='standard-basic' label='GitHub Link' variant='standard' onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, github: e.target.value } })} value={userInput?.personalDetails?.github} />
              <TextField id='standard-basic' label='LinkedIn Link' variant='standard' onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, linkedIn: e.target.value } })} value={userInput?.personalDetails?.linkedIn} />
              <TextField id='standard-basic' label='Portfolio Link' variant='standard' onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, portfolio: e.target.value } })} value={userInput?.personalDetails?.portfolio} />
            </div>


            {/* Education Details */}
            <h3 className='mt-2'>Education Details</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-basic" label="Course Name" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, course: e.target.value } })} value={userInput?.education?.course} />
              <TextField id="standard-basic" label="College Name" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, college: e.target.value } })} value={userInput?.education?.college} />
              <TextField id="standard-basic" label="University" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, university: e.target.value } })} value={userInput?.education?.university} />
              <TextField id="standard-basic" label="Year of Passout" variant="standard" onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, year: e.target.value } })} value={userInput?.education?.year} />
            </div>

            {/*Professional Details  */}
            <h3 className='mt-2'>Professional Details</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-basic" label="Job or Internship" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, job: e.target.value } })} value={userInput?.experience?.job} />
              <TextField id="standard-basic" label="Company Name" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, company: e.target.value } })} value={userInput?.experience?.company} />
              <TextField id="standard-basic" label="Location" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, location: e.target.value } })} value={userInput?.experience?.location} />
              <TextField id="standard-basic" label="Duration" variant="standard" onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, duration: e.target.value } })} value={userInput?.experience?.duration} />
            </div>

            {/* Skills */}
            <h3>Skills</h3>
            <div spacing={2} className='d-flex flex-wrap align-items-center '>
              <TextField id="standard-basic" label="Add Skill" variant="standard" onChange={e => setUserSkills(e.target.value)} value={userskill} />
              <Button className='me-3' variant="text" sx={{ maxWidth: '40px' }} onClick={addSkill}>Add</Button>
            </div>

            {/* Added Skills */}
            <h5 className='mt-4'>Added Skills:</h5>
            <div className="d-flex flex-wrap gap-2">
              {
                userInput?.skills?.length > 0 && userInput?.skills.map(skill => (<span className='btn btn-primary d-flex justify-content-center align-items-center'>{skill} <button className='btn text-light pb-2' onClick={() => removeSkill(skill)}><RxCross2 /></button></span>))
              }
            </div>

            {/* Professional Summary */}


            <h3 className='mt-2'>Professional Summary</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-multiline-static" label="Write a short summary of yourself"
                multiline
                rows={4}
                placeholder="Eg: I'm a passionate full-stack developer with hands-on experience in React,Node"
                variant="standard"
                value={userInput?.summary}
                onChange={e => setUserInput({ ...userInput, summary: e.target.value })}
              />

            </div>

            <Button onClick={handleupdate}>Update</Button>



          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Edit