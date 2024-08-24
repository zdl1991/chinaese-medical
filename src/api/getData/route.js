import { NextResponse } from 'next/server';
// import mysql from'mysql';
const mysql = require('mysql2/promise')
console.log('mysql',mysql)
// const pool = mysql.createPoll({
//     connectionLimit: 10,
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'zdl1205.',
//     database: 'cm'
// })

export async function GET(request) {
    try {
        // 从连接池中获取连接
        const connection = await pool.getConnection()
        // 执行 MySQL 查询
        const [rows, fields] = await connection.query('SELECT * FRoM patient')
        // 释放连接回连接池
        connection.release()
        return NextResponse.json({ data: rows }, { status: 200 })
    }catch (error) {
        // console.error('Error:", error)
        return NextResponse.json({ error: 'Internal Server Error'}, { status: 500 })
    }
}
// const connection = mysql.createConnection({
//         host: '数据库主机名',
//         port: '数据库端口号',
//         user: '用户名',
//         password: '密码',
//         database: '数据库名称'
//     });