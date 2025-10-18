import React from 'react'
import './AdminPage.css'
import Navbar from '../../components/Navbar/NavBar'
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


const AdminRefereePage = (props) => {
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

              <Link to="/admin/match" style={{ textDecoration: 'none' }}><div className='Card'
                style={{
                        borderRadius: '30px', width: '30vw', height: '40vh'
                
                    ,backgroundImage: `url(${matchHantering})`,
                }}>
                  <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                    <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra match data.</Typography>
                    <Typography variant='h4' style={{color: 'white'}}>Hantera matchrapporter</Typography>
                  </div>

                </div>

              </Link>
            <div style={{display: 'flex', marginTop: '1vw', flexDirection: 'row',}}>
                <Link to="/admin/referee" style={{ textDecoration: 'none' }}>
                    <div className='Card'
                      style={{ marginRight: "1vw",
                              borderRadius: '30px', width: '14.5vw', height: '20vh'
                      
                        , backgroundImage: `url(${refereeHantering})`,
                      }}>

                      <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                        <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra data om dig.</Typography>
                        <Typography variant='h4' style={{color: 'white'}}>Hantera domarkonto</Typography>
                      </div>

                    </div>
                
                </Link>
                <Link to="/admin/club" style={{ textDecoration: 'none' }}>

                <div className='Card'
                style={{
                        borderRadius: '30px', width: '14.5vw', height: '20vh'
                                ,backgroundImage: `url(${reportHantering})`,
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

export default AdminRefereePage;