import styles from './header.module.scss'
import {Menu} from "../menu/menu";
import {useSelector} from "react-redux";

export const Header = () => {

    const lastMeasurement = useSelector(state => state.lastMeasurement)

    return (
        <div className={styles['header']}>
            <div className={styles['header__title']}>
                <h2>Human-Machine Interface{lastMeasurement.simulationMode && `: Simulation Mode`}</h2>
            </div>
            <Menu/>
        </div>
    )
}
