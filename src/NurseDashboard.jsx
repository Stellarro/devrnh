import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const shiftData = {
  เช้า: {
    nurse: "วิภา กาญจน์",
    tasksDone: 5,
    tasksPending: ["ให้ยา 502", "บันทึกชีพจร 504"],
  },
  บ่าย: {
    nurse: "สมบูรณ์ มานะ",
    tasksDone: 3,
    tasksPending: ["ตรวจวัดอุณหภูมิ 505"],
  },
  ดึก: {
    nurse: "จารุวรรณ อารี",
    tasksDone: 2,
    tasksPending: [],
  },
};

const chartData = Object.entries(shiftData).map(([shift, data]) => ({
  shift,
  tasksDone: data.tasksDone,
}));

export default function ShiftSummary() {
  const [handoverNote, setHandoverNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (handoverNote.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">สรุปกะพยาบาล (Shift Summary)</h1>

      {/* กราฟงานแต่ละกะ */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">📊 จำนวนงานที่ทำในแต่ละกะ</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shift" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="tasksDone" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(shiftData).map(([shift, data]) => (
          <Card key={shift}>
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">🕒 กะ{shift}</h2>
              <p>👩‍⚕️ พยาบาล: {data.nurse}</p>
              <p>
                📊 งานที่ทำแล้ว: <strong>{data.tasksDone}</strong>
              </p>
              <div>
                ✅ งานค้าง:
                {data.tasksPending.length > 0 ? (
                  <ul className="list-disc ml-5 text-sm text-red-600">
                    {data.tasksPending.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-700">ไม่มี</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-3">
          <h2 className="text-lg font-semibold">📝 ส่งต่อเวรพร้อมหมายเหตุ</h2>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            placeholder="พิมพ์หมายเหตุการส่งต่อเวร..."
            value={handoverNote}
            onChange={(e) => setHandoverNote(e.target.value)}
          ></textarea>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            onClick={handleSubmit}
          >
            ส่งต่อเวร
          </button>
          {submitted && (
            <p className="text-green-600 font-semibold">✅ ส่งต่อเวรเรียบร้อยแล้ว</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
