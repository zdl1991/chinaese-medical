"use client";
import React, { useState } from 'react';
import MyEditor from '../../../public/wangedit/wangedit'
import PagePop from './pagePop'
import { Button, Form, Input, Popover} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import styles from "../page.module.css";
import "./detail.scss"
import Router from 'next/router'

export default function Deatil() {

    const handler = () =>{
        console.log(Router)
        Router.push({
          pathname: '/addStandardRecipe',
          query: { isAdd: 0 }
        })
    }

    return (<div className={styles.body}>
        <div className={styles.title}>标准方剂详情</div>
        <div className={styles.line}></div>
        {/* <div className='detailWrap'>
            <div className={styles.grid}>
                <a
                    href="/standardRecipe"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    <h2>
                        标准方剂 <span>-&gt;</span>
                    </h2>
                </a>

                <a
                    href="/patient"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    <h2>
                        患者 <span>-&gt;</span>
                    </h2>
                </a>

                <a
                    href="/recipe"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    <h2>
                        处方 <span>-&gt;</span>
                    </h2>

                </a>
            </div>

        </div> */}
        <PagePop> </PagePop>

        <div className='detailContent' >
            <div className='contTop'>
                <div>
                    <h1>桂枝汤</h1>
                    <div className='contTime'><ClockCircleOutlined /><span>2024/06/26 17:55:08</span></div>
                </div>
                <Button  href='/addStandardRecipe?isAdd=0' >编辑</Button>
                {/* href='/addStandardRecipe?isAdd=0' onClick={()=>handler()}*/}
            </div>
            <div className={styles.line}></div>
            <div className='contBody'>
                <p>1. 方剂描述</p>
                <span>桂枝3钱，芍药三钱</span>
                <p>2. 注解</p>
                <span>条辨15--热自发，</span>
            </div>
            <MyEditor />
        </div>
    </div>)
}