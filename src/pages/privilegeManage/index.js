import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Form, Input, Select, Table, Space, Button, Modal } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/PrivilegeManage';
import pagination from '@/utils/pagination';
const { Option } = Select;
const Privilege = ({
  priList,
  priPage,
  priPageSize,
  priTotal,
  getPriList,
  updatePriInfo,
  savePagination,
}) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(record => {
    setModalVisible(true);
    form.setFieldsValue(record);
  }, []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const submitForm = useCallback(() => {
    form.validateFields(['id', 'name', 'url', 'requestType']).then(val => {
      updatePriInfo(val);
    });
    // form.submit()
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
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" onClick={() => openModal(record)}>
                修改权限
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // 拉取最新的priList
    getPriList({
      page: priPage,
      pageSize: priPageSize,
    });
  }, [priPage, priPageSize]);
  return (
    <Card>
      Privilege 查询权限 权限更改
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        pagination={pagination(priTotal, savePagination)}
        columns={columns}
        dataSource={priList}
      ></Table>
      <Modal
        destroyOnClose={true}
        visible={modalVisible}
        closable={false}
        cancelText={'取消'}
        onCancel={closeModal}
        okText={'修改'}
        onOk={submitForm}
      >
        <Form
          form={form}
          preserve={false}
          // initialValues={modalData}
        >
          <Form.Item label="ID" name="id">
            <Input disabled></Input>
          </Form.Item>
          <Form.Item label="名称" name="name">
            <Input></Input>
          </Form.Item>
          <Form.Item label="URL" name="url">
            <Input></Input>
          </Form.Item>
          <Form.Item label="请求类型" name="requestType">
            <Select>
              <Option value={0}>get</Option>
              <Option value={1}>post</Option>
              <Option value={2}>put</Option>
              <Option value={3}>delete</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Privilege);
