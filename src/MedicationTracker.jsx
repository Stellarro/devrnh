import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const allData = [
  {
    room: "501",
    name: "สมชาย ใจดี",
    med: "Metformin",
    time: "08:00",
    status: "ให้ยาแล้ว",
  },
  {
    room: "502",
    name: "สมหญิง แซ่ลี้",
    med: "Atorvastatin",
    time: "08:00",
    status: "ใกล้ครบเวลา",
  },
  {
    room: "503",
    name: "อดิศักดิ์ หาญกล้า",
    med: "Lisinopril",
    time: "08:00",
    status: "ล่าช้า",
  },
];

export default function MedicationTracker() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const filtered = allData.filter(
    (item) =>
      item.name.includes(search) ||
      item.room.includes(search) ||
      item.time.includes(search)
  );

  const statusBadge = (status) => {
    if (status === "ให้ยาแล้ว")
      return <Badge className="bg-green-200 text-green-900">✅ {status}</Badge>;
    if (status === "ใกล้ครบเวลา")
      return <Badge className="bg-yellow-200 text-yellow-900">⏰ {status}</Badge>;
    return <Badge className="bg-red-200 text-red-900">❌ {status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Medication Tracker</h1>

      {/* 🔍 ฟิลเตอร์ + วันที่ */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="ค้นหาชื่อผู้ป่วย / ห้อง / เวลา"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-md"
        />
      </div>

      {/* 📋 ตารางสถานะการให้ยา */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">สถานะการให้ยารายห้อง - วันที่ {date}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>ห้อง</TableCell>
                <TableCell>ชื่อผู้ป่วย</TableCell>
                <TableCell>ยา</TableCell>
                <TableCell>เวลา</TableCell>
                <TableCell>สถานะ</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.room}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.med}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan="5" className="text-center py-4 text-gray-500">
                    ไม่พบข้อมูลที่ค้นหา
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
