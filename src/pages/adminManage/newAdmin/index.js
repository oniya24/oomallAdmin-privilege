import { useMemo, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space } from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/adminManage/NewAdmin';
import pagination from '@/utils/pagination';
const newAdmin = ({ newAdminList, getAllNewAdmin, approveAdminById }) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const approveAdmin = async ({ id }) => {
    await approveAdminById({
      did: depart_id,
      id,
      approve: true,
    });
    await getAllNewAdmin(depart_id);
  };
  const disapprovalAdmin = async ({ id }) => {
    await approveAdminById({
      did: depart_id,
      id,
      approve: false,
    });
    await getAllNewAdmin(depart_id);
  };
  const columns = useMemo(() => {
    return [
      {
        title: '所在部门id',
        dataIndex: 'departId',
        key: 'departId',
        filters:
          Number(depart_id) === 0
            ? Array(9)
                .join(0)
                .split('')
                .map((item, index) => {
                  return { text: index, value: index };
                })
            : null,
        onFilter:
          Number(depart_id) === 0
            ? (value, record) => Number(record.depart_id) === value
            : null,
      },
      {
        title: '名称',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '员工id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => {
          const shortText = text.substr(0, 8);
          return <Tooltip title={text}>{shortText}</Tooltip>;
        },
      },
      {
        title: '申请时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" onClick={() => approveAdmin(record)}>
                同意认证
              </Button>
              <Button type="danger" onClick={() => disapprovalAdmin(record)}>
                拒绝认证
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllNewAdmin(depart_id);
  }, []);
  return (
    <Card>
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={newAdminList}
      ></Table>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(newAdmin);
