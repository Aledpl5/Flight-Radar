import React from 'react'
import { Button } from './button'
import { House, Link } from 'lucide-react'

const HomeButton = () => {
  return (
    <div>
        <Button variant="outline" size="icon" className='cursor-pointer'>
            <a href='/' ><House /></a>
        </Button>
    </div>
  )
}

export default HomeButton