import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';


// MongoDB 連線字串 (建議之後放進 .env 檔案)
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request, { params }) {
    try {
        const { id } = await params; // Next.js 15 必須 await

        // 檢查是否已經連線，避免重複連線消耗時間
        await client.connect();
// 1. 修改資料庫名稱為 next
const database = client.db("next"); 

// 2. 修改集合名稱為 main
const users = database.collection("main");

// 3. 確保查詢的是 _id
const user = await users.findOne({ _id: id });

        if (!user) {
            return NextResponse.json({ message: "資料庫中找不到 ID 為 " + id + " 的資料" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        // 【重要】這行會在你的 VS Code 終端機印出到底是哪裡出錯
        console.error("MongoDB 發生錯誤:", error.message);
        
        return NextResponse.json({ 
            error: "連線失敗", 
            details: error.message 
        }, { status: 500 });
    }
    // 雲端開發建議先不要在每次 Request 都 client.close()，
    // 因為 Atlas 連線很耗時。正式專案會建議使用 Singleton 模式。
}