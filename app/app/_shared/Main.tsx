import styles from './Main.module.css';
import { ReactNode } from 'react';

export const Main = ({children}: { children: ReactNode}) => {
    return <main className={styles.main}>{children}</main>
}