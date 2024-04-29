import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()

export default class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255 })
    email!: string;

    @Column({ type: "int" })
    age!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    weight!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    height!: number;

    @Column({ type: "enum", enum: ["male", "female", "other"] })
    gender!: string;
}
