import Link from 'next/link'
import React from 'react'

type CodeErrorProps = {
    code?: string
}

const CodeError = ( { code }: CodeErrorProps ) => {
  return (
    <div className='flex flex-col items-center justify-center px-5 py-5 border-red-500 border-2 rounded-md bg-red-100 text-red-700'>
        <h1 className='text-3xl font-bold mb-2'>Oops...!</h1>
        <p>Sembra che tu stia cercando un volo con un numero non valido.</p>
        <p>Torna al <span><Link className='font-medium no-underline hover:underline' href={'form iniziale'}>form iniziale</Link></span> per cercare un altro volo.</p>
        <p>Nessuna informazione trovata per codice volo: {code}</p>
    </div>
  )
}

export default CodeError