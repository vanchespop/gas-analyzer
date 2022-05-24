import styles from '../styles/settings.module.scss';
import {Container} from "../components/container/container";
import {Limit} from "../components/limit/limit";
import {useSelector} from "react-redux";

const Settings = () => {

    const limits = useSelector(state => state.limits);

    const defaultLimits = limits.filter(limit => limit.units);
    const ratioLimits = limits.filter(limit => !limit.units);

    console.log(limits);

    return (
        <div className={styles['settings']}>
            <div className={styles['settings__title']}>Settings</div>
            <div className={styles['settings__content']}>
                <Container title={'Alarm Limits'}>
                    <div className={styles['settings__content__limits']}>
                        <div className={styles['settings__content__limits__params']}>
                            {defaultLimits.map((parameter, id) => {
                                return <Limit parameter={parameter} key={id}/>
                            })}
                        </div>
                    </div>
                </Container>
                <Container title={'Ratios Limits'}>
                    <div className={styles['settings__content__limits']}>
                        <div className={styles['settings__content__limits__params']}>
                            {ratioLimits.map((parameter, id) => {
                                return <Limit parameter={parameter} key={id}/>
                            })}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )

}

export default Settings;
