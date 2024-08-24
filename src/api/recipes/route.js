import { query } from "../../../../lib/db";

export async function GET(request) {
    const recipes = await query({
        query: "SELECT * FROM recipe",
        values: [],
    });

    let data = JSON.stringify(recipes);
    return new Response(data, {
        status: 200,
    });
}