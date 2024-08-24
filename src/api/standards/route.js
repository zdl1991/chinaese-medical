import { query } from "../../../../lib/db";

export async function GET(request) {
    const standards = await query({
        query: "SELECT * FROM standardRecipe",
        values: [],
    });

    let data = JSON.stringify(standards);
    return new Response(data, {
        status: 200,
    });
}