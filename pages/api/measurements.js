const measurements = require('../../utils/measurements.json');

export default function handler(req, res) {
    res.send(measurements)
}
