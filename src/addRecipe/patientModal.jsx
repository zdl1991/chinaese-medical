"use client";
import { useState, useEffect, useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { Button, Modal, Input, Radio, Space, message } from 'antd';
import "./add.scss"
const { Search, TextArea } = Input;

export default function PatientModal({ open, setIsOpen, changeForm }) {
    const [patientList, setPatientList] = useState([]);
    const [patient, setPatient] = useState({});

    useEffect(()=>{
        if(!!open)fetchList('')
    }, [open])

    const handleOk = () => {
        changeForm(patient)
        handleCancel()
    }
    const handleCancel = () => {
        setIsOpen(false);
        setPatient({})
    }

    const fetchList = async (name) => {
        try {
            const response = await fetch(`/api/patient/getList?name=${name || ''}`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                setPatientList(data.table)
                setIsOpen(true);
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

    return (
        <Modal title="选择患者" open={open} onOk={handleOk} onCancel={handleCancel}>
            <Search
                placeholder="搜索患者"
                allowClear
                onSearch={ (v)=>fetchList(v)}
                style={{ width: 200 }}
            />
            <div className='radioWrap'>
                <Radio.Group onChange={onRadioChange} value={patient}>
                    <Space direction="vertical">
                        {
                            patientList.map(item => (
                                <Radio value={item} key={item.id}>{item.name} {!!item.age ? `${item.age}岁` : ''} {item.sex == 1 ? '男' : '女'}</Radio>
                            ))
                        }
                    </Space>
                </Radio.Group>
            </div>
        </Modal>
    )
}