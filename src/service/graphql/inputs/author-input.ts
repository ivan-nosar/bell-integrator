import { Field, InputType } from "type-graphql";
import { Author } from "../../entities/author";

@InputType()
export class AuthorInput implements Partial<Author> {
    @Field()
    name: string;
}
