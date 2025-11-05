import React, { useState } from 'react'
import Prevew from '../components/Prevew'
import Steps from '../components/Steps'

function Forms() {
  const[userInput,setUserInput] = useState({
    personalDetails:{
      name:"",
      jobTitle:"",
      location:"",
      email:"",
      phone:"",
      github:"",
      linkedIn:"",
      portfolio:"",
    },
    education:{
      course:"",
      college:"",
      university:"",
      year:"",
    },
    experience:{
      job:"",
      company:"",
      location:"",
      duration:""
    },
    skills:[],
    summary:""
  })

  const [finish,setFinish] = useState(false)
  const [resumeId, setResumeId] = useState("")

  return (
    <div>
      <div className="row p-5">
        {finish ? <div className="row">
          <div className="col-3"></div>
          <div className="row-8">
            <Prevew resumeId={resumeId} userInput={userInput} setUserInput={setUserInput} finish={finish}/>
          </div>
          <div className='col-1'></div>
          
        </div> :
      

      <div className="row">
        <div className="col-6">
          <Steps setResumeId={setResumeId} userInput={userInput} setUserInput={setUserInput} setFinish={setFinish}/>
        </div>
        <div className="col-6">
          <Prevew userInput={userInput}/>
        </div>
      </div>}

    </div>
    </div>
  )
}

export default Forms