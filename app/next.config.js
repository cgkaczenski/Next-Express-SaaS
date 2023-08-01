module.exports = (phase) => {
  return {
    env: {
      NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    },
  };
};
