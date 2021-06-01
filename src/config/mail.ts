interface ITransporter {
  name: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface IMailConfig {
  driver: 'ethereal' | 'mailProvider';
  transporter: ITransporter;
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  transporter: {
    name: process.env.MAIL_NAME,
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
} as IMailConfig;
