'use client'

import React, { useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const Form = () => {
    // states fot flight code
    const [code, setCode] = useState<string>("");

    const navigate = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(code.length < 4 || code === ''){
            Swal.fire({
                icon: "error",
                title: "Errore",
                text: "Il codice IATA deve essere di almeno 4 caratteri",
                theme: "auto"
            })
            return
        }

        navigate.push(`/flight?code=${code.toUpperCase()}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center h-full w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Cerca il tuo volo</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center">Inserisci il numero del volo di cui avere delle informazioni</p>
                <Input type="string" placeholder="Numero del volo. EX: U28741" required onChange={e => {setCode(e.target.value)}}/>
                <Input type="submit" value="Cerca" className="text-center cursor-pointer bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 ease-in-out transition-all text-white"/>
            </form>
        </div>
    )
};

export default Form;