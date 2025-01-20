import { Square } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return (
    <Square p={2} m={2} height="70vh">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </Square>
  )
}

export default Loader