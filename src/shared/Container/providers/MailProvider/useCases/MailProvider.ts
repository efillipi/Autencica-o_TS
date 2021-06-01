import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';
import ISenMailDTO from '@shared/Container/providers/MailProvider/dtos/ISenMailDTO';
import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import MailConfig from '@config/mail';

const { host, name, port, secure, auth } = MailConfig.transporter;

@injectable()
class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      name,
      host,
      port,
      secure,
      auth,
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISenMailDTO): Promise<void> {
    try {
      await this.client.sendMail({
        from: {
          name: from?.name || 'Equipe Projetoer',
          address: from?.email || 'equipe@Projeto.tech.com',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    } catch (error) {
      throw new AppError(error, 400);
    }
  }
}

export default MailProvider;
