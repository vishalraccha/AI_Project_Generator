import React from 'react'
import { useLocation } from 'react-router-dom'
function View_project() {
    const location=useLocation()
    console.log(location.state)
  return (
    <div>
      Project Playground
    </div>
  )
}

export default View_project
