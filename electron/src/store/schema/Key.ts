import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Key {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 250,
    })
    publishKey: string;

    @Column({
        type: "varchar",
        length: 250,
    })
    secretKey: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    platform: string;

    @ManyToOne(() => User, (user) => user.keys)
    user: User;
}
