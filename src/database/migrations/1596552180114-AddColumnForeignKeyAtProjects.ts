import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddColumnForeignKeyAtProjects1596552180114
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'userCreator_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'Projects',
      new TableForeignKey({
        name: 'userCreator',
        columnNames: ['userCreator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Projects', 'userCreator_id');
    await queryRunner.dropColumn('Projects', 'userCreator_id');
  }
}
