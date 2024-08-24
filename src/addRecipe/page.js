"use client";
import React, { useState, useEffect,useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { Button, Modal, Input, Radio, Space, message } from 'antd';
import styles from "../page.module.css";
import "./add.scss"
const { Search, TextArea } = Input;

export default function Deatil() {
    const [params, setParams] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStandardOpen, setIsStandardOpen] = useState(false);
    const [patientList, setPatientList] = useState([]);
    const [standardList, setStandardList] = useState([]);
    const [standard, setStandard] = useState({});
    const [patient, setPatient] = useState({});
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
   

    const handleOk = () => {
        console.log('formRef?.current', formRef?.current)
        formRef?.current.setFieldValue('name',patient.name)
        formRef?.current.setFieldValue('age',patient.age)
        formRef?.current.setFieldValue('sex',patient.sex)
        handleCancel()
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setPatient({})
    }
    const onStandardSearch = (v) => {
        fetchStandardList(v)
    }

    const handleStandardOk = () => {
        let R = formRef?.current.getFieldValue('recipe') || ''
        formRef?.current.setFieldValue('recipe',`${R}${standard.describe}`)
        handleStandardCancel()
    }
    const handleStandardCancel = () => {
        setIsStandardOpen(false);
        setStandard({})
    }
    const onSearch = (v) => {
        fetchPatientList(v)
    }

    const fetchPatientList = async (name) => {
        try {
          const response = await fetch(`/api/users?name=${name||''}`,{method: "GET"});
          if (response.ok) {
            const data = await response.json();
            console.log('data',data)
            setPatientList(data)
            setIsModalOpen(true);
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    const fetchStandardList = async (name) => {
        try {
          const response = await fetch(`/api/standards?name=${name||''}`,{method: "GET"});
          if (response.ok) {
            const data = await response.json();
            console.log('data',data)
            setStandardList(data)
            setIsStandardOpen(true);
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const onRadioChange = (e) => {
        setPatient(e.target.value)
    }
    const onStandardRadioChange = (e) => {
        setStandard(e.target.value)
    }

    return (<div className={styles.body}>
        <div className={styles.title}>新增处方</div>
        <div className={styles.line}></div>
        <div className='formWrap'>
            <ProForm
                form={form}
                formRef={formRef}
                onFinish={async (values) => {
                    // await waitTime(2000);
                    console.log('valuesvalues======',values);
                    message.success('提交成功');
                }}
                initialValues={params}
                fixSiderbar
                fixedHeader
            >
                <ProForm.Group title={'姓名'}>
                    <ProFormText
                        width="md"
                        name="name"
                        placeholder="请输入名称"
                        disabled={true}
                        initialValue={params.name || ''}
                    />
                    <Button onClick={fetchPatientList}>选择已有患者</Button>
                    <Button href='/addPatient'>新增患者</Button>
                </ProForm.Group>
                <ProFormText
                    width="md"
                    name="age"
                    label="年龄"
                    disabled={true}
                    placeholder="请输入名称"
                    initialValue={params.age || ''}
                />
                <ProFormRadio.Group
                    label="性别"
                    name="sex"
                    disabled={true}
                    initialValue="params.sex"
                    options={['男', '女']}
                />
                <ProForm.Item name={'narrative'} label="主诉" initialValue={params.narrative || ''}>
                    <TextArea rows={4} name="narrative" placeholder="请输入主诉"/>
                </ProForm.Item>
                <ProForm.Item name={'diagnosis'} label="诊断"initialValue={params.diagnosis || ''}>
                    <TextArea rows={4}  name="diagnosis" placeholder="请输入诊断"/>
                </ProForm.Item>
                <div  style={{display:'flex'}}>
                    <ProForm.Item name={'recipe'} label="处方"initialValue={params.recipe || ''} style={{flex:1}}>
                        <TextArea rows={4}  name="recipe" placeholder="请输入处方"/>
                    </ProForm.Item>
                    <Button className="recipeBtn" onClick={fetchStandardList}>添加标准处方</Button>
                </div>
                <ProFormText
                    width="md"
                    name="num"
                    label="贴数"
                    placeholder="请输入名称"
                    initialValue={params.num || ''}
                />
                <ProForm.Item name={'note'} label="注意事项"initialValue={params.note || ''}>
                    <TextArea rows={4}  name="note" placeholder="请输入注意事项"/>
                </ProForm.Item>
            </ProForm>
        </div>
        <Modal title="选择患者" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Search
                placeholder="搜索患者"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />
            <div className='radioWrap'>
                <Radio.Group onChange={onRadioChange} value={patient}>
                    <Space direction="vertical">
                        {
                            patientList.map(item=>(
                                <Radio value={item} key={item.id}>{item.name} {!!item.age?`${item.age}岁`:''} {item.sex==1?'女':'男'}</Radio>
                            ))
                        }
                    </Space>
                </Radio.Group>
            </div>
        </Modal>
        <Modal title="选择标准处方" open={isStandardOpen} onOk={handleStandardOk} onCancel={handleStandardCancel}>
            <Search
                placeholder="搜索标准处方"
                allowClear
                onSearch={onStandardSearch}
                style={{
                    width: 200,
                }}
            />
            <div className='radioWrap'>
                <Radio.Group onChange={onStandardRadioChange} value={standard}>
                    <Space direction="vertical">
                        {
                            standardList.map(item=>(
                                <Radio value={item} key={item.id}>{item.name} {item.describe}</Radio>
                            ))
                        }
                    </Space>
                </Radio.Group>
            </div>
        </Modal>
    </div>)
}