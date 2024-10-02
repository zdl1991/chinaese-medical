"use client";
import React,{ useState, useEffect,useRef } from 'react';
import { Button} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { geUrlParams } from '../utils.jsx'
import styles from "../page.module.css";
import "./detail.scss"

export default function Deatil() {
    const [detail, setDetail] = useState({})

    useEffect(() => {
        getDetail()
    }, [ window.location.search ])

    const getDetail = async() => {
        let _id = geUrlParams(['id']).id
        const response = await fetch(`/api/standard/getStandard?id=${_id}`);
        const data = await response.json();
        setDetail(data[0]||{})
    }


    return (<div className={styles.body}>
        <div className={styles.title}>标准方剂详情</div>
        <div className={styles.line}></div>

        <div className='detailContent' >
            <div className='contTop'>
                <div>
                    <h1>{detail.name}</h1>
                    {detail.create_time && <div className='contTime'><ClockCircleOutlined /><span>{detail.create_time}</span></div>}
                </div>
                <Button href={`/addStandard?id=${detail.id}`} >编辑</Button>
            </div>
            <div className={styles.line}></div>
            <div className='contBody'>
                <p>1. 方剂描述</p>
                <span>{detail.standard_describe}</span>
                <p>2. 注解</p>
                <span>{detail.remark?detail.remark:'无'}</span>
            </div>
        </div>
    </div>)
}