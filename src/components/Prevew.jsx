import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaDownload } from "react-icons/fa";
import Edit from "../components/Edit"
import { MdHistory } from "react-icons/md";
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf";
import { addDownloadHistoryAPI } from '../services/addapi';

function Prevew({ userInput, finish, resumeId , setUserInput}) {
  // console.log(userInput)

  const [downloadStatus, setDownloadStatus] = useState(false)

  const downloadCv = async () => {
    //get element to create screenshot
    const input = document.getElementById('result')
    const canvas = await html2canvas(input, { scale: 2 })
    const imgUrl = canvas.toDataURL('image/png')

    // jsPDF
    const pdf = new jsPDF()
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    pdf.addImage(imgUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('resume.pdf')

    // getTimeDate
    const localTimeDate = new Date();
    const timeStamp = `${localTimeDate.toLocaleDateString()}, ${localTimeDate.toLocaleTimeString()}`;


    //add history
    try {
      const result = await addDownloadHistoryAPI({ ...userInput, timeStamp, imgUrl })
      console.log(result);
      setDownloadStatus(true)
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div >


      {userInput.personalDetails.name != "" &&
        <div className='flex-column'>
          {finish && <div className="d-flex  justify-content-end align-items-center">
            {/* Download */}
            <button onClick={downloadCv} className='btn text-primary fs-4'><FaDownload /></button>
            {/* edit */}
            <div>
              <Edit resumeId={resumeId} setupdateresume={setUserInput}/>
            </div>

            {/* History */}

            {downloadStatus && <>
              <Link to={'/history'} className='btn text-primary fs-2'><MdHistory /></Link>
            </>}

            {/* back */}
            <Link to={'/resume-generator'} className='text-primary' style={{ textDecoration: 'none', marginLeft: '10px', marginTop: '5px' }}>BACK</Link>
          </div>}

          <Box component="section" style={{ marginTop: '50px' }}>
            <Paper elevation={5} className='p-5' id='result'>
              <Typography variant="h4" align='center' component="h2">
                <h2>{userInput.personalDetails.name || "Name"}</h2>
              </Typography>
              <Typography variant="subtitle1" align='center' color="#00b0ff">
                <p>{userInput.personalDetails.jobTitle || "Job title "}</p>
              </Typography>
              <Typography variant="body2" align='center'>
                {userInput.personalDetails.email} | {userInput.personalDetails.location} | {userInput.personalDetails.phone}
              </Typography>
              <Typography variant="body2" align='center' mb={4}>
                <Link href="{userInput.personalDetails.github}" target='_blank'>{userInput.personalDetails.github}</Link> |
                <Link href="{userInput.personalDetails.linkedIn}" target='_blank'>{userInput.personalDetails.linkedIn}</Link> |
                <Link href="{userInput.personalDetails.portfolio}" target='_blank'>{userInput.personalDetails.portfolio}</Link>
              </Typography>
              <Divider>Summary</Divider>
              <Typography
                mb={3}
                align="justify"
                sx={{
                  whiteSpace: "pre-wrap", // preserves line breaks
                  wordBreak: "break-word", // prevents overflow
                }}
              >
                {userInput.summary}
              </Typography>


              <Divider>Education</Divider>
              <h5>
                {userInput.education.course}
              </h5>
              <p><span>{userInput.education.college}</span> | <span>{userInput.education.university}</span> | <span>{userInput.education.year}</span></p>


              <Divider>Professional Experience</Divider>
              <Typography variant="h6" align='center'>
                <h5>{userInput.experience.job}</h5>
                <p><span>{userInput.experience.company}</span> | <span>{userInput.experience.location}</span> | <span>{userInput.experience.duration}</span></p>
              </Typography>

              <Divider>Skills</Divider>
              <Stack spacing={2} direction="row" sx={{ flexWrap: 'wrap', gap: "10px", padding: '10px' }}>

                {
                  userInput.skills.map((skill) => (<Button variant="contained">{skill}</Button>))
                }


              </Stack>
            </Paper>
          </Box>
        </div>
      }
    </div>
  )
}

export default Prevew