import styles from './chart-filter.module.scss';

export const ChartFilter = ({title, setFilteredData}) => {
    return (
        <div className={styles['chart-filter']} onClick={setFilteredData}>
            {title}
        </div>
    )
}
