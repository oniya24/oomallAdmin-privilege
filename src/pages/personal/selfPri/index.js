import React, { useEffect, useMemo } from 'react';
import { connect } from 'umi';
import { Card, Divider, Descriptions, Table, Space } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/personal/SelfPri';

const Pri = ({ selfPris, getAdminPriById }) => {
  const { depart_id, id } = JSON.parse(sessionStorage.getItem('adminInfo'));
  useEffect(() => {
    getAdminPriById({ did: depart_id, id });
  }, []);
  const columns = useMemo(() => {
    return [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Url',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '请求类型',
        dataIndex: 'requestType',
        key: 'requestType',
      },
      {
        title: '创建时间',
        key: 'gmtCreate',
        dataIndex: 'gmtCreate',
      },
      {
        title: '修改时间',
        key: 'gmtModified',
        dataIndex: 'gmtModified',
        render: (text, record) => (
          <Space size="middle">{record.gmtModified}</Space>
        ),
      },
    ];
  }, []);
  return (
    <Card>
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={selfPris}
      ></Table>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Pri);
