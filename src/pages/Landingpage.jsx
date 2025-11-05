import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './landing.css'

function Landingpage() {
  return (
    <div>
      <section id='bg1'>
        <div className="row pt-5">
          <div className="col-12 col-md-4"></div>
          <div
            className="col-12 col-md-4 box py-5 border rounded mt-5 mb-5 text-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)', // translucent white
              backdropFilter: 'blur(10px) saturate(180%)', // frosted glass effect
              WebkitBackdropFilter: 'blur(10px) saturate(180%)', // Safari support
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
            }}
          >
            <h3>Designed to get hired.</h3>
            <h4>Your skills, your story, your next job - all in one.</h4>
            <Link to={'/resume-generator'}>
              <Button sx={{ backgroundColor: '#4288c9ff', fontWeight: 'bold' }}
                variant="contained">Make your Resume</Button>
            </Link>
          </div>
          <div className="col-12 col-md-4"></div>

        </div>
      </section>

      <section className='p-5'>
        <h3 className="text-center">Tools</h3>
        <div className="row">
          <div className="col-12 col-md-6 p-5">
            <h4>Resume</h4>
            <p>Create unlimited new resumes and easily edit them afterwards.</p>

            <h4>Cover Letters</h4>
            <p> Easily write professional cover letters.</p>

            <h4>Jobs</h4>
            <p>Automatically receive new and relevant job postings.</p>

            <h4>Applications</h4>
            <p> Effortlessly manage and track your job applications in an organized manner.</p>

          </div>
          <div className="col-12 col-md-6 text-center">
            <img src="https://i.postimg.cc/nzqJfXnK/4171344-removebg-preview.png" width={'70%'} alt="" />
          </div>
        </div>
      </section>

      <section id='bg2'></section>

      <section>
        <div className="row p-5">
          <h3 className="text-center my-3">Testimony</h3>
          <div className="col-12 col-md-6">
            <h4>Trusted by professionals worldwide.</h4>
            <p>At LiveCareer, we don't just help you create résumés — we help you land the job. Whether you're a seasoned professional or just starting out, our tools are designed to get results.</p>

            <p>In fact, users who used LiveCareer reported getting hired an average of 48 days faster.</p>

            <p>Join thousands of job-seekers who’ve fast-tracked their careers with a résumé that truly stands out.</p>



          </div>

          <div className="col-12 col-md-6">
            <div className="row testimony-img-row">
              <div className="col-3">
                <img className='border' src="https://img.freepik.com/premium-photo/passport-photo-man-welldressed-caucasian-businessman-suit-tie-smiling-id-portrait_817921-61256.jpg?w=360" alt="" />
              </div>
              <div className="col-3">
                <img className='border' src="https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
              </div>
              <div className="col-3">
                <img className='border' src="https://img.freepik.com/free-photo/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determined_1258-26730.jpg" alt="" />
              </div>
              <div className="col-3">
                <img className='border' src="https://img.freepik.com/premium-photo/modern-bearded-man-living-urban-rush-wearing-wireless-earphones-listen-music-smiling-carefree-like-headphones-quality_1258-6204.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
              </div>
            </div>
            <div className="row testimony-img-row">
              <div className="col-3">
                <img className='border' src="https://www.beautyboxstudio.com.sg/wp-content/uploads/2017/05/CORPRORATE-PASSPORT-ICA-HEADSHOT-STUDIO-PHOTOGRAPHY-BEAUTYBOX-002.jpg" alt="" />
              </div>
              <div className="col-3">
                <img className='border' src="https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
              </div>
              <div className="col-3">
                <img className='border' src="https://instantglamour.com/wp-content/uploads/photo-gallery/IMG_3348-pp-b.jpg" alt="" />
              </div>
              <div className="col-3">
                <img className='border' src="https://files.idyllic.app/files/static/3871259?width=256&optimizer=image" alt="" />
              </div>
            </div>
            {/* <div className="row testimony-img-row">
              <div className="col-3">
                <img src="https://img.freepik.com/free-photo/front-view-man-posing_23-2148364843.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
              </div>
              <div className="col-3">
                <img src="https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
              </div>
              <div className="col-3">
                <img src="https://img.freepik.com/free-photo/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determined_1258-26730.jpg" alt="" />
              </div>
              <div className="col-3">
                <img src="https://img.freepik.com/premium-photo/modern-bearded-man-living-urban-rush-wearing-wireless-earphones-listen-music-smiling-carefree-like-headphones-quality_1258-6204.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
              </div>
            </div> */}
          </div>

        </div>
      </section>
    </div>
  )
}

export default Landingpage