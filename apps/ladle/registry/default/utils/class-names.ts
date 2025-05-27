export function cn(...args: any[]) {
    const classes = [];
    for (const arg of args) {
      if (typeof arg === 'string' && arg) {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        const nested = cn(...arg);
        if (nested) {
          classes.push(nested);
        }
      } else if (typeof arg === 'object' && arg !== null) {
        for (const key in arg) {
          if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }