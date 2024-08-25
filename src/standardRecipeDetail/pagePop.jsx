"use client";

import { Popover,  } from 'antd';
import styles from "../page.module.css";
import "./detail.scss"
import { Link } from 'react-router-dom';
//import Router from 'next/router'

export default function PagePop() {

    //const handler = () => {
    //    console.log(Router)
    //    Router.push({
    //        pathname: '/addStandardRecipe',
    //        query: { isAdd: 0 }
    //    })
    //}

    const content = (
        <div className='popItemWrap'>
            <Link
                to="/standardRecipe"
                className={styles.card}
                rel="noopener noreferrer"
            >
                标准方剂
            </Link>

            <Link
                to="/patient"
                className={styles.card}
                rel="noopener noreferrer"
            >
                患者
            </Link>

            <Link
                to="/recipe"
                className={styles.card}
                rel="noopener noreferrer"
            >
                处方
            </Link>
        </div>
    );


    return (<div className='popWrap'>
        <Popover content={content} trigger="hover">
            <div>菜单</div>
        </Popover>

    </div>)
}