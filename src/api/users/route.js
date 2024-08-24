import { query } from "../../../../lib/db";

export async function GET(request) {

  // let name= 'zdl'
    const users =await query({
        // query: "SELECT * FROM patient WHERE name='zdl' AND remark='qqq'",
        // query: "SELECT * FROM patient WHERE name='?'",
        query: "SELECT * FROM patient",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
console.log('request',request)
    try {
        const { data } = request.json();
        console.log('data=======',data)
        const {name} = data
        const updateUsers =await query({
            query: `INSERT INTO patient(id,name) VALUES(?,?)`,
            values: ["10000006", name],
        });
        const result = updateUsers.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const user = {
          name: data.name,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: user
        }));
    } catch (error) {
      console.log('error',error)
        return new Response(JSON.stringify({
            status: 500,
            data: request
        }));
    }
}

export async function PUT(request) {

    try {
        const { id, visitor_name } = await request.json();
        const updateProducts = await query({
            query: "UPDATE patient SET visitor_name = ? WHERE id = ?",
            values: [visitor_name, id],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: id,
            visitor_name: visitor_name,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }

}


export async function DELETE(request) {

    try {
        const { id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM patient WHERE id = ?",
            values: [id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: id,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }

}