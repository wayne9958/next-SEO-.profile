import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

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
export async function POST(request, { params }) {
    const { id } = await params;
    
    try {
        const body = await request.json();
        
        // 1. 定義允許被修改的「白名單」欄位
        const allowedFields = ["email", "phone", "address", "linkedin"];

        // 2. 只取出白名單內存在的資料，過濾掉多餘的欄位
        const filteredBody = {};
        allowedFields.forEach(field => {
            if (body[field] !== undefined) {
                filteredBody[field] = body[field];
            }
        });

        // 3. 檢查過濾後是否還有資料可以更新
        if (Object.keys(filteredBody).length === 0) {
            return NextResponse.json({ error: "沒有提供有效的欄位進行更新" }, { status: 400 });
        }

        await client.connect();
        const collection = client.db("next").collection("main");

        // 4. 執行更新
        // 因為使用了 $set，且我們已經過濾了欄位，所以它只會改動這四個欄位
        const result = await collection.updateOne(
            { _id: id },
            { $set: filteredBody }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "找不到該用戶" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "資料更新成功！", 
            updatedFields: filteredBody 
        });

    } catch (error) {
        return NextResponse.json({ error: "更新失敗", details: error.message }, { status: 500 });
    }
}