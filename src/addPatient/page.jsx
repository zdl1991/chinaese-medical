"use client";
import { useState, useEffect, useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio, ProFormDigit } from '@ant-design/pro-components';
import { Input, message } from 'antd'
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
            formRef?.current.setFieldsValue({})
        }
    }, [])
    
    const onFinish = async (values) => {
        console.log(values)
        try {
            await fetch('/api/patient/addPatient', {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            })

        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }


    return (<div className={styles.body}>
        <div className={styles.title}>新增患者</div>
        <div className={styles.line}></div>
        <div className='formWrap'>
            <ProForm
                form={form}
                formRef={formRef}
                onFinish={(values) => {
                    console.log(values);
                    onFinish(values)
                    message.success('提交成功');
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
                <ProFormDigit
                    width="md"
                    label="年龄"
                    name="age"
                    min={1}
                    max={100}
                    fieldProps={{ precision: 0 }}
                    initialValue={params.age || ''}
                />
                <ProFormRadio.Group
                    label="性别"
                    name="sex"
                    initialValue={1}
                    options={[{ label: '男', value: 1 }, { label: '女', value: 0 }]}
                />
                <ProFormText
                    width="md"
                    name="phone"
                    label="联系方式"
                    placeholder="请输入联系方式"
                    initialValue={params.phone || ''}
                />
                <ProFormText
                    width="md"
                    name="address"
                    label="联系地址"
                    placeholder="请输入联系地址"
                    initialValue={params.address || ''}
                />
                <ProForm.Item name={'remark'} label="描述" initialValue={params.remark || ''}>
                    <TextArea rows={4} name="remark" placeholder="请输入描述" />
                </ProForm.Item>
            </ProForm>
        </div>
    </div>)
}