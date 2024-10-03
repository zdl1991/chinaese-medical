"use client";
import React,{ useState, useEffect,useRef } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import {message, Input} from 'antd'
import { geUrlParams } from '../utils.jsx'
import styles from "../page.module.css";
import "./add.scss"
const { TextArea } = Input;

export default function Deatil() {
    const [detail, setDetail] = useState({})
    const [id,setId]=useState('')
    const [form] = ProForm.useForm();

    const formRef = useRef();

    useEffect(() => {
        let _id = geUrlParams(['id'])?.id || ''
        if(_id){
            setId(_id)
            getDetail(id)
        }
    }, [window.location.search,])

    const getDetail = async(id) => {
        const response = await fetch(`/api/standard/getStandard?id=${id}`);
        const data = await response.json();
        setDetail(data[0])
        formRef?.current.setFieldsValue(data[0])
    }

    const addStandard = async(values)=>{
        try {
            await fetch('/api/standard/addStandard', {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            })
            message.info('新增成功')
            formRef?.current.resetFields()
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    const updateStandard = async(values)=>{
        try {
            await fetch('/api/standard/updateStandard', {
                method: "PUT",
                body: JSON.stringify({...values, id}),
                headers: { "Content-Type": "application/json" }
            })
            message.info('编辑成功')
            // history.go(-1)
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    return (
    <div className={styles.body}>
        <div className={styles.title}>新增标准方剂</div>
        <div className={styles.line}></div>
        <div className='formWrap'>
            <ProForm
                form={form}
                formRef={formRef}
                onFinish={(values)=>id? updateStandard(values) : addStandard(values)}
                initialValues={detail}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="标准方剂名称"
                    tooltip="最长为 24 位"
                    placeholder="请输入名称"
                    initialValue={detail.name || ''}
                />
                <ProForm.Item name={'standard_describe'} label="标准方剂描述" initialValue={detail.standard_describe || ''}>
                    <TextArea rows={4}  name="diagnosis" placeholder="请输入标准方剂描述"/>
                </ProForm.Item>
                <ProForm.Item name={'remark'} label="标准方剂注解"initialValue={detail.remark || ''}>
                    <TextArea rows={4}  name="diagnosis" placeholder="请输入标准方剂注解"/>
                </ProForm.Item>
            </ProForm>
            
        </div>
    </div>
    )
}

