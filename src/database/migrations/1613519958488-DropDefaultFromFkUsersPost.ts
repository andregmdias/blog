import { MigrationInterface, QueryRunner } from 'typeorm';

export default class DropDefaultFromFkUsersPost1613519958488
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public."Posts" ALTER COLUMN "userId" DROP DEFAULT;`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
