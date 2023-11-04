import distance from 'google-distance-matrix';


const getDistance = async (req, res) => {

    const origins = req.body.origins;
    const destinations = req.body.destinations;
    const mode = req.body.travelMode;

    distance.key(process.env.VITE_GOOGLE_MAPS_API_KEY);
    distance.units('metric');
    distance.matrix(origins, destinations, mode, async (err, distances) => {
        if (err) {
            return res.json({ message: 'Error', status: 400 });
        }
        if (!distances) {
            return res.json({ message: 'No distances', status: 400 });
        }
        if (distances.status == 'OK') {
            return res.json(distances);
        }
    });
};

export { getDistance };