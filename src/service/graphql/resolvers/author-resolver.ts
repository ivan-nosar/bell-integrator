import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Author } from "../../entities/author";
import { AuthorInput } from "../inputs/author-input";
import { Book } from "../../entities/book";

@Resolver(of => Author)
export class AuthorResolver {

    constructor(
        private readonly bookRepository = Book.getRepository(),
        private readonly authorRepository = Author.getRepository()
    ) {}

    @Query(returns => Author, { nullable: true })
    async author(@Arg("authorId", type => Int) authorId: number): Promise<Author | undefined> {
        return await this.authorRepository.findOne(authorId);
    }

    @Query(returns => [Author])
    async authors(): Promise<Author[]> {
        return this.authorRepository.find();
    }

    @Mutation(returns => Author)
    async addAuthor(@Arg("author") authorInput: AuthorInput): Promise<Author> {
        const author = this.authorRepository.create({
            ...authorInput
        });
        return await this.authorRepository.save(author);
    }

    @FieldResolver(returns => [Book])
    async books(@Root() author: Author) {
        return this.bookRepository.find({
            where: { author: { id: author.id } },
        });
    }
}
