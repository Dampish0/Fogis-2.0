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
import reportHantering from '../../assets/reportHantering.jpg'
import arenaHantering from '../../assets/arenaHantering.jpg'

import PageFooter from '../../components/PageFooter.jsx'
import { Link } from 'react-router'


const AdminPage = (props) => {
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
                         width: '14.5vw', height: '20vh'
              
                  ,backgroundImage: `url(${playerHantering})`,
              }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra spelar data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera spelare</Typography>
                  </div>
                
                </div></Link>
                <Link to="/admin/club" style={{ textDecoration: 'none' }}><div className='Card'
                style={{
                         width: '14.5vw', height: '20vh'
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
                         width: '30vw', height: '40vh'
                
                    ,backgroundImage: `url(${matchHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra match data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera match</Typography>
                  </div>

                </div>

              </Link>
            <div style={{display: 'flex', marginTop: '1vw', flexDirection: 'row',}}>
                <Link to="/admin/referee" style={{ textDecoration: 'none' }}>
                    <div className='Card'
                      style={{ marginRight: "1vw",
                               width: '14.5vw', height: '20vh'
                      
                        , backgroundImage: `url(${reportHantering})`,
                      }}>

                      <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                        <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller uppdatera rapport.</Typography>
                        <Typography variant='h4' style={{color: 'white'}}>Hantera ärenden</Typography>
                      </div>

                    </div>
                
                </Link>
                <Link to="/admin/team" style={{ textDecoration: 'none' }}>

                <div className='Card'
                style={{
                         width: '14.5vw', height: '20vh'
                  , backgroundImage: `url(${teamHantering})`,

                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra ... data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera ...</Typography>
                  </div>
                </div>
                </Link>
            </div>
  





          </div>

            {/* right side */}
          <div style={{marginLeft: "1vw" ,display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
                <Link to="/admin/competition" style={{ textDecoration: 'none' }}>

                <div className='Card'
                style={{
                         width: '30vw', height: '40vh'
                  , backgroundImage: `url(${tavlingHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra tävling data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera tävling</Typography>
                  </div>
              </div>
                </Link>
            <div style={{display: 'flex', flexDirection: 'row',}}>

                <Link to="/admin/referee" style={{ textDecoration: 'none' }}>

                <div className='Card'
                style={{ marginRight: "1vw",
                         width: '14.5vw', height: '20vh'
                
                  , backgroundImage: `url(${refereeHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra domar data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera domare</Typography>
                  </div>

                </div>

                </Link>
                <Link to="/admin/team" style={{ textDecoration: 'none' }}>
                <div className='Card'
                style={{
                         width: '14.5vw', height: '20vh'
                  , backgroundImage: `url(${teamHantering})`,

                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra lag data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera lag</Typography>
                  </div>
                </div>
                </Link>
            </div>
  
              
                


              <div style={{display: 'flex', flexDirection: 'row',}}>
              <Link to="/admin/player" style={{ textDecoration: 'none' }}>
              <div className='Card'
                style={{ marginRight: "1vw",
                         width: '14.5vw', height: '20vh'
              
                  ,backgroundImage: `url(${arenaHantering})`,
              }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra arenor.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera arenor</Typography>
                  </div>
                
                </div>
                </Link>
                <Link to="/admin/club" style={{ textDecoration: 'none' }}>

                <div className='Card'
                style={{
                         width: '14.5vw', height: '20vh'
                                ,backgroundImage: `url(${playerHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra användare data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera användare</Typography>
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

export default AdminPage;