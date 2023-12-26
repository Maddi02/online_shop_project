import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utilits/State/store.ts";
import { AppDispatch } from "../../utilits/State/store.ts";
import { fetchLocation } from "../../utilits/State/locationsSlice.ts";
const LocationComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const locationState = useSelector((state: RootState) => state.location);

    useEffect(() => {
        dispatch(fetchLocation());
    }, [dispatch]);

    if (locationState.status === 'loading') {
        return <div>Loading location...</div>;
    }

    if (locationState.status === 'failed') {
        return <div>Error: {locationState.error}</div>;
    }

    return (
        <div>
            Deliver to: {locationState.country}, {locationState.city}
        </div>
    );
}

export default LocationComponent;
