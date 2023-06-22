const Handlebars = require("handlebars");

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  time_ago: (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} year${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? "" : "s"} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? "" : "s"} ago`;
    }
    return `${Math.floor(seconds)} second${
      Math.floor(seconds) === 1 ? "" : "s"
    } ago`;
  },

  eq: (option1, option2) => {
    return option1 == option2;
  },
};
