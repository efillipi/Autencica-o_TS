import Roler from '@modules/roles/typeorm/entities/Role';

export default interface ICreateAppointmentDTO {
  name: string;
  email: string;
  password: string;
  active: boolean;
  roles?: Roler[];
}
