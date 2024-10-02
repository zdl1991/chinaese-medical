    "use client";
import { useState } from 'react';
import styles from '../page.module.css';
import { Button, Layout } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
//import Top from '../top.jsx'

export default function Home() {

    const columns = [
        {
            title: '患者名称',
            dataIndex: 'name',
            ellipsis: true,
        },

        {
            title: '就诊号',
            dataIndex: 'depict',
            hideInSearch: true,
            minWidth: '200px'
        },
        {
            title: '性别',
            dataIndex: 'chapter',
            hideInSearch: true,
        },
        {
            title: '年龄',
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: '联系方式',
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'showTime',
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: '操作',
            dataIndex: 'age',
            hideInSearch: true,
            render: (parms,parm) => {
                return (<div>
                    <Button type='link' href={`/patientDetail?id=${parm.id}`}>详情</Button>
                    <Button type='link' href={`/addPatient?id=${parm.id}`}>编辑</Button>
                    <Button type='link' href={`/addRecipe?id=${parm.id}`}>快速开方</Button>
                </div>)
}
        },
    ];

    const { Content } = Layout;

    const [params, setParams] = useState({ current: 1, pageSize: 20 });

    const fetchData = async (params) => {
        const { current, pageSize, name = "" } = params;
        //console.log(params)
        const response = await fetch(`/api/patient/getList?name=${name}&current=${current}&pageSize=${pageSize}`, { method: "GET" });
        if (response.ok) {
            const data = await response.json();
            //console.log('data', data)
            return {
                data: data.table,
                total: data.total,
                success: true,
            };
        } else {
            throw new Error('Failed to fetch data');
        }
    };

    return (
        <main className={styles.main}>
            <Layout>
                
                <Content style={{ padding: '0 48px' }}>
                    <ProTable
                        request={fetchData}
                        params={params}
                        onParamsChange={setParams}
                        columns={columns}
                        search={{
                            labelWidth: 'auto',
                        }}
                        toolBarRender={() => [
                            <Button
                                key="button"
                                icon={<PlusOutlined />}
                                href='/addPatient'
                                type="primary"
                            >
                                新建
                            </Button>
                        ]}
                    />
                </Content>
            </Layout>
        </main>
    );
}