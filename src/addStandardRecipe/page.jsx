"use client";
import React,{ useState, useEffect,useRef } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import {message, Input} from 'antd'
import styles from "../page.module.css";
import "./add.scss"
const { TextArea } = Input;

export default function Deatil() {
    const [params, setParams] = useState({})
    const [cot,setCot]=useState(1)
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
        getParams(['isAdd', 'name', 'standard_describe', 'remark'])
    }, [window.location.search,])

    return (
    <div className={styles.body}>
        <div className={styles.title}>新增标准方剂</div>
        <div className={styles.line}></div>
        <div className='formWrap'>
            <ProForm
                form={form}
                formRef={formRef}
                onFinish={async (values) => {
                    try {
                        await fetch('/api/standards/addStandardRecipe', {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: { "Content-Type": "application/json" }
                        })
                        message.info('新增成功')
                        formRef?.current.resetFields()
                    } catch (err) {
                        console.error('Error fetching data:', error);
                    }
                }
                }
                initialValues={params}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="标准方剂名称"
                    tooltip="最长为 24 位"
                    placeholder="请输入名称"
                    initialValue={params.name || ''}
                />
                <ProForm.Item name={'standard_describe'} label="标准方剂描述" initialValue={params.standard_describe || ''}>
                    <TextArea rows={4}  name="diagnosis" placeholder="请输入标准方剂描述"/>
                </ProForm.Item>
                <ProForm.Item name={'remark'} label="标准方剂注解"initialValue={params.remark || ''}>
                    <TextArea rows={4}  name="diagnosis" placeholder="请输入标准方剂注解"/>
                </ProForm.Item>
            </ProForm>
            
        </div>
    </div>
    )
}

