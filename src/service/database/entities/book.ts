import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Author } from "./author";

@Entity()
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public pageCount!: number;

    @ManyToOne(type => Author, author => author.books, {
        cascade: true
    })
    public author!: Author;
}
