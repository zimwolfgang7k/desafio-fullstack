import { MigrationInterface, QueryRunner } from "typeorm";

export class creatingContactsTable1675175468377 implements MigrationInterface {
    name = 'creatingContactsTable1675175468377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "email" character varying(80) NOT NULL, "phone_number" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_82e70145f0669e778561f3877f2" UNIQUE ("name"), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
