import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUersRoles1615228803332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_roles',
        columns: [
          {
            name: 'id_role',
            type: 'int',
          },
          {
            name: 'id_user',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users_roles',
      new TableForeignKey({
        columnNames: ['id_role'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        name: 'fk_roles_id_user_role',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'users_roles',
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'fk_users_roles_id_user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_roles', 'fk_roles_id_user_role');
    await queryRunner.dropForeignKey('users_roles', 'fk_users_roles_id_user');
    await queryRunner.dropTable('users_roles');
  }
}
