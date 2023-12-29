
export interface Location {
    as: string;
    city: string;
    country: string;
    isp: string;
    lat: number;
    lon: number;
    org: string;
    query: string;
    region: string;
    regionName: string;
    status: string;
    timezone: string;
    zip: string
}


export class GeoProvider {
    private static instance: GeoProvider;



    private constructor() {
    }

    public static getInstance(): GeoProvider {
        if (!GeoProvider.instance) {
            GeoProvider.instance = new GeoProvider();
        }
        return GeoProvider.instance;
    }

    async getUserIp(): Promise<string> {
        try {
            const response = await fetch('https://api.ipify.org');
            const data = await response.text()
            return data
        } catch (error) {
            throw Error
        }
    }

    async fetchIPInfo(): Promise<Location> {
        try {
            const response = await fetch(`http://ip-api.com/json/${await this.getUserIp()}`)
            return await response.json()
        } catch (error) {
            console.error('Failed to Location info: ', error)
            throw Error
        }
    }
}

