import { MigrationInterface, QueryRunner } from "typeorm";

export class creatingConectionFix1675177156884 implements MigrationInterface {
    name = 'creatingConectionFix1675177156884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_99e921caf21faa2aab020476e44"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "name" character varying(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_99e921caf21faa2aab020476e44" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_99e921caf21faa2aab020476e44"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "name" character varying(80) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_99e921caf21faa2aab020476e44" UNIQUE ("name")`);
    }

}
