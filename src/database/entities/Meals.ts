import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Meals extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    calories!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    quantity!: number;
}
