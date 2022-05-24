import styles from './bar-chart.module.scss'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMeasurements} from "../../store/measurements";
import {defaultParameters} from '../../utils/default-parameters'
import parameters from "../../utils/parameters";
import {sendNotification} from "../../utils/telegram-bot";

export const BarChart = () => {

    const {lastMeasurement, limits} = useSelector(state => state);

    const barChartData = defaultParameters.reduce((data, title) => {
        const parameterValue = lastMeasurement[title];
        const parameterLimitValue = limits.find(limit => limit.title === title).value;
        const color = parameterValue >= parameterLimitValue ? '#DC2535' : '#215CBE';
        data.values = [...data.values, {y: parameterValue, color}]
        return data;
    }, {categories: defaultParameters, values: []})

    const alarmData = parameters.reduce((alarms, title) => {
        const parameterValue = lastMeasurement[title];
        const parameterLimitValue = limits.find(limit => limit.title === title).value;
        return parameterValue >= parameterLimitValue
            ? [...alarms, `${title}:    value: ${parameterValue}, limit: ${parameterLimitValue}`]
            : [...alarms]
    }, [])

    const handleAlarms = () => {
        if (+localStorage.getItem('lastAlarmedMeasurement') !== lastMeasurement.timestamp) {
            const alarmMessage = `Measurement Alarms%0A${new Date(+lastMeasurement.timestamp).toLocaleString()}%0A${alarmData.join('%0A')}`
            sendNotification(alarmMessage);
            localStorage.setItem('lastAlarmedMeasurement', lastMeasurement.timestamp);
        }
    }

    alarmData.length && handleAlarms();

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: barChartData.categories,
        },
        series: [
            {data: barChartData.values}
        ],
        legend: {
            enabled: false
        }
    }

    return (
        <div className={styles['chart']}>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )
}
