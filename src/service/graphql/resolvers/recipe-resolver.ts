import { Arg, FieldResolver, Int, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { Recipe } from "../models/recipe";
import { RecipeInput } from "../inputs/recipe-input";

@Resolver(Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
    private readonly items: Recipe[] = createRecipeSamples();

    @Query(returns => Recipe, { nullable: true })
    async recipe(@Arg("title") title: string): Promise<Recipe | undefined> {
        return await this.items.find(recipe => recipe.title === title);
    }

    @Query(returns => [Recipe], { description: "Get all the recipes from around the world " })
    async recipes(): Promise<Recipe[]> {
        return await this.items;
    }

    @Mutation(returns => Recipe)
    async addRecipe(@Arg("recipe") recipeInput: RecipeInput): Promise<Recipe> {
        const recipe = new Recipe(
            recipeInput.title,
            recipeInput.description,
            [],
            new Date(),
        );
        await this.items.push(recipe);
        return recipe;
    }

    @FieldResolver()
    ratingsCount(
        @Root() recipe: Recipe,
        @Arg("minRate", type => Int, { defaultValue: 0.0 }) minRate: number,
    ): number {
        return recipe.ratings.filter(rating => rating >= minRate).length;
    }
}

function createRecipeSamples() {
    return [
        new Recipe(
            "Recipe 1",
            "Desc 1",
            [0, 3, 1],
            new Date("2018-04-11"),
        ),
        new Recipe(
            "Recipe 2",
            "Desc 2",
            [4, 2, 3, 1],
            new Date("2018-04-15"),
        ),
        new Recipe(
            "Recipe 3",
            "Desc 3",
            [5, 4],
            new Date(),
        )
    ];
}
