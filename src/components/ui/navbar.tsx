import React from 'react'
import { ModeToggle } from "../theme/ModeToggle";
import HomeButton from './homeButton';

const Navbar = () => {
  return (
    <div className="w-full gap-4 px-4 py-2 flex justify-end border-b border-b-gray-300 dark:border-b-gray-700">
        <HomeButton />
        <ModeToggle />
    </div>
  )
}

export default Navbar