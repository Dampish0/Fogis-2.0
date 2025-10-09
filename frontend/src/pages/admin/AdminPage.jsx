import React from 'react'

const AdminPage = (props) => {
  return (
    <div style={{justifyContent: 'center', display: 'flex', marginTop: '100px'
    }}>AdminPage, account level: [{props.role}]</div>
  )
}

export default AdminPage