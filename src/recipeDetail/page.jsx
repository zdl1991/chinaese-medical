"use client";
import { Button  } from 'antd'; 
import styles from "../page.module.css";
import "./detail.scss" 

export default function Deatil() {

    //const handler = () =>{
    //    console.log(Router)
    //    Router.push({
    //      pathname: '/addRecipe',
    //      query: { isAdd: 0 }
    //    })
    //}


    return (<div className={styles.body}>
        <div className={styles.title}>处方详情</div>
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

        <div className='detailContent' >
            <h3>患者信息</h3>
            <div className='contTop'>
                <div className='contTopLeft'>
                    <div className='contItem'>患者名称：<span>李可可</span></div>
                    <div className='contItem'>患者性别：<span>女</span></div>
                    <div className='contItem'>患者id：<span>122993883</span></div>
                    <div className='contItem'>联系方式：<span>浙江省杭州市浙江省杭州市浙江省浙江省杭州市浙江省杭州市</span></div>
                </div>
                <Button  href='/addRecipe?isAdd=1' >编辑</Button>
            </div>
            <div className={styles.line}></div>
            <h3>处方信息</h3>
            <div className='contBody'>
                <div className='contBodyTop'>
                    <div className='contItem'>处方号：<span>142524</span></div>
                    <div className='contItem'>开方日期：<span>2024/07/07</span></div>
                    <div className='contItem'>贴数：<span>5</span></div>
                </div>
                <div className='contLine'>主诉：<span className='lineItem'>主诉主诉主诉</span></div>
                <div className='contLine'>诊断：<span className='lineItem'>诊断诊断</span></div>
                <div className='contLine'>处方：<span className='lineItem'>桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g桂枝10g</span></div>
                <div className='contLine'>注意事项：<span className='lineItem'>2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项2注意事项</span></div>
            </div>
        </div>
    </div>)
}