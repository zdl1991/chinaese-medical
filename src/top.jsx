"use client";
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';

export default function Top({router}) {
    const { Header } = Layout;
    const [selectedKeys, setSelectedKeys] = useState('')
    const [styles, setStyles] = useState({})

    useEffect(() => {
        let path = window.location.pathname.split('/')[1]
        // router.map(item=>{
        //     if(item.include == path){
        //         console.log('item.include.slice',item.include)
        //         setSelectedKeys(item.include)
                if(path == 'home'){
                    setStyles({display: 'none'})
                }else{
                    setStyles({display: 'flex'})
                }
            // }
        // })
    }, [window.location.pathname])
    
    const onClick = (e) => {
        // console.log('e.key',e)
        setSelectedKeys(e.key);
        window.location.pathname = e?.keyPath[0]== '/home' ? '/' : e?.keyPath[0]
    };

    return <Header style={{ alignItems: 'center', ...styles }}>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedKeys]}
            onClick={onClick}
            items={[
                {
                    label: '首页',
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