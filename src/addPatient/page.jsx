"use client";
import { useState, useEffect,useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import {message} from 'antd'
import styles from "../page.module.css";
import "./add.scss"

export default function Deatil() {
    const [params, setParams] = useState({})
    const [form] = ProForm.useForm();

    const formRef = useRef();
    const getParams = (names) => {
        const params = new URLSearchParams(window.location.search)
        const result = {}
        let field = []
        names.forEach((name) => {
            result[name] = params.get(name)
        })
        console.log('result', result, 'field=====', field)
        setParams({ ...result })
        formRef?.current.setFieldsValue(result)
    }

    useEffect(() => {
        console.log('formRef?.current',formRef?.current)
        getParams(['isAdd', 'name', 'describe', 'remark'])
    }, [window.location.search,])

    const onReset = () => {

    }
    const onChange = (newFields) => {
        
    }
    const onFinish = async(values)=>{
        try{
            await fetch('/api/users',{
                method: "POST",
                body: JSON.stringify(values)
            })

        }catch(err){
            console.error('Error fetching data:', error);
        }
    }


    return (<div className={styles.body}>
        <div className={styles.title}>新增患者</div>
        <div className={styles.line}></div>
        <div className='formWrap'>
            <ProForm
                form={form}
                formRef={formRef}
                //layout="inline"
                onFinish={(values) => {
                    // await waitTime(2000);
                    console.log(values);
                    onFinish(values)
                    //message.success('提交成功');
                }}
                initialValues={params}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="姓名"
                    placeholder="请输入名称"
                    initialValue={params.name || ''}
                />
                <ProFormText
                    width="md"
                    name="age"
                    label="年龄"
                    placeholder="请输入名称"
                    initialValue={params.name || ''}
                />
                <ProFormRadio.Group
                    label="性别"
                    name="sex"
                    initialValue="男"
                    options={['男', '女']}
                />
                <ProFormText
                    width="md"
                    name="phone"
                    label="联系方式"
                    placeholder="请输入名称"
                    initialValue={params.name || ''}
                />
                <ProFormText
                    width="md"
                    name="address"
                    label="联系地址"
                    placeholder="请输入名称"
                    initialValue={params.name || ''}
                />
                <ProForm.Item name={'describe'} label="描述" initialValue={params.describe || ''}>

                </ProForm.Item>
            </ProForm>
        </div>
    </div>)
}