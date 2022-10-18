แบ่ง viwe เป็นสองส่วนมี ไฟล์Tablequeueu , ReadyQueue
คอนมี 1 ไฟล์

Tablequeueu
button เรียกใช้ฟังชั้น addPro เมื่อมีการกดให้มันส่งค่าไปที่ฟังชั้น
ส่วนของตาราง tbody เรียกใช้ ฟังชั้น process ให้ลูป map ส่วนของ นี้เรียกใช้?โอเปอเรชั้น รับพารามา 2 ตัวคือตัว it กับ index
ให้ tr index เป็นคีย์เข้ามา
ละก็เรียกใช้ตัวแปรต่างๆ

const รับฟังชั้นawg,clock,process,addPro,Reset,allprocessส่วนของไฟล์Tablequeueu
แท็ค p CPU Clock รับฟังชั้น clock มา
แท็ค p CPU Process  รับฟังชั้น allprocess มา
แท็ค p AVG Waitting Time  รับฟังชั้น awg มา

button เรียกใช้ฟังชั้นเมื่อมีการกด Reset 
ไฟล์ReadyQueue
const รับฟังชั้น process,readyRobin จากไฟล์คอนมาใช้งาน
ส่วนของ tbody รับฟังชั้น readyRobin มาลูป map รับพารามาสองตัวคือ it,index

เงื่อนไขถ้า state เท่ากับ 0ให้
รับ index เป็นคีย์
ให้วนลูปmap
โชว์ตัว Process
ถัดมาตารางFCFS
รับฟังชั้นProcessมาลูป mapรับพารามาสองตัวคือ it,index
เงื่อนไขถ้า state เท่ากับ 1ให้
รับ index เป็นคีย์
ให้วนลูปmap
โชว์ตัว Process