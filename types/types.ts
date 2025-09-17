declare type FlightAPIResponse = {
    pagination: {
        limit: number;
        offset: number;
        count: number;
        total: number;
    };
    data: Array<{
        flight_date: string;
        flight_status: string;
        departure: {
            airport: string;
            timezone: string;
            iata: string;
            icao: string;
            terminal: string;
            gate: any;
            delay: any;
            scheduled: string;
            estimated: string;
            actual: any;
            estimated_runway: any;
            actual_runway: any;
        };
        arrival: {
            airport: string;
            timezone: string;
            iata: string;
            icao: string;
            terminal: string;
            gate: any;
            baggage: any;
            scheduled: string;
            delay: any;
            estimated: any;
            actual: any;
            estimated_runway: any;
            actual_runway: any;
        };
        airline: {
            name: string;
            iata: string;
            icao: string;
        };
        flight: {
            number: string;
            iata: string;
            icao: string;
            codeshared: any;
        };
        aircraft: {
            registration: string;
            iata: string;
            icao: string;
            icao24: string;
        };
        live: {
            updated: string;
            latitude: number;
            longitude: number;
            altitude: number;
            direction: number;
            speed_horizontal: number;
            speed_vertical: number;
            is_ground: boolean;
        };
    }>;
};
