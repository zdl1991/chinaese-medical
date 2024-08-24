"use client";
import React, { useState } from 'react';
import { Button, Popover, Input, } from 'antd';
import styles from "../page.module.css";
import "./detail.scss"
import Router from 'next/router'

export default function PagePop() {

    const handler = () => {
        console.log(Router)
        Router.push({
            pathname: '/addStandardRecipe',
            query: { isAdd: 0 }
        })
    }

    const content = (
        <div className='popItemWrap'>
            <a
                href="/standardRecipe"
                className={styles.card}
                rel="noopener noreferrer"
            >
                标准方剂
            </a>

            <a
                href="/patient"
                className={styles.card}
                rel="noopener noreferrer"
            >
                患者
            </a>

            <a
                href="/recipe"
                className={styles.card}
                rel="noopener noreferrer"
            >
                处方
            </a>
        </div>
    );


    return (<div className='popWrap'>
        <Popover content={content} trigger="hover">
            <div>菜单</div>
        </Popover>

    </div>)
}