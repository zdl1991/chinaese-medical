"use client";
import { useState, useEffect, useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio, ProFormDigit } from '@ant-design/pro-components';
import { Button, Input, message } from 'antd';
import styles from "../page.module.css";
import "./add.scss"
import { geUrlParams } from '../utils.jsx'
import PatientModal from './patientModal.jsx'
import StandardtModal from './standardModal.jsx'
import { Logger } from 'sass';
const { TextArea } = Input;

export default function Deatil() {
    const [detail, setDetail] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStandardOpen, setIsStandardOpen] = useState(false);
    const [standard, setStandard] = useState({});
    const [patient, setPatient] = useState({});
    const [id, setId] = useState('')
    const [patientId, setPatientId] = useState('')
    const [preRecipe, setPreRecipe] = useState({})
    const [form] = ProForm.useForm();

    const formRef = useRef();

    const getDetail = async (id) => {
        const response = await fetch(`/api/recipe/getRecipe?id=${id}`);
        const data = await response.json();
        setDetail(data[0])
        formRef?.current.setFieldsValue(data[0])
    }
    const getPatientDetail = async (id) => {

        const response = await fetch(`/api/patient/getPatient?id=${id}`, { method: "GET" });
        if (response.ok) {
            const result = await response.json();
            // setPatient(result[0])
            changeFormValue(result[0])
        } else {
            throw new Error('Failed to fetch data');
        }
    }

    useEffect(() => {
        let _id = geUrlParams(['id'])?.id || ''
        let _patientId = geUrlParams(['patientId'])?.patientId || ''
        if (_id) {
            setId(_id)
            getDetail(_id)
        }
        if(_patientId){
            setPatientId(_patientId)
            getPatientDetail(_patientId)
        }
    }, [window.location.search])

    const changeFormValue = (_patient) => {
        formRef?.current.setFieldValue('patient_id', _patient.id)
        formRef?.current.setFieldValue('patient_name', _patient.name)
        formRef?.current.setFieldValue('patient_age', _patient.age)
        formRef?.current.setFieldValue('patient_sex', _patient.sex)
        formRef?.current.setFieldValue('patient_address', _patient.address)
        setPatient({ ..._patient, patient_id: _patient.id, patient_address: _patient.address })
    }
    const changeFormRecipe = (standard) => {
        let R = formRef?.current.getFieldValue('recipe_content') || ''
        formRef?.current.setFieldValue('recipe_content', `${R}${standard.standard_describe}`)
        setStandard({ ...standard, standard_id: standard.id })
    }
    // 新增处方
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
            const response = await fetch('/api/recipe/addRecipe', {
                method: "POST",
                body: JSON.stringify(params),
                headers: { "Content-Type": "application/json" }
            })
            if (response.ok) {
                message.info('新增成功')
                formRef?.current.resetFields()
                setTimeout(() => {window.location.replace(document.referrer)}, 1000)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }
    // 编辑处方
    const updateRecipe = async (values) => {
        try {
            const response = await fetch('/api/recipe/updateRecipe', {
                method: "PUT",
                body: JSON.stringify({ ...values, id }),
                headers: { "Content-Type": "application/json" }
            })
            if (response.ok) {
                message.info('编辑成功')
                setTimeout(() => {window.location.replace(document.referrer)}, 1000)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }
    // 导入上个处方
    const inportRecipe = async() => {
        const response = await fetch(`/api/recipe/getList?patient_id=${patientId}`, { method: "GET" });
        if (response.ok) {
            const result = await response.json();
            let recipe = result.table[0] || {}
            formRef?.current.setFieldValue('narrative', recipe.narrative)
            formRef?.current.setFieldValue('diagnosis', recipe.diagnosis)
            formRef?.current.setFieldValue('recipe_content', recipe.recipe_content)
        } else {
            throw new Error('Failed to fetch data');
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
                    <Button onClick={() => setIsModalOpen(true)} disabled={!!id||!!patient}>选择已有患者</Button>
                    <Button href='/addPatient' disabled={!!id||!!patient}>新增患者</Button>
                    <Button onClick={inportRecipe} disabled={!patient}>导入上个处方</Button>
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