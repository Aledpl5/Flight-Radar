"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CodeError from "./CodeError";
import LoadingScreen from "./LoadingScreen";
import FlightInformationBox from "./FlightInformationBox";

const FlightDetails = () => {
    // states
    const [code, setCode] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<FlightAPIResponse | undefined>(undefined);
    const searchParams = useSearchParams();

    // hooks
    useEffect(() => {
        const codeParam = searchParams.get("code");
        setCode(codeParam ? codeParam : undefined);
    }, [searchParams]);

    // hook for the API request
    /*
    useEffect(() => {
        setLoading(true);
        setLoading(false);
    }, [code]);*/

    // useEffetct for loading example data
    useEffect(() => {
        const fetchTestData = async () => {
            try {
                const response = await fetch("/testFlight.json");

                if (!response.ok) {
                    throw new Error(
                        "Non è stato possibile caricare i dati da /public/(testFlight.json)",
                    );
                }

                const data: FlightAPIResponse = await response.json();
                setData(data);
            } catch (err) {
                throw new Error("Errore nel fetch");
            } finally {
                setLoading(false);
            }
        };

        fetchTestData()
    }, []);

    if (loading) return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] w-full"><LoadingScreen /></div>;
    if (!code) return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] w-full"><CodeError /></div>;

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] w-full">
            <FlightInformationBox data={data} />
        </div>
    );
};

export default FlightDetails;
