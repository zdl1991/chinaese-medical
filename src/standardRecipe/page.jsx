"use client";
import { useState } from 'react';
// import type { FormProps } from 'antd';
import styles from "../page.module.css";
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
export default function Home() {


  const columns = [
    {
      title: '标准方剂',
      dataIndex: 'name',
    },
    // {
    //   title: '篇章',
    //   dataIndex: 'chapter',
    //   hideInTable: true,
    //   filters: true,
    //   onFilter: true,
    //   ellipsis: true,
    //   valueType: 'select',
    //   valueEnum: {
    //     open: {
    //       text: '太阳篇',
    //       status: '1',
    //     },
    //     closed: {
    //       text: '太阴篇',
    //       status: '2',
    //     },
    //   }
    // },
    {
      title: '方剂描述',
      dataIndex: 'describe',
      hideInSearch: true,
      minWidth: '200px',
      copyable: true,
      ellipsis: true,
      tooltip: '内容过长会自动收缩',
    },
    // {
    //   title: '篇章',
    //   dataIndex: 'chapter',
    //   hideInSearch: true,
    // },
    {
      title: '注解',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'showTime',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'age',
      hideInSearch: true,
      render: () => (<div>
        <Button type='link' href='/standardRecipeDetail'>详情</Button>
        <Button type='link'>编辑</Button>
        <Button type='link'>删除</Button>
      </div>)
    },
  ];
  const [params, setParams] = useState({ current: 1, pageSize: 20 });

  const fetchData = async (params) => {
    const { current, pageSize, sorter } = params;
    const response = await fetch(`/api/standards?current=${current}&pageSize=${pageSize}&sorter=${sorter}`);
    const data = await response.json();
    return {
      data: data,
      total: data.length,
      success: true,
    };
  };
  
  return (<main>
    <div className={styles.title}>标准方剂列表</div>
    <div className={styles.line}></div>
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
          href='/addStandardRecipe'
          type="primary"
        >
          新建
        </Button>
      ]}
    />

  </main>
  );
}