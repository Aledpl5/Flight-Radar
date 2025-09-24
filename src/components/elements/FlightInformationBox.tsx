import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";
import Link from "next/link";

type FlightProps = {
    data: FlightAPIResponse;
};

const timeOnly = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "-";

const dateShort = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleDateString([], {
              weekday: "short",
              day: "2-digit",
              month: "short",
          })
        : "";

const FlightInformationBox = ({ data }: FlightProps) => {
    if (!data) {
        return (
            <div className="flex justify-center items-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <p className="text-center text-gray-500">
                            Nessun dato disponibile
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!data.data || data.data.length === 0) {
        return (
            <div className="flex justify-center items-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <p className="text-center text-gray-500">
                            Nessun volo trovato
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const flight = data.data[0];

    return (
        <div className="w-full max-w-md sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto flex flex-col justify-center items-center gap-4 sm:mt-5">
            <Card className="w-full bg-surface-800 dark:bg-gray-800">
                <div className="flex items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-3">
                        <p className="text-lg font-medium">
                            {flight.airline?.icao || flight.airline?.name ? (
                                <>
                                    Volo{" "}
                                    <strong>
                                        {flight.flight?.iata ?? "-"}
                                    </strong>{" "}
                                    <span className="text-sm text-muted-foreground ml-2">
                                        {flight.airline?.name}
                                    </span>
                                </>
                            ) : (
                                `Dati del volo ${flight.flight?.iata ?? "-"}`
                            )}
                        </p>
                        {" " + flight.flight?.icao}
                    </div>

                    <span
                        className={`px-3 py-1 text-center rounded-full text-sm font-medium whitespace-nowrap ${
                            flight.flight_status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : flight.flight_status === "scheduled"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : flight.flight_status === "landed"
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                                : flight.flight_status === 'delayed' 
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : 'bg-red-600 text-red-300'
                        }`}
                    >
                        {flight.flight_status}
                    </span>
                </div>

                {/* HEADER PRINCIPALE: IATA sinistra - barra centrale con durata - IATA destra */}
                <CardHeader className="pt-0 pb-0">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Left IATA */}
                            <div className="flex-1">
                                <div className="text-3xl lg:text-5xl font-bold leading-none">
                                    {flight.departure.iata}
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground">
                                    {flight.departure.airport}
                                </div>
                            </div>

                            {/* Middle line + durata + airplane */}
                            <div className="flex-1 flex flex-col items-center px-4">
                                <div className="w-full flex items-center">
                                    <div className="flex-1 h-0.5 bg-green-400/40" />
                                    <Plane />
                                    <div className="flex-1 h-0.5 bg-green-400/40" />
                                </div>
                            </div>

                            {/* Right IATA */}
                            <div className="flex-1 text-right">
                                <div className="text-3xl lg:text-5xl font-bold leading-none">
                                    {flight.arrival.iata}
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground">
                                    {flight.arrival.airport}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                {/* CONTENUTO: colonna partenza / arrivo come nel design */}
                <div className="grid grid-cols-1">
                    <CardContent className="pt-2 pb-2 sm:w-full">
                        <div className="px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                {/* Partenza */}
                                <div className="space-y-3 md:pr-6 sm:w-full">
                                    <div className="flex items-center justify-start gap-4">
                                        <PlaneTakeoff />
                                        <h3 className="font-semibold text-green-400">
                                            {flight.departure.airport} ·{" "}
                                            {dateShort(
                                                flight.departure.scheduled,
                                            )}
                                        </h3>
                                    </div>

                                    <div>
                                        <div className="text-3xl font-bold text-green-400">
                                            {timeOnly(
                                                flight.departure.scheduled,
                                            )}
                                        </div>
                                        {flight.departure.estimated &&
                                            flight.departure.estimated !==
                                                flight.departure.scheduled && (
                                                <div className="hidden sm:block text-sm line-through text-muted-foreground mt-1">
                                                    {timeOnly(
                                                        flight.departure
                                                            .scheduled,
                                                    )}
                                                </div>
                                            )}

                                        <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                                            <div>
                                                <div className="font-medium">
                                                    Partito
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    Terminal
                                                </div>
                                                <div>
                                                    {flight.departure
                                                        .terminal ?? "-"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    Gate
                                                </div>
                                                <div>
                                                    {flight.departure.gate ??
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrivo */}
                                <div className="space-y-3 md:pl-6 sm:w-full">
                                    <div className="flex items-center justify-start gap-4">
                                        <PlaneLanding />
                                        <h3 className="font-semibold text-blue-400">
                                            {flight.arrival.airport} ·{" "}
                                            {dateShort(
                                                flight.arrival.scheduled,
                                            )}
                                        </h3>
                                    </div>

                                    <div>
                                        <div className="text-3xl font-bold text-green-400">
                                            {timeOnly(flight.arrival.scheduled)}
                                        </div>
                                        {flight.arrival.estimated &&
                                            flight.arrival.estimated !==
                                                flight.arrival.scheduled && (
                                                <div className="text-sm line-through text-muted-foreground mt-1">
                                                    {timeOnly(
                                                        flight.arrival
                                                            .scheduled,
                                                    )}
                                                </div>
                                            )}

                                        <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                                            <div>
                                                <div className="font-medium">
                                                    Arrivato
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    Terminal
                                                </div>
                                                <div>
                                                    {flight.arrival.terminal ??
                                                        "-"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    Gate
                                                </div>
                                                <div>
                                                    {flight.arrival.gate ?? "-"}
                                                </div>
                                            </div>
                                        </div>

                                        {flight.arrival.baggage && (
                                            <div className="mt-3 text-sm text-muted-foreground">
                                                <strong>Bagagli:</strong>{" "}
                                                {flight.arrival.baggage}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>

                <CardFooter className="flex flex-col items-start px-6">
                    <Separator className="my-3 w-full" />
                    <div className="w-full flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Aggiornato: {new Date().toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Fonte: <Link href={'https://aviationstack.com/'} target="_blank" className="underline">aviationstack.com</Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default FlightInformationBox;
