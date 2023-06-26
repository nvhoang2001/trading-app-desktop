import {
    Entity,
    // OneToOne,
    PrimaryGeneratedColumn,
    Column,
    // Relation,
} from "typeorm";
// import { Transaction } from "./Transaction";
// import { Balance } from "./Balance";

@Entity()
export class Coin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 10,
    })
    symbol: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    platform: string;

    // @OneToOne(() => Transaction, (transaction) => transaction.coin)
    // transaction: Relation<Transaction>;

    // @OneToOne(() => Balance, (balance) => balance.coin)
    // balance: Relation<Balance>;
}
