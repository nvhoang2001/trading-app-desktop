import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    Relation,
} from "typeorm";
import { User } from "./User";
import { Coin } from "./Coin";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "integer",
    })
    status: number;

    @Column({
        type: "double",
    })
    price: number;

    @Column({
        type: "double",
    })
    amount: number;

    @Column({
        enum: ["buy", "sell"],
    })
    type: "buy" | "sell";

    @Column({ type: "integer" })
    createAt: number;

    @Column({ type: "integer" })
    updateAt: number;

    @Column({
        type: "varchar",
        length: 50,
    })
    platform: string;

    @ManyToOne(() => User, (user) => user.keys)
    user: User;

    @OneToOne(() => Coin)
    @JoinColumn()
    coin: Relation<Coin>;
}
