import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    Relation,
    ManyToOne,
} from "typeorm";
import { Coin } from "./Coin";
import { User } from "./User";

@Entity()
export class Balance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "double",
    })
    amount: number;

    @Column({
        type: "varchar",
        length: 50,
    })
    platform: string;

    @OneToOne(() => Coin)
    @JoinColumn()
    coin: Relation<Coin>;

    @ManyToOne(() => User, (user) => user.balances)
    user: User;
}
