import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { connect } from 'umi';
import {
  Card,
  Form,
  Input,
  Select,
  Table,
  Space,
  Button,
  Modal,
  Transfer,
  DatePicker,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/ProxyManage';
import pagination from '@/utils/pagination';
const { Option } = Select;

const Proxy = ({
  proxyList,
  adminList,
  proxyTotal,
  proxyPage,
  proxyPageSize,
  savePagination,
  getAllProxy,
  getAllAdmin,
  forbidProxyById,
  deleteProxyById,
  createProxyById,
  createProxyByA2BId,
}) => {
  console.log(adminList);
  // const [ form1 ] = Form.useForm();
  const [form2] = Form.useForm();
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [relaModalVisible, setRelaModalVisible] = useState(false);
  const [proxyAId, setProxyAId] = useState(null);
  const [proxyBId, setProxyBId] = useState(-1);
  const deleteProxy = async ({ id }) => {
    await deleteProxyById({ did: depart_id, id });
    await getAllProxy({
      did: depart_id,
      page: proxyPage,
      pageSize: proxyPageSize,
    });
  };
  const forbidProxy = async ({ id }) => {
    await forbidProxyById({ did: depart_id, id });
    await getAllProxy({
      did: depart_id,
      page: proxyPage,
      pageSize: proxyPageSize,
    });
  };
  const createA2BProxy = () => {
    form2
      .validateFields(['aid', 'bid', 'beginDate', 'endDate'])
      .then(async val => {
        const { beginDate, endDate } = val;
        await createProxyByA2BId({
          ...val,
          beginDate: beginDate.format('yyyy-MM-DD HH:mm:ss'),
          endDate: endDate.format('yyyy-MM-DD HH:mm:ss'),
        });
        await getAllProxy({
          did: depart_id,
          page: proxyPage,
          pageSize: proxyPageSize,
        });
      });
    setRelaModalVisible(false);
  };
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
                解除代理关系
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
  useEffect(() => {
    getAllAdmin({
      did: depart_id,
      userName,
      mobile,
    });
  }, []);
  useEffect(() => {
    getAllProxy({
      did: depart_id,
      page: proxyPage,
      pageSize: proxyPageSize,
    });
  }, [proxyPage, proxyPageSize]);
  return (
    <Card>
      <div>
        {/* <Button style={{margin: 10}} type="primary" 
          onClick={() => setSelfModalVisible(true)}>新建自身代理</Button> */}
        <Button
          style={{ margin: 10 }}
          type="primary"
          onClick={() => setRelaModalVisible(true)}
        >
          新建代理关系
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        pagination={pagination(proxyTotal, savePagination)}
        columns={columns}
        dataSource={proxyList}
      ></Table>
      <Modal
        destroyOnClose
        visible={relaModalVisible}
        cancelText={'取消'}
        onCancel={() => setRelaModalVisible(false)}
        okText={'修改'}
        onOk={createA2BProxy}
      >
        <Form form={form2} preserve={false}>
          <Form.Item label="被代理者" name={'aid'}>
            <Select
              showSearch
              allowClear
              style={{ width: 200, marginRight: 10 }}
              onChange={val => {
                setProxyAId(val);
              }}
              placeholder="Select a admin"
            >
              {adminList.map(item => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.userName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="代理者" name={'bid'}>
            <Select
              showSearch
              allowClear
              style={{ width: 200, marginRight: 10 }}
              onChange={val => {
                setProxyBId(val);
              }}
              placeholder="Select a admin"
            >
              {adminList.map(item => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.userName}
                  </Option>
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
