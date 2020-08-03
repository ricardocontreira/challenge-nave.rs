import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

export default class AddColumnForeignKeyatNavers1596461426873
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Navers',
      new TableColumn({
        name: 'userCreator_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'Navers',
      new TableForeignKey({
        name: 'userCreator',
        columnNames: ['userCreator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Navers', 'userCreator');
    await queryRunner.dropColumn('Navers', 'userCreator');
  }
}
