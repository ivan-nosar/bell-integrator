import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Book } from "./book";

@Entity()
export class Author extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @OneToMany(type => Book, book => book.author)
    public books!: Book[];
}
