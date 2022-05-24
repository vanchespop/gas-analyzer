import styles from '../styles/Home.module.scss'
import {Container} from "../components/container/container";
import {Alarm} from "../components/alarm/alarm";
import {useDispatch, useSelector} from "react-redux";
import {BarChart} from "../components/bar-chart/bar-chart";
import {getLastMeasurement, getMeasurements} from "../store/measurements";
import parameters from '../utils/parameters';
import {useEffect} from "react";
import {HistoricalChart} from "../components/historical-chart/historical-chart";


export default function Home() {

    const {lastMeasurement} = useSelector(state => state);

    const lastMeasurementTime = () => {
        return new Date(+lastMeasurement.timestamp).toLocaleString();
    }

    return (
        <div className={styles['dashboard']}>
            <div className={styles['dashboard__title']}>Dashboard</div>
            <div className={styles['dashboard__content']}>
                <div className={styles['dashboard__content__alarm-info']}>
                    <Container title={'Alarms'}>
                        <div className={styles['dashboard__content__alarm-info__content']}>
                            {parameters.map((parameter, id) => <Alarm title={parameter} key={id}/>)}
                        </div>
                    </Container>
                </div>
                <div className={styles['dashboard__content__last-measurement']}>
                    <Container
                        title={`Last Measurement ${lastMeasurementTime()}`}>
                        <BarChart/>
                    </Container>
                </div>
                <div className={styles['dashboard__content__historical-chart']}>
                    <Container title={'Historical Chart'}>
                        <HistoricalChart/>
                    </Container>
                </div>
            </div>
        </div>
    )
}
