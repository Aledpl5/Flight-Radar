"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import CodeError from "./CodeError";
import LoadingScreen from "./LoadingScreen";
import FlightInformationBox from "./FlightInformationBox";

const FlightDetails = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<FlightAPIResponse | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const code = searchParams.get("code");
        
        if (!code) {
            setError(true);
            setData(undefined);
            return;
        }

        // Annulla la richiesta precedente se ancora in corso
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const fetchFlightData = async () => {
            setLoading(true);
            setError(false);
            
            const abortController = new AbortController();
            abortControllerRef.current = abortController;

            try {
                const response = await fetch(
                    `/api/searchFlight?code=${code}`,
                    { signal: abortController.signal }
                );

                if (!response.ok) {
                    setError(true);
                    setData(undefined);
                    return;
                }

                const flightData: FlightAPIResponse = await response.json();
                setData(flightData);
            } catch (err) {
                // Ignora errori da abort
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }
                console.error("Errore nel fetch dei dati del volo:", err);
                setError(true);
                setData(undefined);
            } finally {
                setLoading(false);
            }
        };

        fetchFlightData();

        // Cleanup: annulla la richiesta se il componente si smonta o searchParams cambia
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [searchParams]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] w-full">
                <LoadingScreen />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] w-full">
                <CodeError />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] w-full">
            <FlightInformationBox data={data} />
        </div>
    );
};

export default FlightDetails;