import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
export const useAlerts = defineStore('alerts', {
    state: () => {
        return {
            alerts: [],
        };
    },
    actions: {
        alert(message, options) {
            const id = nanoid();
            const defaults = {
                type: 'info',
                dismissible: true,
                timeout: 5000,
            };
            this.alerts.push({ id, ...defaults, message, ...options });
            let timeout = options.timeout === undefined ? defaults.timeout : options.timeout;
            if (timeout) {
                setTimeout(() => this.dismiss(id), timeout);
            }
        },
        dismiss(idOrAlert) {
            const id = typeof idOrAlert === 'string' ? idOrAlert : idOrAlert.id;
            this.alerts = this.alerts.filter((alert) => alert.id !== id);
        },
        success(message, options = {}) {
            this.alert(message, { ...options, type: 'success' });
        },
        error(message, options = {}) {
            this.alert(message, { ...options, type: 'error' });
        },
        info(message, options = {}) {
            this.alert(message, { ...options, type: 'info' });
        },
        warning(message, options = {}) {
            this.alert(message, { ...options, type: 'warning' });
        },
    },
});
