import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const robot = {
  name: "Robot A-01",
  status: "พร้อมใช้งาน",
  battery: 76,
  position: "ชั้น 3 - ห้อง 502",
  error: null,
};

const logs = [
  { time: "08:05", message: "✅ Robot A-01 ส่งยาให้ห้อง 501 สำเร็จ" },
  { time: "08:12", message: "⚠️ Robot A-01 หยุดทำงานชั่วคราว (ล้อขัดข้อง)" },
  { time: "08:20", message: "🔔 แจ้งเตือน: ยังไม่ได้ให้ยาห้อง 503" },
  { time: "08:23", message: "🚨 ผู้ป่วยห้อง 504 ล้ม - แจ้งเจ้าหน้าที่แล้ว" },
];

export default function RobotManagement() {
  const [command, setCommand] = useState("");

  const handleSendCommand = () => {
    if (command.trim()) {
      alert(`ส่งคำสั่ง: ${command}`);
      setCommand("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Robot Management (ควบคุมหุ่นยนต์)</h1>

      {/* ข้อมูลสถานะหุ่นยนต์ */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-lg font-semibold">📡 ตำแหน่งปัจจุบัน: {robot.position}</h2>
          <p>🤖 ชื่อหุ่นยนต์: {robot.name}</p>
          <p>
            🔋 แบตเตอรี่: <strong>{robot.battery}%</strong>
            {robot.battery < 20 && (
              <Badge className="bg-red-200 text-red-800 ml-2">⚠️ ต่ำ</Badge>
            )}
          </p>
          <p>⚙️ สถานะ: {robot.status}</p>
          {robot.error && <p className="text-red-600">🚧 ข้อผิดพลาด: {robot.error}</p>}
        </CardContent>
      </Card>

      {/* ส่งคำสั่งให้หุ่นยนต์ */}
      <Card>
        <CardContent className="space-y-3">
          <h2 className="text-lg font-semibold">⚙️ ส่งคำสั่งให้หุ่นยนต์</h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="พิมพ์คำสั่ง เช่น ไปห้อง 502, รีสตาร์ท"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <button
            onClick={handleSendCommand}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            ส่งคำสั่ง
          </button>
        </CardContent>
      </Card>

      {/* แจ้งเตือน */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-lg font-semibold">🔔 แจ้งเตือนและเหตุการณ์ล่าสุด</h2>
          <ul className="text-sm space-y-1">
            {logs.map((log, idx) => (
              <li key={idx}>
                <span className="font-mono text-gray-500">[{log.time}]</span> {log.message}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
