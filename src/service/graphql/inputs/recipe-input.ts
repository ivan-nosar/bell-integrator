import { Field, InputType } from "type-graphql";
import { Recipe } from "../models/recipe";

@InputType()
export class RecipeInput implements Partial<Recipe> {
    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;
}
