import {GeoProvider, Location as GeoLocation} from "../../utilits/geoProvider.ts";
import {useState, useEffect} from "react";

const LocationComponent = () => {
    const [geoInfo, setGeoInfo] = useState<GeoLocation | null>(null); // Changed the state type to GeoLocation | null
    const geoProvider = GeoProvider.getInstance();

    const fetchLocation = async () => {
        const ipInfo: GeoLocation = await geoProvider.fetchIPInfo();
        setGeoInfo(ipInfo);
    };
    useEffect(() => {
        fetchLocation().catch(Error)
    }, []);

    return (
        <div>
            Deliver to: {geoInfo?.city} {geoInfo?.country}
        </div>
    );
}

export default LocationComponent;
