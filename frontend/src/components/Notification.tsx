import { notification } from 'antd';

interface NotificationProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  duration?: number;
}

const openNotification = ({
  type,
  message,
  description,
  duration = 4.5,
}: NotificationProps) => {
  notification[type]({
    message,
    description,
    duration,
  });
};

export default openNotification;
