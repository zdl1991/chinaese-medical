"use client";
import { useState } from 'react';
import styles from '../page.module.css';
import { Button, Breadcrumb, Layout, Menu } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

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
            render: () => (<div>
                <Button type='link' href='/patientDetail'>详情</Button>
                <Button type='link' href='/addPatient'>编辑</Button>
                <Button type='link'>快速开方</Button>
            </div>)
        },
    ];

    const { Header, Content } = Layout;

    const [params, setParams] = useState({ current: 1, pageSize: 20 });

    const fetchData = async (params) => {
        const { current, pageSize, name="" } = params;
        console.log(params)
        const response = await fetch(`/api/patient?name=${name}&current=${current}&pageSize=${pageSize}`, { method: "GET" });
        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            return {
                data: data.table,
                total: data.total,
                success: true,
            };
        } else {
            throw new Error('Failed to fetch data');
        }
    };

    return (<main className={styles.main}>
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={[]}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
                    <Breadcrumb.Item>患者列表</Breadcrumb.Item>
                </Breadcrumb>
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