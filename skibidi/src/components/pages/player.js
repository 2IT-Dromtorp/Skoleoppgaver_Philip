import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Player() {
  const { region, accountid } = useParams('');

  useEffect(() => {

  }, [region, accountid])

  return (
    <div>
      
    </div>
  )
}

export default Player