import { useState, useEffect, useCallback } from "react";
import { GeoProvider, Location as GeoLocation } from "../../utilits/Location/geoProvider.ts";

const LocationComponent = () => {
    const [geoInfo, setGeoInfo] = useState<GeoLocation | null>(null);
    const geoProvider = GeoProvider.getInstance();

    const fetchLocation = useCallback(async () => {
        try {
            const ipInfo: GeoLocation = await geoProvider.fetchIPInfo();
            setGeoInfo(ipInfo);
        } catch (error) {
            console.error("Error fetching location info:", error);
        }
    }, [geoProvider]);

    useEffect(() => {
        fetchLocation().catch(Error);
    }, [fetchLocation]);

    return (
        <div>
            Deliver to: {geoInfo?.city} {geoInfo?.country}
        </div>
    );
}

export default LocationComponent;
