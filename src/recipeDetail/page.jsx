"use client";
import React,{ useState, useEffect,useRef } from 'react';
import { Button  } from 'antd'; 
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
        const response = await fetch(`/api/recipe/getRecipe?id=${_id}`);
        const data = await response.json();
        setDetail(data[0]||{})
    }

    return (<div className={styles.body}>
        <div className={styles.title}>处方详情</div>
        <div className={styles.line}></div>

        <div className='detailContent' >
            <h3>患者信息</h3>
            <div className='contTop'>
                <div className='contTopLeft'>
                    <div className='contItem'>患者名称：<span>{detail.patient_name}</span></div>
                    <div className='contItem'>患者性别：<span>{detail.patient_sex === 0 ? '女' : '男'}</span></div>
                    <div className='contItem'>患者id：<span>{detail.patient_id}</span></div>
                    <div className='contItem'>联系方式：<span>{detail.patient_address}</span></div>
                </div>
                <Button  href={`/addRecipe?id=${detail.id}`}>编辑</Button>
            </div>
            <div className={styles.line}></div>
            <h3>处方信息</h3>
            <div className='contBody'>
                <div className='contBodyTop'>
                    <div className='contItem'>处方号：<span>{detail.recipe_number}</span></div>
                    <div className='contItem'>开方日期：<span>{detail.create_time}</span></div>
                    <div className='contItem'>贴数：<span>{detail.num}</span></div>
                </div>
                <div className='contLine'>主诉：<span className='lineItem'>{detail.narrative}</span></div>
                <div className='contLine'>诊断：<span className='lineItem'>{detail.diagnosis}</span></div>
                <div className='contLine'>处方：<span className='lineItem'>{detail.recipe_content}</span></div>
                <div className='contLine'>注意事项：<span className='lineItem'>{detail.note}</span></div>
            </div>
        </div>
    </div>)
}