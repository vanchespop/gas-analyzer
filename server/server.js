const fs = require('fs');
const modbus = require('jsmodbus');
const net = require('net');

const measurements = '../utils/measurements.json';
const parameters = require('../utils/parameters');

const options = {
    host: '188.242.208.111',
    port: 534
};
const socket = new net.Socket();
const measurementTimeout = 5000;
const client = new modbus.client.TCP(socket);

(() => {
    socket.connect(options);

    socket.on('error', (e) => {
        console.error(e);
        console.info('Server is offline. Entering Simulation Mode.');
        setInterval(() => generateMeasurement(), measurementTimeout);
    });

    socket.on('connect', () => {
        console.info('Modbus connection is established');
        setInterval(() => readMeasurement(), measurementTimeout);
    })
})();

const generateMeasurement = () => {
    const values = Array.from({length: 8}, () => Math.floor(Math.random() * 1001));
    formatAndSaveNewMeasurement(values, true);
}

const readMeasurement = () => {
    client.readInputRegisters(1, 8)
        .then((measurement) => {
            const values = measurement.response['_body']['_values'];
            formatAndSaveNewMeasurement(values, false);
        })
        .catch((e) => console.error(e));
}

const formatAndSaveNewMeasurement = (values, simulationMode) => {
    const newMeasurement = parameters.reduce((newMeasurementObject, title, id) => {
        let value;
        if (title.includes('/')) {
            const [numerator, denominator] = title.split(' / ')
            value = calculateRatio(numerator, denominator, values);
        } else {
            value = values[id];
        }
        return {...newMeasurementObject, [title]: value}
    }, {simulationMode, timestamp: Date.now()});
    saveMeasurement(newMeasurement);
}

const saveMeasurement = (newMeasurement) => {
    fs.readFile(measurements, 'utf-8', (e, data) => {
        if (e) {
            console.error(e);
        } else {
            const fileContent = JSON.parse(data);
            fileContent.push(newMeasurement);
            fs.writeFile(measurements, JSON.stringify(fileContent), 'utf-8', () => {
                console.info(`Added new measurement.`);
            })
        }
    })
}

const calculateRatio = (num, den, values) => {
    return (values[parameters.findIndex(el => el === num)] / values[parameters.findIndex(el => el === den)]).toFixed(3);
}
