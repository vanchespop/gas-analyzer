import styles from './historical-chart.module.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useDispatch, useSelector} from "react-redux";
import {defaultParameters} from '../../utils/default-parameters'
import {ChartFilter} from "../chart-filter/chart-filter";
import {useEffect, useState} from "react";
import {getMeasurements} from "../../store/measurements";


const seriesColors = ['#FF6F00', '#558B2F', '#0288D1', '#673AB7', '#8E24AA', '#00ACC1', '#546E7A', '#D32F2F'];

const chartOptions = {
    title: {
        text: ''
    }
}

export const HistoricalChart = () => {

    const measurements = useSelector(state => state.measurements);

    const dispatch = useDispatch()

    const [measurementsRollback, setMeasurementsRollback] = useState(Date.now);

    useEffect(() => {
        dispatch(getMeasurements());
        const I = setInterval(() => dispatch(getMeasurements()), 2500);
        return () => {
            clearInterval(I);
        };
    }, [dispatch]);

    const rollbackTimestamp = Date.now() - measurementsRollback;

    const getParameterValuesArray = (parameter) => {
        const parameterValuesArray = [];
        measurements
            .filter(measurement => measurement.timestamp > rollbackTimestamp)
            .forEach(measurement => parameterValuesArray
                .push(measurement[parameter]));
        return parameterValuesArray;
    }

    const historicalChartData = defaultParameters.reduce((options, parameter, id) => {
        options.series.push({
            data: measurements.length ? getParameterValuesArray(parameter) : [],
            color: seriesColors[id],
            name: parameter
        })
        return options;
    }, {series: [], ...chartOptions});

    return <div className={styles['chart']}>
        <div className={styles['chart__filters']}>
            <ChartFilter title={'1 min'} setFilteredData={() => setMeasurementsRollback(60000)}/>
            <ChartFilter title={'5 min'} setFilteredData={() => setMeasurementsRollback(300000)}/>
            <ChartFilter title={'10 min'} setFilteredData={() => setMeasurementsRollback(600000)}/>
            <ChartFilter title={'1 h'} setFilteredData={() => setMeasurementsRollback(3600000)}/>
            <ChartFilter title={'All'} setFilteredData={() => setMeasurementsRollback(Date.now)}/>
        </div>
        <HighchartsReact
            highcharts={Highcharts}
            options={historicalChartData}
        />
    </div>
}
