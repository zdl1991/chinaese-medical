import { query } from "../../../../lib/db";

export async function GET(request) {
    const standard = await query({
        query: "SELECT * FROM standard",
        values: [],
    });

    let data = JSON.stringify(standard);
    return new Response(data, {
        status: 200,
    });
}