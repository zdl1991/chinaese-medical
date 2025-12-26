"use client";
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import styles from "../page.module.css";
import "./detail.scss"

export default function Deatil() {


    const [patient, setDetile] = useState({})
    const [id, setId] = useState({})
    const [list, setList] = useState([])

    const getDetail = async (id) => {

        const response = await fetch(`/api/patient/getPatient?id=${id}`, { method: "GET" });
        if (response.ok) {
            const result = await response.json();
            setDetile(result[0])
        } else {
            throw new Error('Failed to fetch data');
        }
    }

    const getList = async (id) => {
        const response = await fetch(`/api/recipe/getList?patient_id=${id}`, { method: "GET" });
        if (response.ok) {
            const result = await response.json();
            setList(result.table)
        } else {
            throw new Error('Failed to fetch data');
        }
    }

    useEffect(() => {
        const _id = new URLSearchParams(window.location.search).get("id")
        if (!!_id) {
            getDetail(_id)
            setId(_id)
            getList(_id)
        }
    }, [])

    return (<div className={styles.body}>
        <div className='detailContent' >
            <h3>患者信息</h3>
            <div className='contTop'>
                <div className='contTopLeft'>
                    <div className='contItem'>患者名称：<span>{patient.name}</span></div>
                    <div className='contItem'>患者性别：<span>{['女', '男'][patient.sex]}</span></div>
                    <div className='contItem'>患者年龄：<span>{patient.age}</span></div>
                    <div className='contItem'>联系方式：<span>{patient.phone}</span></div>
                    <div className='contItem'>患者地址：<span>{patient.address}</span></div>
                    <div className='contItem'>备注：<span>{patient.remark}</span></div>
                </div>
                <Button href={`/addPatient?id=${id}`} >编辑</Button>
                <Button href={`/addRecipe?patientId=${id}`}>快速开方</Button>
            </div>
            <div className={styles.line}></div>
            <h3>处方信息</h3>
            {list.map((v, index) =>
            (<div className='contBody' key={index}>
                <div className='contBodyTop'>
                    <div className='contItem'>开方日期：<span>{(new Date(v.create_time)).toLocaleString()}</span></div>
                    <div className='contItem'>贴数：<span>{v.num}</span></div>
                </div>
                <div className='contLine'>主诉：<span>{v.narrative}</span></div>
                <div className='contLine'>诊断：<span>{v.diagnosis}</span></div>
                <div className='contLine'>处方：<span>{v.recipe_content}</span></div>
                <div className='contLine'>注意事项：<span>{v.note}</span></div>
                <div className={styles.line}></div>
            </div>
            )
            )}
        </div>
    </div>)
}