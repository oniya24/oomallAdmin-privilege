import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'umi';
import {
  Card,
  Divider,
  Descriptions,
  Table,
  Space,
  Button,
  Modal,
  DatePicker,
  Form,
  Select,
} from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/personal/SelfProxy';

const Proxy = ({
  selfProxies,
  adminList,
  getAllProxyById,
  createProxyById,
  getAllAdmin,
  deleteProxyById,
  forbidProxyById,
}) => {
  const { depart_id, id } = JSON.parse(sessionStorage.getItem('adminInfo'));
  const [selfModalVisible, setSelfModalVisible] = useState(false);
  const [selfProxyId, setSelfProxyId] = useState(-1);
  const [form1] = Form.useForm();
  const createSelfProxy = () => {
    form1.validateFields(['id', 'beginDate', 'endDate']).then(async val => {
      const { beginDate, endDate } = val;
      await createProxyById({
        ...val,
        beginDate: beginDate.format('yyyy-MM-DD HH:mm:ss'),
        endDate: endDate.format('yyyy-MM-DD HH:mm:ss'),
      });
      await getAllProxyById({ did: depart_id, aId: id });
    });
    setSelfModalVisible(false);
  };
  const deleteProxy = async ({ id: proxyId }) => {
    await deleteProxyById({ did: depart_id, id: proxyId });
    await getAllProxyById({ did: depart_id, id });
  };
  const forbidProxy = async ({ id: proxyId }) => {
    await forbidProxyById({ did: depart_id, id: proxyId });
    await getAllProxyById({ did: depart_id, id });
  };
  useEffect(() => {
    getAllProxyById({ did: depart_id, id });
  }, []);
  const columns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'UserAId',
        dataIndex: 'userAId',
        key: 'userAId',
      },
      {
        title: 'UserBId',
        dataIndex: 'userBId',
        key: 'userBId',
      },
      {
        title: '开始时间',
        key: 'beginDate',
        dataIndex: 'beginDate',
      },
      {
        title: '结束时间',
        key: 'endDate',
        dataIndex: 'endDate',
      },
      {
        title: '创建时间',
        key: 'gmtCreate',
        dataIndex: 'gmtCreate',
      },
      {
        title: '是否生效',
        key: 'valid',
        dataIndex: 'valid',
        render: text => {
          return text === 1 ? '生效' : '未生效';
        },
      },
      {
        title: '部门',
        key: 'departId',
        dataIndex: 'departId',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="danger" onClick={() => deleteProxy(record)}>
                删除代理关系
              </Button>
              <Button type="danger" onClick={() => forbidProxy(record)}>
                禁止代理关系
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <div>
        <Button
          style={{ margin: 10 }}
          type="primary"
          onClick={() => setSelfModalVisible(true)}
        >
          新建自身代理
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={selfProxies}
      ></Table>
      <Modal
        destroyOnClose={true}
        visible={selfModalVisible}
        cancelText={'取消'}
        onCancel={() => setSelfModalVisible(false)}
        okText={'修改'}
        onOk={() => createSelfProxy()}
      >
        <Form form={form1} preserve={false}>
          <Form.Item label="代理者" name={'id'}>
            <Select
              showSearch
              allowClear
              style={{ width: 200, marginRight: 10 }}
              onChange={val => {
                setSelfProxyId(val);
              }}
              placeholder="Select a admin"
            >
              {adminList.map(item => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.userName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="开始时间" name="beginDate">
            <DatePicker showTime></DatePicker>
          </Form.Item>
          <Form.Item label="结束时间" name="endDate">
            <DatePicker showTime></DatePicker>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Proxy);
