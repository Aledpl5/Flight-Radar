import React from 'react'
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  return (
    <div className="w-full px-4 py-2 flex justify-end border-b border-b-gray-300 dark:border-b-gray-700">
        <ModeToggle />
    </div>
  )
}

export default Navbar