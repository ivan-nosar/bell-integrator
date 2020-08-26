import { Field, InputType, ID, Int } from "type-graphql";
import { Book } from "../../entities/book";

@InputType()
export class BookInput implements Partial<Book> {
    @Field()
    name: string;

    @Field(type => Int)
    pageCount: number;

    @Field(type => ID)
    authorId: number;
}
