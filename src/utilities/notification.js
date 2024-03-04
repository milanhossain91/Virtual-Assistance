import { notification } from "ant-design-vue";

export const showNotification = (type, message) => {
  notification[type]({
    message: message,
    duration: 1.5,
  });
};
