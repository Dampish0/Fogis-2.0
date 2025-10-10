import React from 'react'
import './AdminPage.css'
import Navbar from '../../components/navbar/Navbar'
import { Typography } from '@mui/material'
import playerHantering from '../../assets/playerHantering.jpg'
import clubHantering from '../../assets/clubHantering.jpg'
import matchHantering from '../../assets/matchHantering.jpg'
import teamHantering from '../../assets/teamHantering.jpg'
import refereeHantering from '../../assets/refHantering.jpg'
import tavlingHantering from '../../assets/tavlingHantering.jpg'
import PageFooter from '../../components/PageFooter.jsx'
import reportHantering from '../../assets/reportHantering.jpg'

import { Link } from 'react-router'


const AdminTrainerPage = (props) => {
  return (
    // 30 => 14.5 + 1 + 14.5 + 30
    // 100 - (20 + 20 + 40)
    <div style={{minHeight: '100vh', backgroundColor: '#FFFFFF',
      overflowX: 'hidden',
      position: 'relative',

    }}>

    <Navbar/>


      <div
      style={{display: 'flex', marginTop: '74px', justifyContent: 'center', flexDirection: 'row',
  
        }}>

          {/* left side */}
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>

            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1vw',}}>

              <Link to="/admin/player" style={{ textDecoration: 'none' }}><div  className='Card'
                style={{ marginRight: "1vw",
                        borderRadius: '30px', width: '14.5vw', height: '20vh'
              
                  ,backgroundImage: `url(${playerHantering})`,
              }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra spelar data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera spelare</Typography>
                  </div>
                
                </div></Link>
                <Link to="/admin/club" style={{ textDecoration: 'none' }}><div className='Card'
                style={{
                        borderRadius: '30px', width: '14.5vw', height: '20vh'
                                ,backgroundImage: `url(${clubHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra klubb data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera klubb</Typography>
                  </div>
                </div></Link>
              </div>

              <Link to="/admin/match" style={{ textDecoration: 'none' }}><div className='Card'
                style={{
                        borderRadius: '30px', width: '30vw', height: '40vh'
                
                    ,backgroundImage: `url(${matchHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra match data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera match</Typography>
                  </div>

                </div>

              </Link>
  





          </div>

            {/* right side */}
          <div style={{marginLeft: "1vw" ,display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
                <Link to="/admin/competition" style={{ textDecoration: 'none' }}>

                <div className='Card'
                style={{
                        borderRadius: '30px', width: '30vw', height: '40vh'
                  , backgroundImage: `url(${tavlingHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra tävling data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera tävling</Typography>
                  </div>
              </div>
                </Link>
            <div style={{display: 'flex', flexDirection: 'row',}}>

                <Link to="/admin/team" style={{ textDecoration: 'none' }}>
                <div className='Card'
                style={{
                        borderRadius: '30px', width: '14.5vw', height: '20vh', marginRight: "1vw"
                  , backgroundImage: `url(${teamHantering})`,

                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra lag data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera lag</Typography>
                  </div>
                </div>
                </Link>
                <Link to="/admin/team" style={{ textDecoration: 'none' }}>
                <div className='Card'
                style={{
                        borderRadius: '30px', width: '14.5vw', height: '20vh'
                  , backgroundImage: `url(${reportHantering})`,

                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller uppdatera rapport.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera anmälan</Typography>
                  </div>
                </div>
                </Link>
            </div>
  
              
                





          </div>
    
    
      </div>
   
   
   
              <div style={{height: '10vh'}}>

              </div>
   
   


              <PageFooter />
    </div>
  )
}

export default AdminTrainerPage;