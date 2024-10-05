"use client";
import { useState, useEffect, useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio, ProFormDigit } from '@ant-design/pro-components';
import { Button, Input, message } from 'antd';
import styles from "../page.module.css";
import "./add.scss"
import { geUrlParams } from '../utils.jsx'
import PatientModal from './patientModal.jsx'
import StandardtModal from './standardModal.jsx'
const { TextArea } = Input;

export default function Deatil() {
    const [detail, setDetail] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStandardOpen, setIsStandardOpen] = useState(false);
    const [standard, setStandard] = useState({});
    const [patient, setPatient] = useState({});
    const [id, setId] = useState('')
    const [form] = ProForm.useForm();

    const formRef = useRef();

    const getDetail = async (id) => {
        const response = await fetch(`/api/recipe/getRecipe?id=${id}`);
        const data = await response.json();
        setDetail(data[0])
        formRef?.current.setFieldsValue(data[0])
    }

    useEffect(() => {
        let _id = geUrlParams(['id'])?.id || ''
        if (_id) {
            setId(_id)
            getDetail(_id)
        }
    }, [window.location.search])

    const changeFormValue = (patient) => {
        formRef?.current.setFieldValue('patient_id', patient.id)
        formRef?.current.setFieldValue('patient_name', patient.name)
        formRef?.current.setFieldValue('patient_age', patient.age)
        formRef?.current.setFieldValue('patient_sex', patient.sex)
        formRef?.current.setFieldValue('patient_address', patient.address)
        setPatient({ ...patient, patient_id: patient.id, patient_address: patient.address })
    }
    const changeFormRecipe = (standard) => {
        let R = formRef?.current.getFieldValue('recipe_content') || ''
        formRef?.current.setFieldValue('recipe_content', `${R}${standard.standard_describe}`)
        setStandard({ ...standard, standard_id: standard.id })
    }

    const addRecipe = async (values) => {
        if (!patient.patient_id) {
            message.warning('请选择患者')
            return
        }
        let params = {
            ...values,
            patient_id: patient.patient_id, 
            patient_address: patient.patient_address, 
            standard_id: standard.standard_id,
        }
        try {
            await fetch('/api/recipe/addRecipe', {
                method: "POST",
                body: JSON.stringify(params),
                headers: { "Content-Type": "application/json" }
            })
            message.info('新增成功')
            formRef?.current.resetFields()
            setTimeout(() => {window.location.replace(document.referrer)}, 1000)
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    const updateRecipe = async (values) => {
        try {
            await fetch('/api/recipe/updateRecipe', {
                method: "PUT",
                body: JSON.stringify({ ...values, id }),
                headers: { "Content-Type": "application/json" }
            })
            message.info('编辑成功')
            setTimeout(() => {window.location.replace(document.referrer)}, 1000)
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    return (<div className={styles.body}>
        <div className={styles.title}>{!!id ? "编辑处方" : "新增处方"}</div>
        <div className={styles.line}></div>
        <div className='formWrap'>
            <ProForm
                form={form}
                formRef={formRef}
                onFinish={(values) => id ? updateRecipe(values) : addRecipe(values)}
            >
                <ProForm.Group title={'姓名'}>
                    <ProFormText
                        width="md"
                        name="patient_name"
                        placeholder="请输入名称"
                        disabled={true}
                        initialValue={detail.patient_name || ''}
                    />
                    <Button onClick={() => setIsModalOpen(true)} disabled={!!id}>选择已有患者</Button>
                    <Button href='/addPatient' disabled={!!id}>新增患者</Button>
                </ProForm.Group>
                <ProFormText
                    width="md"
                    name="patient_age"
                    label="年龄"
                    disabled={true}
                    placeholder="请输入年龄"
                    initialValue={detail.patient_age || ''}
                />
                <ProFormRadio.Group
                    label="性别"
                    name="patient_sex"
                    disabled={true}
                    initialValue={1}
                    options={[{ label: '男', value: 1 }, { label: '女', value: 0 }]}
                />
                <ProForm.Item name={'narrative'} label="主诉" initialValue={detail.narrative || ''}>
                    <TextArea rows={4} name="narrative" placeholder="请输入主诉" />
                </ProForm.Item>
                <ProForm.Item name={'diagnosis'} label="诊断" initialValue={detail.diagnosis || ''}>
                    <TextArea rows={4} name="diagnosis" placeholder="请输入诊断" />
                </ProForm.Item>
                <div style={{ display: 'flex' }}>
                    <ProForm.Item name={'recipe_content'} label="处方" initialValue={detail.recipe_content || ''} style={{ flex: 1 }}>
                        <TextArea rows={4} name="recipe_content" placeholder="请输入处方" />
                    </ProForm.Item>
                    {!id && <Button className="recipeBtn" onClick={() => setIsStandardOpen(true)}>添加标准处方</Button>}
                </div>
                <ProFormDigit
                    width="md"
                    name="num"
                    label="贴数"
                    placeholder="请输入贴数"
                    initialValue={detail.num || ''}
                    min={1}
                    max={100}
                    fieldProps={{ precision: 0 }}
                />
                <ProForm.Item name={'note'} label="注意事项" initialValue={detail.note || ''}>
                    <TextArea rows={4} name="note" placeholder="请输入注意事项" />
                </ProForm.Item>
            </ProForm>
        </div>
        <PatientModal open={isModalOpen} setIsOpen={setIsModalOpen} changeForm={changeFormValue} />
        <StandardtModal open={isStandardOpen} setIsOpen={setIsStandardOpen} changeForm={changeFormRecipe} />
    </div>)
}