"use client";
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { unEscapeHtml } from '../utils.jsx'

export default function Home() {
  // const [params, setParams] = useState({})

  const columns = [
    {
      title: '标准方剂',
      dataIndex: 'name',
    },
    {
      title: '方剂描述',
      dataIndex: 'standard_describe',
      hideInSearch: true,
      minWidth: '200px',
      copyable: true,
      ellipsis: true,
      tooltip: '内容过长会自动收缩',
    },
    {
      title: '注解',
      dataIndex: 'remark',
      hideInSearch: true,
      ellipsis: true,
      minWidth: '250px',
      height: '40px',
      tooltip: '内容过长会自动收缩',
      render: (e, item) => (
        <div
          style={{ height: '22px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', wordBreak: 'keep-all' }}
          dangerouslySetInnerHTML={{ __html: item.remark ? unEscapeHtml(item.remark) : '--' }}
        />)
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
      title: '操作',
      hideInSearch: true,
      render: (e, item) => (<div>
        <Button type='link' href={`/standardDetail?id=${item.id}`}>详情</Button>
        <Button type='link' href={`/addStandard?id=${item.id}`}>编辑</Button>
      </div>)
    },
  ];
  // useEffect(()=>{
  //   return () => {
  //     sessionStorage.setItem('$$standardParams', {})
  //   }
  // },[])

  const fetchData = async (params) => {
    const { current, pageSize } = params;
    let _url = `/api/standard/getList?current=${current}&pageSize=${pageSize}`
    !!params.name ? _url = `${_url}&name=${params.name}` : _url

    const response = await fetch(_url);
    if (response.ok) {
      const data = await response.json();
      return {
        data: data.table,
        total: data.total,
        success: true,
      };
    } else {
      throw new Error('Failed to fetch data');
    }
  };


  const paginationChange = (current,pageSize)=>{
    console.log('e,v',current,pageSize)
    setParams({current:curren,pageSize:pageSize})
    const _params = {current:current,pageSize:pageSize}
    sessionStorage.setItem('$$standardParams', JSON.stringify(_params))
  }

  return (
    <ProTable
      request={fetchData}
      columns={columns}
      search={{
        labelWidth: 'auto',
        showSizeChanger: false,
      }}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        //onChange: paginationChange
      }}
      rowKey={(record) => record.id}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          href='/addStandard'
          type="primary"
        >
          新建
        </Button>
      ]}
    />
  );
}