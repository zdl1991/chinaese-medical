"use client";
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';


export default function Home() {

  const columns = [
    {
      title: '患者名称',
      dataIndex: 'patient_name',
      ellipsis: true,
    },
    {
        title: '开方时间',
        dataIndex: 'create_time',
        key: 'showTime',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
      },
      {
        title: '开方时间',
        dataIndex: 'create_time',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
          transform: (value:any) => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
        },
      },
    {
      title: '主诉',
      dataIndex: 'narrative',
      hideInSearch: true,
      minWidth: '200px'
    },
    {
      title: '诊断',
      dataIndex: 'diagnosis',
      hideInSearch: true,
    },
    {
      title: '处方',
      dataIndex: 'recipe',
      hideInSearch: true,
    },
    {
      title: '贴数（贴）',
      dataIndex: 'num',
      hideInSearch: true,
    },
    
    {
      title: '操作',
      hideInSearch: true,
      render: () => (<div>
        <Button type='link' href='/recipeDetail'>详情</Button>
        <Button type='link' href='/addRecipe'>编辑</Button>
        <Button type='link'>删除</Button>
      </div>)
    },
  ];
  const [params, setParams] = useState({ current: 1, pageSize: 20 });


  const fetchData = async (params: any) => {
    const { current, pageSize, sorter } = params;
    const response = await fetch(`/api/recipes?current=${current}&pageSize=${pageSize}&sorter=${sorter}`);
    const data = await response.json();
    return {
      data: data,
      total: data.length,
      success: true,
    };
  };
  return (<main>

    <ProTable
      request={fetchData}
      params={params}
      //onParamsChange={setParams}
      columns={columns}
      search={{
        labelWidth: 'auto',
      }}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          href='/addRecipe'
          type="primary"
        >
          新建
        </Button>
      ]}
    />

  </main>
  );
}