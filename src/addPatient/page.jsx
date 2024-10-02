"use client";
import { useState, useEffect, useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { Input } from 'antd'
import styles from "../page.module.css";
import "./add.scss"
const { TextArea } = Input;

export default function Deatil() {

    const [params, setParams] = useState({})
    const [form] = ProForm.useForm();

    const formRef = useRef();

    const getDetail = async (id) => {

        const response = await fetch(`/api/patient/getPatient?id=${id}`, { method: "GET" });
        if (response.ok) {
            const result = await response.json();
            //console.log('data', data)
            setParams({ ...result[0] })
            formRef?.current.setFieldsValue(result[0])
        } else {
            throw new Error('Failed to fetch data');
        }
    }

    //初始化的时候判断是否是编辑模式
    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("id")
        if (!!id) {
            getDetail(id)
        }
    }, [])

    const onReset = () => {

    }
    const onChange = (newFields) => {

    }
    const onFinish = async (values) => {
        try {
            await fetch('/api/users', {
                method: "POST",
                body: JSON.stringify(values)
            })

        } catch (err) {
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
                    <TextArea rows={4} name="diagnosis" placeholder="请输入描述" />
                </ProForm.Item>
            </ProForm>
        </div>
    </div>)
}