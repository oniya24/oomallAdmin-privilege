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
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/adminManage/Admin';
import pagination from '@/utils/pagination';
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const AdminManage = ({
  // 数据
  adminList,
  adminInfo,
  adminRoleList,
  allRoleList,
  adminTotal,
  adminPage,
  adminPageSize,
  // 方法
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  approveAdminById,
  forbidAdminById,
  releaseAdminById,
  savePagination,
  getAllRoleByDid,
  getRoleByDid,
  cancelRoleFromAdmin,
  addRoleFromAdmin,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [drawerAdminVisible, setDrawerAdminVisible] = useState(false);
  const [modalRoleVisible, setModalRoleVisible] = useState(false);
  const [modalAdminVisible, setModalAdminVisible] = useState(false);
  const [newRoleId, setNewRoleId] = useState(-1);
  const [form] = Form.useForm();
  const openAdminDrawer = async record => {
    const { id } = record;
    await getAdminById({
      did: depart_id,
      id,
    });
    setDrawerAdminVisible(true);
  };
  const closeAdminDrawer = () => {
    setDrawerAdminVisible(false);
  };
  const openAdminModal = async ({ id }) => {
    await getAdminById({ did: depart_id, id: id }); // 获取admin信息
    setModalAdminVisible(true);
  };
  const closeAdminModal = () => {
    setModalAdminVisible(false);
    // form.resetFields(["name","avatar","mobile","email"])
  };
  const submitAdminForm = () => {
    form
      .validateFields(['id', 'name', 'avatar', 'mobile', 'email'])
      .then(val => {
        updateAdminById({
          ...val,
          did: depart_id,
        });
      });
    setModalAdminVisible(false);
  };
  const deleteAdmin = ({ id }) => {
    deleteAdminById({ did: depart_id, id });
  };
  const openRoleModal = async ({ id }) => {
    await getAdminById({ did: depart_id, id: id }); // 获取admin信息
    await getRoleByDid({ did: depart_id, id: id }); // 获取角色信息
    await getAllRoleByDid(depart_id); // 获取当前did下所有的角色
    setModalRoleVisible(true);
  };
  const closeRoleModal = () => {
    setModalRoleVisible(false);
  };
  const deleteRole = async roleid => {
    await cancelRoleFromAdmin({ did: depart_id, userid: adminInfo.id, roleid }); // 删除角色
    await getRoleByDid({ did: depart_id, id: adminInfo.id }); // 重新拉取
  };
  const addRole = async roleid => {
    await addRoleFromAdmin({ did: depart_id, userid: adminInfo.id, roleid }); // 新增角色
    await getRoleByDid({ did: depart_id, id: adminInfo.id }); // 重新拉取
  };
  const columns = useMemo(() => {
    return [
      {
        title: '所在部门id',
        dataIndex: 'depart_id',
        key: 'depart_id',
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
        title: '用户角色',
        key: 'role',
        dataIndex: 'role',
        render: (text, record) => {
          return (
            <Button type="primary" onClick={() => openRoleModal(record)}>
              编辑角色信息
            </Button>
          );
        },
      },
      {
        title: '用户信息',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="default" onClick={() => openAdminDrawer(record)}>
                查看详情
              </Button>
              <Button type="primary" onClick={() => openAdminModal(record)}>
                修改信息
              </Button>
              <Button type="danger" onClick={() => deleteAdmin(record)}>
                删除用户
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // 拉取最新的adminList
    getAllAdmin({
      did: depart_id,
      userName,
      mobile,
      page: adminPage,
      pagesize: adminPageSize,
    });
  }, [adminPage, adminPageSize]);
  useEffect(() => {
    form.setFieldsValue(adminInfo); // 需要保证getAdminById获取到数据
  }, [adminInfo]);
  return (
    <Card>
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        pagination={pagination(adminTotal, savePagination)}
        columns={columns}
        dataSource={adminList}
      ></Table>
      <Modal
        visible={modalAdminVisible}
        destroyOnClose
        width={'50vw'}
        onCancel={closeAdminModal}
        onOk={submitAdminForm}
      >
        {/* 这里有修改信息，修改角色的接口， 禁止和释放的接口 */}
        <Card title="基本信息">
          <Form {...layout} preserve={false} form={form} name="nest-messages">
            <Form.Item name={'id'} label="id">
              <Input disabled />
            </Form.Item>
            <Form.Item name={'name'} label="Name">
              <Input />
            </Form.Item>
            <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'mobile'} label="mobile">
              <Input />
            </Form.Item>
            <Form.Item name="status" label="status">
              <Space>
                <Button
                  type="danger"
                  size="small"
                  onClick={() =>
                    releaseAdminById({ did: depart_id, id: adminInfo.id })
                  }
                >
                  释放用户
                </Button>
                <Button
                  type="danger"
                  size="small"
                  onClick={() =>
                    forbidAdminById({ did: depart_id, id: adminInfo.id })
                  }
                >
                  封禁用户
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
      <Modal visible={modalRoleVisible} onCancel={closeRoleModal} footer={[]}>
        <Card title="用户角色">
          {adminRoleList.map((item, index) => {
            return (
              <div key={'role' + index}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <span>id: {item.id}</span>
                  <span>role.id: {item.role.id}</span>
                  <span>role.name: {item.role.name}</span>
                  <span>create.id: {item.creator.id}</span>
                  <Button
                    size="small"
                    type="danger"
                    onClick={() => deleteRole(item.role.id)}
                  >
                    删除当前角色
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
              size="small"
              style={{ width: 200, marginRight: 10 }}
              onChange={val => {
                setNewRoleId(val);
              }}
              placeholder="Select a role"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {allRoleList.map(item => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
            <Button
              type="primary"
              size="small"
              onClick={() => addRole(newRoleId)}
            >
              新增角色
            </Button>
          </div>
        </Card>
      </Modal>
      <Drawer
        visible={drawerAdminVisible}
        onClose={() => setDrawerAdminVisible(false)}
      >
        <Descriptions colon={true} column={1}>
          {Object.keys(adminInfo).map(key => {
            return (
              <Descriptions.Item label={key} key={key}>
                {adminInfo[key]}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Drawer>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminManage);
