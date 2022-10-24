import React from "react";
import styles from "./MainLayout.module.css"
import {Footer, Header} from "../../commponents";

interface propsType {
    children: React.ReactNode
}


export const MainLayout: React.FC<propsType> = (props) => {
    return <>
        <Header/>
        <div className={styles['page-content']}>
            {props.children}
        </div>
        <Footer/>
    </>
}
