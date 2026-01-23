import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET(request, { params }) {
  try {
    const { id } = await  params;
    await client.connect();
    const users = client.db("next").collection("main");


    const userData = await users.findOne({ _id: id });

    if (!userData) {
      return NextResponse.json({ error: "找不到使用者" }, { status: 404 });
    }
if (!userData) {
  return NextResponse.json({ 
    email: "", 
    phone: "", 
    address: "", 
    linkedin: "" // 提供預設值，防止前端抓不到欄位崩潰
  }, { status: 200 }); // Build 時回傳空物件比 404 更安全
}
    // --- 關鍵修正區 ---
    // 確保在處理任何字串邏輯前，先給予預設值
    const rawLinkedin = userData.linkedin || ""; 
    
    // 如果你有在後端做格式化處理，請確保 linkedin 不是 undefined
    const processedData = {
      ...userData,
      // 確保 linkedin 永遠是字串，避免 startsWith 崩潰
      linkedin: rawLinkedin 
    };

    return NextResponse.json(processedData);
  } catch (error) {
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  } finally {
    // 注意：在 Next.js API 中，通常不建議頻繁 close()，
    // 但如果是一次性腳本則沒關係。
  }
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