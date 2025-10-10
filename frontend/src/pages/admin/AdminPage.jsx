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




const AdminPage = (props) => {
  return (
    // 30 => 14.5 + 1 + 14.5 + 30
    // 100 - (20 + 20 + 40)
    <div style={{minHeight: '100vh', padding: '20px', backgroundColor: '#212122'}}>

    <Navbar/>


     <div
     style={{display: 'flex', marginTop: '74px', justifyContent: 'center', flexDirection: 'row',
      }}>

        {/* left side */}
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>

          <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1vw',}}>
              <div className='Card'
              style={{ marginRight: "1vw",
                      border: '2px solid white', borderRadius: '30px', width: '14.5vw', height: '20vh'
             
                 ,backgroundImage: `url(${playerHantering})`,
             }}>
                <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                  <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra spelar data.</Typography>
                  <Typography variant='h4' style={{color: 'white'}}>Hantera spelare</Typography>
                </div>
              
              </div>
              <div className='Card'
              style={{
                      border: '2px solid white', borderRadius: '30px', width: '14.5vw', height: '20vh'
                               ,backgroundImage: `url(${clubHantering})`,
              }}>
                <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                  <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra klubb data.</Typography>
                  <Typography variant='h4' style={{color: 'white'}}>Hantera klubb</Typography>
                </div>
              </div>
          </div>
 
            <div className='Card'
              style={{ 
                      border: '2px solid white', borderRadius: '30px', width: '30vw', height: '40vh'
              
                  ,backgroundImage: `url(${matchHantering})`,
              }}>
                <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                  <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra match data.</Typography>
                  <Typography variant='h4' style={{color: 'white'}}>Hantera match</Typography>
                </div>

              </div>
              






        </div>

          {/* right side */}
        <div style={{marginLeft: "1vw" ,display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
              <div className='Card'
              style={{
                      border: '2px solid white', borderRadius: '30px', width: '30vw', height: '40vh'
                , backgroundImage: `url(${tavlingHantering})`,
              }}>
                <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                  <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra tävling data.</Typography>
                  <Typography variant='h4' style={{color: 'white'}}>Hantera tävling</Typography>
                </div>
            </div>
          <div style={{display: 'flex', flexDirection: 'row',}}>
              <div className='Card'
              style={{ marginRight: "1vw",
                      border: '2px solid white', borderRadius: '30px', width: '14.5vw', height: '20vh'
              
                , backgroundImage: `url(${refereeHantering})`,
              }}>
                <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                  <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra domar data.</Typography>
                  <Typography variant='h4' style={{color: 'white'}}>Hantera domare</Typography>
                </div>

              </div>
              <div className='Card'
              style={{
                      border: '2px solid white', borderRadius: '30px', width: '14.5vw', height: '20vh'
                , backgroundImage: `url(${teamHantering})`,

              }}>
                <div style={{marginLeft: "5%", marginBottom: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'end', height: '95%'}}>
                  <Typography variant='h8' style={{color: 'white', paddingTop: '2vh'}}>Lägg till eller ändra lag data.</Typography>
                  <Typography variant='h4' style={{color: 'white'}}>Hantera lag</Typography>
                </div>
              </div>
          </div>
 
            
              






        </div>
   
   
    </div>
   
   
   
   
   
   
   
   
   
    </div>
  )
}

export default AdminPage