import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Book } from "../../entities/book";
import { BookInput } from "../inputs/book-input";
import { Author } from "../../entities/author";

@Resolver(of => Book)
export class BookResolver {

    constructor(
        private readonly bookRepository = Book.getRepository(),
        private readonly authorRepository = Author.getRepository()
    ) {}

    @Query(returns => Book, { nullable: true })
    async book(@Arg("bookId", type => Int) bookId: number): Promise<Book | undefined> {
        return await this.bookRepository.findOne(bookId);
    }

    @Query(returns => [Book])
    async books(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    @Mutation(returns => Book)
    async addBook(@Arg("book") bookInput: BookInput): Promise<Book> {
        const book = this.bookRepository.create({
            ...bookInput,
            author: { id: bookInput.authorId }
        });
        return await this.bookRepository.save(book);
    }

    @FieldResolver(returns => Author)
    async author(@Root() book: Book): Promise<Author> {
        const bookDatabaseRecord = await this.bookRepository.findOne(book.id);
        if (bookDatabaseRecord === undefined) {
            throw new Error(`Unable to find the book with id = ${book.id}`);
        }
        const author = await this.authorRepository.findOne(bookDatabaseRecord.authorId);
        if (author === undefined) {
            throw new Error(
                `Unable to find the author of the book with id = ${book.id} by its id: ${bookDatabaseRecord.authorId}`
            );
        }
        return author;
    }

    @FieldResolver(returns => Int)
    async authorId(@Root() book: Book) {
        return (await this.author(book)).id;
    }
}
