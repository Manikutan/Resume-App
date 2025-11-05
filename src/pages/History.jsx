import { Paper } from '@mui/material'
import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import { deleteHistoryAPI, getHistoryAPI } from '../services/addapi';


function History() {

  const [resume, setResume] = useState([])

  const getHistory = async () =>{
    try{
      const result = await getHistoryAPI()
      console.log(result);
      setResume(result.data)
    }
    catch(err){
      console.log(err);
      
    }
  }

  useEffect(()=>{
    getHistory()
  },[])

  const handleRemove = async (id) => {
    try{
      await deleteHistoryAPI(id)
    getHistory()
    }
    catch(err){
      console.log(err);
    }
  }
  

  return (
    <div>
      <div>
        <h1 className='text-center mt-5'>Download Resume History</h1>
        <Link to={'/'} style={{marginTop:'-50px'}} className='float-end me-5'>BACK</Link>
        <Box component='section' className='container-fluid'>
          <div className="row">
            
            {resume?.length>0 ?resume.map((item,index)=>(
              <div className="col-md-4" key={index}>
              <Paper elevation={3} sx={{my:5, p:5, textAlign:'center'}}>
                <div className='d-flex align-items-center justify-content-evenly'>
                  <h6>Review At: <br />{item?.timeStamp}</h6>
                  <button onClick={()=>handleRemove(item?.id)} className='btn text-danger fs-4 ms-5'><MdDelete /></button>
                </div>
                <div className="border rounded p-3">
                  <img className='img-fluid' src={item?.imgUrl} alt="resume" />
                </div>
              </Paper>
            </div>
            )):<p>Nothing to display</p>}
          </div>
        </Box>
      </div>
    </div>
  )
}

export default History