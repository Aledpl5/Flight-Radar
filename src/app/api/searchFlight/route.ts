import { NextRequest } from "next/server";

const BASE_LINK = "https://api.aviationstack.com/v1/flights?"
const AVIATION_KEY = process.env.AVIATION_KEY

export async function GET(req: NextRequest) {
    try {
        // Leggi il parametro dalla URL
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        console.log(code)

        if(!code) {
            return new Response("Missing code parameter", { status: 400 })
        }

        const url: string = `${BASE_LINK}access_key=${AVIATION_KEY}&flight_iata=${code}`

        console.log(url)
        
        const response = await fetch(url)

        if(!response.ok) {
            return new Response("Error fetching data from AvitationStack API", { status: 501 })
        }

        const data: FlightAPIResponse = await response.json()

        return new Response(JSON.stringify(data), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch(err) {
        const error = err as Error
        return new Response(error.message, { status: 500 })
    }
}