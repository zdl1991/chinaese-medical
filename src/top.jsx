"use client";
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { AntCloudOutlined } from '@ant-design/icons';

export default function Top({router}) {
    const { Header } = Layout;
    const [selectedKeys, setSelectedKeys] = useState('')

    useEffect(() => {
        let path = window.location.pathname.split('/')[1]
        router.map(item=>{
            if(item.include == path){
                console.log('item.include.slice',item.include)
                setSelectedKeys(item.include)
            }
        })
    }, [  ])
    
    const onClick = (e) => {
        console.log('e.key',e)
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
                    expandIcon: <AntCloudOutlined/>,
                    key: 'home',
                    keypath:'/'
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