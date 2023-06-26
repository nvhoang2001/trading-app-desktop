import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    Relation,
    JoinColumn,
} from "typeorm";
import { Key } from "./Key";
import { Transaction } from "./Transaction";
import { Config } from "./Config";
import { Balance } from "./Balance";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 100,
    })
    username: string;

    @Column({
        type: "varchar",
        length: 200,
    })
    avatar: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    password: string;

    @OneToMany(() => Key, (key) => key.user)
    keys: Key[];

    @OneToMany(() => Transaction, (key) => key.user)
    transactions: Transaction[];

    @OneToMany(() => Balance, (balance) => balance.user)
    balances: Balance[];

    @OneToOne(() => Config, (config) => config.user)
    @JoinColumn()
    config: Relation<Config>;
}
