import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormProps {
  onSubmit: (user: User) => void;
}

const CustomForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: User, form: FormInstance) => {
    try {
      setLoading(true);
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={(values) => handleSubmit(values, form)}>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter your first name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter your last name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email address' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
