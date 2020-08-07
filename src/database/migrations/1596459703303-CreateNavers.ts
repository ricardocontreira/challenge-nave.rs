import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateNavers1596459703303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Navers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'birthdate',
            type: 'date',
          },
          {
            name: 'admission_date',
            type: 'date',
          },
          {
            name: 'job_role',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Navers');
  }
}
