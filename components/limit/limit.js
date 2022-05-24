import styles from './limit.module.scss';
import {setLimit} from "../../store/measurements";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {getLimitValue} from "../../utils/get-limit-value";

export const Limit = ({parameter}) => {

    const {title, value, units, min, max, step} = parameter;

    const dispatch = useDispatch();

    const [limitValue, setLimitValue] = useState(() => {
        const value = getLimitValue(parameter)
        dispatch(setLimit({title, newLimitValue: value}));
        return value
    });

    const updateValue = (e) => {
        const isValid = e.currentTarget.checkValidity();
        if (!isValid) {
            e.target.reportValidity();
        } else {
            dispatch(setLimit({title, newLimitValue: +e.currentTarget.value}))
            setLimitValue(e.currentTarget.value);
        }
    }

    return (
        <div className={styles['limit']} key={title}>
            <div className={styles['limit__title']}>{`${title}${units ? `, ${units}` : ''}`}</div>
            <input
                className={styles['limit__value']}
                type="number"
                inputMode={'decimal'}
                min={min || 0}
                max={max || 1000}
                step={step || 1}
                value={limitValue}
                onChange={event => setLimitValue(+event.currentTarget.value)}
                onBlur={(event) => updateValue(event)}
            />
        </div>
    )
}
