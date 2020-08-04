import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnProjectatNavers1596469210342
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Navers',
      new TableColumn({
        name: 'projects',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Navers', 'projects');
  }
}
