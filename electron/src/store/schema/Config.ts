import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    Relation,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "double",
    })
    alertAmount: number;

    @Column({
        type: "double",
    })
    tradeTradeAmount: number;

    @Column({
        type: "double",
    })
    tradeMinProfitAmount: number;

    @Column({
        type: "double",
    })
    tradeActiveAmount: number;

    @Column({
        type: "double",
    })
    crossMinProfitAmount: number;

    @Column({
        type: "double",
    })
    crossTradeAmount: number;

    @Column({
        type: "double",
    })
    crossActiveAmount: number;

    @Column({
        type: "varchar",
        length: 20,
    })
    theme: string;

    @OneToOne(() => User, (user) => user.config)
    user: User;
}
