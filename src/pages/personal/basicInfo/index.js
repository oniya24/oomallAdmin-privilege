import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Modal, Input, Space } from 'antd';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/personal/User';
import { useTimeout } from 'ahooks';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
let countDownTime = 60;
const BasicInfo = ({ sendAuthCode, updatePassword, updateUser, getUser }) => {
  const userInfo = JSON.parse(sessionStorage.getItem('adminInfo'));
  const { depart_id, userName, email } = userInfo || {};
  const [isResetPassword, setResetPassword] = useState(false);
  const [isResetButtonDisable, setIsResetButtonDisable] = useState(false);
  const [resendTime, setResendTime] = useState(countDownTime);
  const [userInfoForm] = Form.useForm();
  const [form] = Form.useForm();

  const onFinish = val => {
    const { avator, name, mobile, email } = val;
    updateUser({
      avator,
      name,
      mobile,
      email,
    });
  };
  const handleResetPassword = () => {
    setResetPassword(true);
  };
  const resendCountDown = () => {
    if (countDownTime === 0) {
      countDownTime = 60;
    } else {
      countDownTime = countDownTime - 1;
      setResendTime(countDownTime);
      setTimeout(() => {
        resendCountDown();
      }, 1000);
    }
  };
  const handleReqAuth = () => {
    sendAuthCode({ userName, email });
    setIsResetButtonDisable(true);
    resendCountDown();
    setTimeout(() => {
      setIsResetButtonDisable(false);
    }, 60000);
  };
  const handleSubmitReset = () => {
    form
      .validateFields(['captcha', 'newPassword'])
      .then(async val => {
        await updatePassword(val);
        setResetPassword(false);
      })
      .catch(err => {
        console.log('error');
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Card>
      <Form
        {...layout}
        initialValues={userInfo}
        name="nest-messages"
        onFinish={onFinish}
        form={userInfoForm}
      >
        <Form.Item name={'name'} label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="password" name="password">
          <Button onClick={handleResetPassword}>重置密码</Button>
        </Form.Item>
        <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'mobile'} label="mobile">
          <Input />
        </Form.Item>
        <Form.Item name={'lastLoginTime'} label="lastLoginTime">
          <Input prefix="beijing" suffix="GMT" disabled />
        </Form.Item>
        <Form.Item name={'lastLoginIp'} label="lastLoginIp">
          <Input prefix="ip" suffix="dns" disabled />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            提交修改
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={isResetPassword}
        onCancel={() => setResetPassword(false)}
        onOk={handleSubmitReset}
      >
        <Form preserve={false} form={form}>
          <Form.Item label="输入验证码" name="captcha" required>
            <Space>
              <Input></Input>
              <Button
                type="primary"
                size="small"
                disabled={isResetButtonDisable}
                onClick={handleReqAuth}
              >
                {isResetButtonDisable
                  ? `请${resendTime}s秒后重新发送`
                  : '发送验证码'}
              </Button>
            </Space>
          </Form.Item>
          <Form.Item
            label="输入新密码"
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your password!' },
              // { : 6, message: "长度需要为六位" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  '密码格式不正确，密码长度最小8位,请包含大小写字母数字及特殊符号',
              }, // 正则表达式
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
