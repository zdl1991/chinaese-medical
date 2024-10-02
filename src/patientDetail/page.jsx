"use client";
import { Button } from 'antd';
import styles from "../page.module.css";
import "./detail.scss"

export default function Deatil() {

    return (<div className={styles.body}>
        <div className={styles.title}>处方详情</div>
        <div className={styles.line}></div>

        <div className='detailContent' >
            <h1>患者信息</h1>
            <div className='contTop'>
                <div className='contTopLeft'>
                    <div className='contItem'>患者名称：<span>李可可</span></div>
                    <div className='contItem'>患者性别：<span>女</span></div>
                    <div className='contItem'>患者id：<span>122993883</span></div>
                    <div className='contItem'>联系方式：<span>浙江省杭州市浙江省杭州市浙江省浙江省杭州市浙江省杭州市</span></div>
                </div>
                <Button href='/addRecipe?isAdd=1' >编辑</Button>
            </div>
            <div className={styles.line}></div>
            <h1>处方信息</h1>
            <div className='contBody'>
                <div className='contBodyTop'>
                    <div className='contItem'>处方号：<span>142524</span></div>
                    <div className='contItem'>开方日期：<span>2024/07/07</span></div>
                    <div className='contItem'>贴数：<span>5</span></div>
                </div>
                <div className='contLine'>主诉：<span>主诉主诉主诉</span></div>
                <div className='contLine'>诊断：<span>诊断诊断</span></div>
                <div className='contLine'>处方：<span>桂枝10g</span></div>
                <div className='contLine'>注意事项：<span>2注意事项</span></div>
            </div>
        </div>
    </div>)
}