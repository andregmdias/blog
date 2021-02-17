import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddFKUserIdOnPosts1609266059797
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Posts',
      new TableColumn({
        name: 'userId',
        type: 'bigserial',
      }),
    );

    await queryRunner.createForeignKey(
      'Posts',
      new TableForeignKey({
        name: 'UsersPost',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Posts', 'UsersPost');
    await queryRunner.dropColumn('Posts', 'userId');
  }
}
