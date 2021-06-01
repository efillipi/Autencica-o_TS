import IEmailConfirmationDTO from '@modules/users/providers/EmailConfirmationProvider/dtos/IEmailConfirmationDTO';

export default interface IEmailConfirmation {
  execute(data: IEmailConfirmationDTO): Promise<void>;
}
