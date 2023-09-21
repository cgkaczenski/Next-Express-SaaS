module.exports = () => {
  return {
    env: {
      NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      BASE_URL: process.env.BASE_URL,
    },
  };
};
