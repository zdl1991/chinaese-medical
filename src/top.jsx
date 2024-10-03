"use client";
import { Layout, Menu } from 'antd';
import styles from "./page.module.css";

export default function Top() {
    const { Header } = Layout;

    const topItems = [
        {
            label: '首页',
            key: 'home',
            keyPath: '/home',
            includePath: ["/home"]

        }, {
            label: '标准方剂',
            key: 'standard',
            keyPath: '/standard',
            includePath: ["/standard", "/standardDetail", "/addStandard"]
        }, {
            label: '患者',
            key: 'patient',
            keyPath: '/patient',
            includePath: ["/patient", "/patientDetail", "/addPatient"]
        }, {
            label: '处方',
            key: 'recipe',
            keyPath: '/recipe',
            includePath: ["/recipe", "/recipeDetail", "/addRecipe"]
        }
    ]

    const onClick = (item) => {
        window.location.pathname = item.keyPath
    };

    return window.location.pathname !== '/home' ?
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.topNav}>
                {topItems.map((item, index) => (
                    <div
                        className={styles.topNavitem}
                        style={{ borderBottomColor: item.includePath.includes(window.location.pathname) ? '#1677ff' : '001529', }}
                        key={index}
                        onClick={() => onClick(item)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </Header> : null
}