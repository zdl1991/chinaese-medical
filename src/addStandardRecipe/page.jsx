"use client";
import { useState, useEffect,useRef } from 'react';
//import MyEditor from '../../../public/wangedit/wangedit'
import { ProForm, ProFormText } from '@ant-design/pro-components';
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

    //const onReset = () => {

    //}
    //const onChange = (newFields) => {
        
    //}


    return (<div className={styles.body}>
        <div className={styles.title}>新增标准方剂</div>
        <div className={styles.line}></div>
        <div className='formWrap'>
            <ProForm
                form={form}
                formRef={formRef}
                onFinish={async (values) => {
                   // console.log(values)
                    try {
                        await fetch('/api/standards/addStandardRecipe', {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: { "Content-Type": "application/json" }
                        })

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
                <ProForm.Item name={'describe'} label="标准方剂描述" initialValue={params.describe || ''}>
                    {/*<MyEditor cont={params.describe || ''} />*/}
                </ProForm.Item>
                <ProForm.Item name={'remark'} label="标准方剂注解"initialValue={params.remark || ''}>
                    {/*<MyEditor cont={params.remark || ''} />*/}
                </ProForm.Item>
            </ProForm>
        </div>
    </div>)
}