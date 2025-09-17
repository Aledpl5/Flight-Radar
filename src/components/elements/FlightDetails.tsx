'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CodeError from './CodeError'
import LoadingScreen from './LoadingScreen'

const FlightDetails = () => {

    // states
    const [code, setCode] = useState<string | undefined>("")
    const [loading, setLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()

    // hooks
    useEffect(() => {
        const codeParam = searchParams.get('code');
        setCode(codeParam ? codeParam : undefined)
    }, [searchParams])

    // hook for the API request
    useEffect(() => {
        setLoading(true)
        setLoading(false)
    }, [code])

    if(loading) return <div><LoadingScreen /></div>
    if(!code) return <div><CodeError /></div>

  return (
    <div>Flight number: {code}</div>
  )
}

export default FlightDetails