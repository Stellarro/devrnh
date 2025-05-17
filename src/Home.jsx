import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const fakeBarData = [
  { day: "Mon", patients: 10 },
  { day: "Tue", patients: 20 },
  { day: "Wed", patients: 15 },
  { day: "Thu", patients: 18 },
  { day: "Fri", patients: 12 },
  { day: "Sat", patients: 7 },
  { day: "Sun", patients: 9 },
];

const fakeDelayData = [
  { hour: "08:00", errors: 1 },
  { hour: "10:00", errors: 3 },
  { hour: "12:00", errors: 2 },
  { hour: "14:00", errors: 0 },
  { hour: "16:00", errors: 4 },
];

const robotLocations = [
  { id: "A-01", floor: 3, room: 502, x: "30%", y: "40%" },
  { id: "B-02", floor: 2, room: 210, x: "60%", y: "70%" },
  { id: "C-03", floor: 4, room: 401, x: "75%", y: "20%" },
];

const medicationData = [
  { room: "501", name: "สมชาย ใจดี", status: "✅ ให้ยาแล้ว", badge: "green" },
  { room: "502", name: "สมหญิง แซ่ลี้", status: "⏰ ใกล้ครบเวลา", badge: "yellow" },
  { room: "503", name: "อดิศักดิ์ หาญกล้า", status: "❌ ล่าช้า", badge: "red" },
  { room: "504", name: "สายฝน พิรุณ", status: "✅ ให้ยาแล้ว", badge: "green" },
  { room: "505", name: "ณรงค์ชัย สุวรรณ", status: "✅ ให้ยาแล้ว", badge: "green" },
  { room: "506", name: "มนัสนันท์ รัตนา", status: "⏰ ใกล้ครบเวลา", badge: "yellow" },
  { room: "507", name: "สมจิตร ปานทอง", status: "❌ ล่าช้า", badge: "red" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-8 font-sans">
      <div className="bg-white shadow rounded-xl px-6 py-4 mb-8 flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-800">ศูนย์ควบคุมหุ่นยนต์ผู้ช่วยพยาบาล</h1>
        <p className="text-sm text-gray-500">แดชบอร์ดรวมสถานะระบบและเมนูเข้าถึงรวดเร็ว</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[{ title: "Dashboard", icon: "📊", desc: "ดูภาพรวมระบบ", color: "text-blue-600", path: "/dashboard" },
          { title: "Medication Tracker", icon: "💊", desc: "ติดตามการให้ยา", color: "text-green-600", path: "/medications" },
          { title: "กะพยาบาล", icon: "🕒", desc: "จัดการเวรและส่งต่อ", color: "text-purple-600", path: "/shifts" },
          { title: "Robot Management", icon: "🤖", desc: "ควบคุมหุ่นยนต์และแจ้งเตือน", color: "text-gray-800", path: "/robots" },
        ].map(({ title, icon, desc, color, path }) => (
          <Card key={title} className="hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col justify-between h-36 p-5">
              <div>
                <h2 className="text-lg font-semibold">{icon} {title}</h2>
                <p className="text-sm text-gray-500 mt-1">{desc}</p>
              </div>
              <button
                onClick={() => navigate(path)}
                className={`mt-4 text-sm font-medium hover:underline ${color}`}
              >
                ไปยัง {title} →
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <Card className="bg-white rounded-xl relative overflow-hidden">
          <CardContent>
            <h3 className="text-lg font-semibold mb-3">แผนที่ตำแหน่งหุ่นยนต์</h3>
            <div className="relative h-52 bg-gray-100 rounded-lg border overflow-hidden">
              <img
                src="/mnt/data/304_Parking-Map-1024x768.jpg"
                alt="Hospital Layout Placeholder"
                className="absolute inset-0 object-cover w-full h-full opacity-60"
              />
              {robotLocations.map((bot) => (
                <div
                  key={bot.id}
                  className="absolute w-6 h-6 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full shadow-lg"
                  style={{ left: bot.x, top: bot.y }}
                  title={`Robot ${bot.id} - ชั้น ${bot.floor} ห้อง ${bot.room}`}
                >
                  {bot.id}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl">
          <CardContent>
            <h3 className="text-lg font-semibold mb-3">กราฟจำนวนผู้ป่วยได้รับยา</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={fakeBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="patients" fill="#38bdf8" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl">
          <CardContent>
            <h3 className="text-lg font-semibold mb-3">กราฟความล่าช้า/ผิดพลาด</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={fakeDelayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">ตารางสรุปการให้ยาตามห้อง</h3>
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-2">ห้อง</th>
                <th className="p-2">ผู้ป่วย</th>
                <th className="p-2">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {medicationData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{row.room}</td>
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">
                    <Badge className={
                      row.badge === "green"
                        ? "bg-green-200 text-green-900"
                        : row.badge === "yellow"
                        ? "bg-yellow-200 text-yellow-900"
                        : "bg-red-200 text-red-900"
                    }>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-3">รายชื่อพยาบาลในกะวันนี้</h3>
          <ul className="space-y-1 text-sm mb-4 text-gray-800">
            <li>👩‍⚕️ วิภา กาญจน์ - กะเช้า</li>
            <li>👨‍⚕️ สมบูรณ์ มานะ - กะบ่าย</li>
            <li>👩‍⚕️ จารุวรรณ อารี - กะดึก</li>
          </ul>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm">
            ส่งต่อเวร + แนบโน้ต
          </button>
        </CardContent>
      </Card>
    </div>
  );
}