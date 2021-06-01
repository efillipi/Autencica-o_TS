import User from '@modules/users/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'id_role' }],
    inverseJoinColumns: [{ name: 'id_user' }],
  })
  users: User[];
}

export default Role;
