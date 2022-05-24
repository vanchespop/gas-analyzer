import styles from './alarm.module.scss'
import {useSelector} from "react-redux";

export const Alarm = ({title}) => {

    const {lastMeasurement, limits} = useSelector(state => state);

    const parameterValue = lastMeasurement[title];
    const parameterLimitValue = limits.find(limit => limit.title === title).value;

    return (
        <div className={styles['alarm']}>
            <div>
                {title}
            </div>
            <span
                className={`${styles['alarm__indicator']} ${parameterValue >= parameterLimitValue ? styles['alarm__indicator-active'] : ''}`}/>
        </div>
    )
}
