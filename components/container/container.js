import styles from './container.module.scss';

export const Container = ({children, title}) => {
    return (
        <div className={styles.container}>
            {title && <h3 className={styles['container__header']}>
                {title}
            </h3>}
            <div className={styles['container__content']}>
                {children}
            </div>
        </div>
    )
}
