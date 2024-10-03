"use client";
import { Layout, Menu } from 'antd';
import { useState } from 'react';

export default function Top({router}) {
    const { Header } = Layout;
    const [selectedKeys, setSelectedKeys] = useState('')

    
    const onClick = (e) => {
        // console.log('e.key',e)
        setSelectedKeys(e.key);
        window.location.pathname = e?.keyPath[0]
    };

    return <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedKeys]}
            onClick={onClick}
            items={[
                {
                    label: '首页',
                    key: 'home',
                    keypath:'/home'
                }, {
                    label: '标准方剂',
                    key: 'standard',
                    keypath:'/standard'
                }, {
                    label: '患者',
                    key: 'patient',
                    keypath:'/patient'
                }, {
                    label: '处方',
                    key: 'recipe',
                    keypath:'/recipe'
                }

            ]}
            style={{ flex: 1, minWidth: 0 }}
        />
    </Header>
}