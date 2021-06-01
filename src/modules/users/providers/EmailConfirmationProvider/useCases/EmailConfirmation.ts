import IEmailConfirmationProvider from '@modules/users//providers/EmailConfirmationProvider/models/IEmailConfirmationProvider';
import IEmailConfirmationDTO from '@modules/users/providers/EmailConfirmationProvider/dtos/IEmailConfirmationDTO';
import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import templateEmailConfig from '@config/templateEmail';
import { injectable, inject } from 'tsyringe';

@injectable()
class EmailConfirmation implements IEmailConfirmationProvider {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({
    email,
    id_user,
    name,
  }: IEmailConfirmationDTO): Promise<void> {
    const { token } = await this.userTokenRepository.generate(id_user);

    await this.mailProvider.sendMail({
      to: {
        email,
        name,
      },
      subject: '[Projetoer] - Confirmação de email ',
      templateData: {
        file: templateEmailConfig.emailConfirmation,
        variables: {
          name,
          token,
          link: `${process.env.APP_WEB_URL}/sessao/confirmacao-email?token=${token}`,
        },
      },
    });
  }
}

export default EmailConfirmation;
