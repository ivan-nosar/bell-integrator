import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Book } from "./book";

@ObjectType()
@Entity()
export class Author extends BaseEntity {

    @Field(type => ID, { name: "authorId" })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column()
    public name: string;

    @Field(type => [Book])
    @OneToMany(type => Book, book => book.author, { cascade: true })
    public books: Book[];
}
