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
  Drawer,
  Descriptions,
  Divider,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/RoleManage';
import pagination from '@/utils/pagination';
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const RoleManage = ({
  // 数据
  priList,
  roleList,
  rolePriList,
  roleTotal,
  rolePage,
  rolePageSize,
  // 方法
  getRoleByDid,
  deleteRoleByDid,
  postRoleByDid,
  putRoleByDid,
  getAllPrivilege,
  getPriFromRole,
  addPriToRoleById,
  cancelPriFromRoleById,
  savePagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [priModalVisible, setPriModalVisible] = useState(false);
  const [curRoleInfo, setCurRoleInfo] = useState({});
  const [newPriId, setNewPriId] = useState(-1);
  const [roleStatus, setRoleStatus] = useState(0); // 0 提交 1 修改
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const openPriModal = record => {
    const { id } = record;
    setCurRoleInfo(record);
    setPriModalVisible(true);
    getPriFromRole(id);
  };
  const openCreateRoleModal = () => {
    setRoleModalVisible(true);
    setRoleStatus(0);
  };
  const openUpdateRoleModal = record => {
    setRoleModalVisible(true);
    setRoleStatus(1);
    form1.setFieldsValue(record);
  };
  const submitCreateRole = () => {
    form1.validateFields(['name', 'desc']).then(async val => {
      const { desc, name } = val;
      await postRoleByDid({ did: depart_id, descr: desc, name });
      await getRoleByDid({ did: depart_id });
      setRoleModalVisible(false);
    });
  };
  const submitUpdateRole = () => {
    form1.validateFields(['id', 'name', 'desc']).then(async val => {
      const { id, desc, name } = val;
      await putRoleByDid({ did: depart_id, id, descr: desc, name });
      await getRoleByDid({ did: depart_id });
      setRoleModalVisible(false);
    });
  };
  const deleteRole = async ({ id }) => {
    await deleteRoleByDid({ did: depart_id, id });
    await getRoleByDid({ did: depart_id });
  };
  const cancelPriFromRole = async ({ id: priId }) => {
    const { id } = curRoleInfo;
    await cancelPriFromRoleById({ did: depart_id, id: priId });
    await getPriFromRole(id);
  };
  const addPriToRole = async () => {
    const { id } = curRoleInfo;
    await addPriToRoleById({
      did: depart_id,
      roleid: id,
      privilegeid: newPriId,
    });
    await getPriFromRole(id);
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '角色描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '被谁创建',
        dataIndex: 'createdBy',
        key: 'createdBy',
      },
      {
        title: '部门Id',
        dataIndex: 'departId',
        key: 'departId',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
      },
      {
        title: '权利信息',
        key: 'privilege',
        dataIndex: 'privilege',
        render: (text, record) => {
          return (
            <Button type="primary" onClick={() => openPriModal(record)}>
              编辑权利信息
            </Button>
          );
        },
      },
      {
        title: '角色信息',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => openUpdateRoleModal(record)}
              >
                修改角色
              </Button>
              <Button type="danger" onClick={() => deleteRole(record)}>
                删除角色
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllPrivilege();
  }, []);
  useEffect(() => {
    getRoleByDid({
      did: depart_id,
      page: rolePage,
      pageSize: rolePageSize,
    });
  }, [rolePage, rolePageSize]);
  return (
    <Card>
      <div>
        <Button
          style={{ margin: 10 }}
          type="primary"
          onClick={openCreateRoleModal}
        >
          新建角色
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        pagination={pagination(roleTotal, savePagination)}
        columns={columns}
        dataSource={roleList}
      ></Table>
      <Modal
        visible={roleModalVisible}
        destroyOnClose
        onOk={() => {
          roleStatus === 0 ? submitCreateRole() : submitUpdateRole();
        }}
        onCancel={() => setRoleModalVisible(false)}
      >
        <Form form={form1} preserve={false}>
          {roleStatus === 0 ? null : (
            <Form.Item label="ID" name="id">
              <Input disabled></Input>
            </Form.Item>
          )}
          <Form.Item label="名称" name="name" required>
            <Input></Input>
          </Form.Item>
          <Form.Item label="描述" name="desc" required>
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={priModalVisible}
        destroyOnClose
        footer={[]}
        onCancel={() => setPriModalVisible(false)}
      >
        {!!rolePriList &&
          rolePriList.map((item, index) => {
            return (
              <div key={'role' + index}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <span>id: {item.id}</span>
                  <span>creator: {item.creator.username}</span>
                  <span>privilege: {item.privilege.name}</span>
                  <Button
                    size="small"
                    type="danger"
                    onClick={() => cancelPriFromRole(item)}
                  >
                    删除当前权利
                  </Button>
                </div>
                <Divider></Divider>
              </div>
            );
          })}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            showSearch
            allowClear
            style={{ width: 200, marginRight: 10 }}
            onChange={val => {
              setNewPriId(val);
            }}
            placeholder="Select a admin"
          >
            {priList.map(item => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <Button type="primary" onClick={addPriToRole}>
            增加权利
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleManage);
