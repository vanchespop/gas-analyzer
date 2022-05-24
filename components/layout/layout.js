import styles from './layout.module.scss';
import {Header} from "../header/header";
import {Footer} from "../footer/footer";

export const Layout = ({children}) => {
    return (
        <div>
            <Header/>
            <div className={styles['content-container']}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}
