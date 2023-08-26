import { nanoid } from 'nanoid';
interface AlertOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  dismissible?: boolean;
  timeout?: number;
}
interface Alert extends AlertOptions {
  message: string;
  id: string;
}

export default reactive({
  alerts: [] as Alert[],

  alert(message: string, options: AlertOptions) {
    const id = nanoid();
    const defaults: Partial<Alert> = {
      type: 'info',
      dismissible: true,
      timeout: 5000,
    };
    this.alerts.push({ id, ...defaults, message, ...options });

    let timeout =
      options.timeout === undefined ? defaults.timeout : options.timeout;
    if (timeout) {
      setTimeout(() => this.dismiss(id), timeout);
    }
  },
  dismiss(idOrAlert: string | Alert) {
    const id = typeof idOrAlert === 'string' ? idOrAlert : idOrAlert.id;
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
  },
  success(message: string, options: AlertOptions = {}) {
    this.alert(message, { ...options, type: 'success' });
  },

  error(message: string, options: AlertOptions = {}) {
    this.alert(message, { ...options, type: 'error' });
  },

  info(message: string, options: AlertOptions = {}) {
    this.alert(message, { ...options, type: 'info' });
  },

  warning(message: string, options: AlertOptions = {}) {
    this.alert(message, { ...options, type: 'warning' });
  },
});

// export const useAlerts = () => {
//   let alerts = reactive<Alert[]>([]);
//   function alert(message: string, options: AlertOptions) {
//     const id = nanoid();
//     const defaults: Partial<Alert> = {
//       type: 'info',
//       dismissiable: true,
//       timeout: 50000,
//     };
//     alerts.push({ id, ...defaults, message, ...options });

//     let timeout =
//       options.timeout === undefined ? defaults.timeout : options.timeout;
//     if (timeout) {
//       setTimeout(() => dismiss(id), timeout);
//     }
//   }

//   function dismiss(idOrAlert: string | Alert) {
//     const id = typeof idOrAlert === 'string' ? idOrAlert : idOrAlert.id;
//     alerts = alerts.filter((alert) => alert.id !== id);
//   }

//   function success(message: string, options: AlertOptions = {}) {
//     alert(message, { ...options, type: 'success' });
//   }

//   function error(message: string, options: AlertOptions = {}) {
//     alert(message, { ...options, type: 'error' });
//   }

//   function info(message: string, options: AlertOptions = {}) {
//     alert(message, { ...options, type: 'info' });
//   }

//   function warning(message: string, options: AlertOptions = {}) {
//     alert(message, { ...options, type: 'warning' });
//   }

//   return {
//     success,
//     info,
//     warning,
//     error,
//     alerts,
//     dismiss,
//   };
// };
