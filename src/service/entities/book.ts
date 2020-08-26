import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    RelationId
} from "typeorm";
import { Author } from "./author";
import { ObjectType, Field, ID, Int } from "type-graphql";

@Entity()
@ObjectType()
export class Book extends BaseEntity {

    @Field(type => ID, { name: "bookId" })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column()
    public name: string;

    @Field(type => Int)
    @Column()
    public pageCount: number;

    @Field(type => Author)
    @ManyToOne(type => Author, author => author.books)
    public author: Author;

    @Field(type => Int)
    @RelationId((book: Book) => book.author)
    public authorId: number;
}
