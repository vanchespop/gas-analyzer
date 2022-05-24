import styles from './menu.module.scss';
import Link from "next/link";

const menuItems = [
    {title: 'Dashboard', href: '/'},
    {title: 'Settings', href: '/settings'},
];

export const Menu = () => {
    return (
        <div className={styles['menu']}>
            {menuItems.map((item, id) => {
                return <Link href={item.href} key={id}>
                    <div className={styles['menu__item']}>
                        {item.title}
                    </div>
                </Link>
            })}
        </div>
    )
}
