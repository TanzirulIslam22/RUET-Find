import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

import User from "./modules/auth/auth.model.js";
import Item from "./modules/items/item.model.js";

const MONGODB_URI = process.env.MONGODB_URI;

const users = [
  {
    name: "Admin User",
    email: "admin@ruet.ac.bd",
    password: "admin123",
    studentId: "ADMIN-001",
    department: "Administration",
    role: "admin",
  },
  {
    name: "Sakib Ahmed",
    email: "sakib@ruet.ac.bd",
    password: "demo123",
    studentId: "1910120",
    department: "CSE",
    role: "student",
  },
  {
    name: "Tanvir Rahman",
    email: "tanvir@ruet.ac.bd",
    password: "demo123",
    studentId: "1910045",
    department: "ECE",
    role: "student",
  },
  {
    name: "Fatima Khatun",
    email: "fatima@ruet.ac.bd",
    password: "demo123",
    studentId: "2010078",
    department: "CEE",
    role: "student",
  },
  {
    name: "Rafid Hossain",
    email: "rafid@ruet.ac.bd",
    password: "demo123",
    studentId: "2010155",
    department: "ME",
    role: "student",
  },
  {
    name: "Nusrat Jahan",
    email: "nusrat@ruet.ac.bd",
    password: "demo123",
    studentId: "2110032",
    department: "CSE",
    role: "student",
  },
  {
    name: "Ariful Islam",
    email: "ariful@ruet.ac.bd",
    password: "demo123",
    studentId: "2110089",
    department: "EEE",
    role: "student",
  },
  {
    name: "Tasnim Ahmed",
    email: "tasnim@ruet.ac.bd",
    password: "demo123",
    studentId: "2210014",
    department: "CSE",
    role: "student",
  },
  {
    name: "Farhana Rahman",
    email: "farhana@ruet.ac.bd",
    password: "demo123",
    studentId: "2010067",
    department: "ARCH",
    role: "student",
  },
  {
    name: "Zahid Hasan",
    email: "zahid@ruet.ac.bd",
    password: "demo123",
    studentId: "1910198",
    department: "ME",
    role: "student",
  },
];

const items = [
  {
    title: "Black Leather Wallet",
    description:
      "Lost my black leather bi-fold wallet near the Central Library reading room. Contains student ID, bank card, and some cash. Has a small faded silver logo on the bottom right corner.",
    category: "other",
    status: "lost",
    location: "Central Library, 2nd Floor",
    color: "Black",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop"],
  },
  {
    title: "Set of 3 Keys with Blue Lanyard",
    description:
      "Found a set of 3 keys attached to a RUET official blue lanyard on the bench outside the cafeteria. One key has a small keychain.",
    category: "keys",
    status: "found",
    location: "Cafeteria",
    color: "Silver",
    brand: "N/A",
    images: ["https://images.unsplash.com/photo-1596870230751-eb2ce1f407d3?w=600&h=400&fit=crop"],
  },
  {
    title: "Casio fx-991EX Calculator",
    description:
      "Left my Casio scientific calculator in ECE Building Room 302 after the morning lecture. It's the latest CW model with a natural textbook display.",
    category: "electronics",
    status: "lost",
    location: "ECE Building, Room 302",
    color: "Black",
    brand: "Casio",
    images: ["https://images.unsplash.com/photo-1573366052485-7e93e87b1e41?w=600&h=400&fit=crop"],
  },
  {
    title: "MacBook Pro 14\" Charger",
    description:
      "Found a 61W USB-C power adapter (Apple original) plugged in at the library study zone. No laptop was connected to it.",
    category: "electronics",
    status: "found",
    location: "Central Library, Study Zone B",
    color: "White",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=400&fit=crop"],
  },
  {
    title: "Student ID Card - 20 Series",
    description:
      "Lost my RUET student ID card somewhere between the main gate and the CSE department. The card has my photo and name on it.",
    category: "documents",
    status: "lost",
    location: "CSE Building",
    color: "Blue",
    brand: "RUET",
    images: ["https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&h=400&fit=crop"],
  },
  {
    title: "Blue Physics Notebook",
    description:
      "Left my blue spiral notebook with Physics 301 notes on the 2nd floor of the library. Has my name written on the front cover.",
    category: "books",
    status: "lost",
    location: "Central Library, 2nd Floor",
    color: "Blue",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop"],
  },
  {
    title: "Wireless Mouse - Logitech",
    description:
      "Found a gray Logitech M750 wireless mouse on a desk in the ECE computer lab. No one was sitting there when I found it.",
    category: "electronics",
    status: "found",
    location: "ECE Building, Computer Lab",
    color: "Gray",
    brand: "Logitech",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop"],
  },
  {
    title: "Black Umbrella - Automatic",
    description:
      "Lost a black automatic open/close umbrella at the TSC auditorium after the seminar. It has a wooden handle.",
    category: "other",
    status: "lost",
    location: "TSC Auditorium",
    color: "Black",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop"],
  },
  {
    title: "Samsung Galaxy Buds Pro",
    description:
      "Found black Samsung earbuds in their charging case near the cafeteria entrance. The case has some minor scratches on the lid.",
    category: "electronics",
    status: "found",
    location: "Cafeteria Entrance",
    color: "Black",
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=400&fit=crop"],
  },
  {
    title: "Engineering Drawing Kit",
    description:
      "Left my entire engineering drawing kit (compass, divider, scale, protractor) in a black pouch in CSE-301 after the lab session.",
    category: "other",
    status: "lost",
    location: "CSE Building, Room 301",
    color: "Black",
    brand: "Camlin",
    images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop"],
  },
  {
    title: "Red Backpack with Books",
    description:
      "Found a red Jansport backpack containing 3 textbooks and a water bottle on the bench outside the academic building.",
    category: "bags",
    status: "found",
    location: "Academic Building 1, Entrance",
    color: "Red",
    brand: "Jansport",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop"],
  },
  {
    title: "USB Flash Drive 32GB",
    description:
      "Lost my SanDisk 32GB flash drive with my thesis backup. Last seen in the computer lab of the ECE department.",
    category: "electronics",
    status: "lost",
    location: "ECE Building, Computer Lab",
    color: "Red",
    brand: "SanDisk",
    images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop"],
  },
  {
    title: "Prescription Glasses - Round Frame",
    description:
      "Found a pair of round-frame prescription glasses near the library entrance. The frame is gold-colored metal.",
    category: "other",
    status: "found",
    location: "Central Library, Entrance",
    color: "Gold",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop"],
  },
  {
    title: "Green Hoodie - Size M",
    description:
      "Left my green zip-up hoodie at the TSC common room after football practice. Has a small white logo on the chest.",
    category: "clothing",
    status: "lost",
    location: "TSC Common Room",
    color: "Green",
    brand: "Nike",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop"],
  },
  {
    title: "Calculator - TI-36X Pro",
    description:
      "Found a Texas Instruments calculator in the hallway of Academic Building 2. It was sitting on a window ledge.",
    category: "electronics",
    status: "found",
    location: "Academic Building 2, Hallway",
    color: "Black",
    brand: "Texas Instruments",
    images: ["https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop"],
  },
  {
    title: "Lab Report File - EEE Dept",
    description:
      "Lost my EEE lab report file (hardcover, white) with 6 completed experiments. Has my name and roll number on the cover.",
    category: "documents",
    status: "lost",
    location: "EEE Building, Room 205",
    color: "White",
    brand: "N/A",
    images: ["https://images.unsplash.com/photo-1568205612837-017278922165?w=600&h=400&fit=crop"],
  },
  {
    title: "Wireless Earbuds - Boat Airdopes",
    description:
      "Found white Boat Airdopes in their charging case on a desk in the CSE lab. Case has 'RAHUL' written on it in pen.",
    category: "electronics",
    status: "found",
    location: "CSE Building, Lab 2",
    color: "White",
    brand: "Boat",
    images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=400&fit=crop"],
  },
  {
    title: "Mechanical Watch - Silver",
    description:
      "Lost my silver Fossil mechanical watch at the TSC ground during the cricket match. It has a leather strap and a transparent back.",
    category: "other",
    status: "lost",
    location: "TSC Ground",
    color: "Silver",
    brand: "Fossil",
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop"],
  },
  {
    title: "Lenovo Laptop Charger 65W",
    description:
      "Found a black Lenovo USB-C laptop charger near the power outlet in the ECE seminar hall. Someone must have left it after the workshop.",
    category: "electronics",
    status: "found",
    location: "ECE Seminar Hall",
    color: "Black",
    brand: "Lenovo",
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop"],
  },
  {
    title: "Navy Blue Denim Jacket",
    description:
      "Left my navy blue denim jacket draped over a chair in the CSE department common area. Size L, has a small pin on the left lapel.",
    category: "clothing",
    status: "lost",
    location: "CSE Department, Common Area",
    color: "Navy Blue",
    brand: "Levi's",
    images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=400&fit=crop"],
  },
  {
    title: "Drawing Instruments Set - Nataraj",
    description:
      "Found a Nataraj geometry box with compass, divider, and protractor inside. Found it on the floor in Academic Building 3, Room 104.",
    category: "other",
    status: "found",
    location: "Academic Building 3, Room 104",
    color: "Silver",
    brand: "Nataraj",
    images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop"],
  },
  {
    title: "Mechanics Textbook - Beer & Johnston",
    description:
      "Lost my 'Vector Mechanics for Engineers' textbook (12th edition) in the mechanical engineering study hall. Has highlighter marks and sticky notes throughout.",
    category: "books",
    status: "lost",
    location: "ME Building, Study Hall",
    color: "White",
    brand: "McGraw-Hill",
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop"],
  },
  {
    title: "Black Formal Shoes - Size 9",
    description:
      "Left my black formal shoes outside the seminar hall before the departmental presentation. Size 9, worn once for an interview.",
    category: "clothing",
    status: "lost",
    location: "Academic Building 2, Seminar Hall",
    color: "Black",
    brand: "Bata",
    images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=400&fit=crop"],
  },
  {
    title: "Power Bank - 20000mAh",
    description:
      "Found a black Ambrane 20000mAh power bank on a bench near the main gate. Still has some charge, screen shows battery level.",
    category: "electronics",
    status: "found",
    location: "Main Gate, Waiting Area",
    color: "Black",
    brand: "Ambrane",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=400&fit=crop"],
  },
  {
    title: "White Lab Coat",
    description:
      "Left my white lab coat on the hook in the chemistry lab after the practical. Has my name embroidered on the chest pocket.",
    category: "clothing",
    status: "lost",
    location: "Chemistry Lab, Building 5",
    color: "White",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop"],
  },
  {
    title: "Pencil Case - Gray Fabric",
    description:
      "Found a gray fabric pencil case with 4 pens, 2 pencils, and an eraser inside. Found it under a desk in Academic Building 1, Room 203.",
    category: "other",
    status: "found",
    location: "Academic Building 1, Room 203",
    color: "Gray",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=400&fit=crop"],
  },
  {
    title: "Motorola Earphones - Wired",
    description:
      "Lost my black wired Motorola earphones near the water cooler on the 3rd floor of the CSE building. The cable has a small tangle mark.",
    category: "electronics",
    status: "lost",
    location: "CSE Building, 3rd Floor",
    color: "Black",
    brand: "Motorola",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"],
  },
  {
    title: "Canvas Tote Bag - Beige",
    description:
      "Found a beige canvas tote bag with some books and a water bottle inside, left on a chair in the CAFeteria. Has 'Read More' printed on it.",
    category: "bags",
    status: "found",
    location: "Cafeteria, Seat 14",
    color: "Beige",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=400&fit=crop"],
  },
  {
    title: "Bicycle Key - Single Key",
    description:
      "Lost a single silver bicycle key with a small green rubber keychain somewhere on the path between the ME and CSE buildings.",
    category: "keys",
    status: "lost",
    location: "Path between ME and CSE Buildings",
    color: "Silver",
    brand: "N/A",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop"],
  },
  {
    title: "Samsung Galaxy Watch Band",
    description:
      "Found a black silicone 22mm watch band (Samsung Galaxy Watch compatible) lying on a desk in the ECE lab. No watch attached.",
    category: "other",
    status: "found",
    location: "ECE Building, Lab 1",
    color: "Black",
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=400&fit=crop"],
  },
  {
    title: "Blue Water Bottle - Milton 1L",
    description:
      "Left my blue Milton stainless steel water bottle in the ECE seminar hall after the guest lecture. Has stickers of planets on it.",
    category: "other",
    status: "lost",
    location: "ECE Seminar Hall",
    color: "Blue",
    brand: "Milton",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=400&fit=crop"],
  },
  {
    title: "Black Sunglasses - Aviator",
    description:
      "Found a pair of black aviator sunglasses on the cafeteria table near the window. The right arm has a slight scratch.",
    category: "other",
    status: "found",
    location: "Cafeteria, Window Seat",
    color: "Black",
    brand: "Ray-Ban",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop"],
  },
  {
    title: "Assignment Papers - CSE 305",
    description:
      "Lost my CSE 305 (Data Structures) assignment papers at the photocopier near the admin building. 15 pages stapled together with my name on the first page.",
    category: "documents",
    status: "lost",
    location: "Admin Building, Photocopier Area",
    color: "White",
    brand: "N/A",
    images: ["https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"],
  },
  {
    title: "Wireless Keyboard - Dell",
    description:
      "Found a black Dell wireless keyboard in the ECE computer center. Still in good condition, no visible damage.",
    category: "electronics",
    status: "found",
    location: "ECE Computer Center",
    color: "Black",
    brand: "Dell",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop"],
  },
  {
    title: "Grey Sweatshirt - Size L",
    description:
      "Left my grey Nike sweatshirt in the ME department reading room. Size L, has a small rip on the right sleeve hem.",
    category: "clothing",
    status: "lost",
    location: "ME Department, Reading Room",
    color: "Grey",
    brand: "Nike",
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=400&fit=crop"],
  },
  {
    title: "Room Key - Hostel Block B",
    description:
      "Found a hostel room key (Block B, Room 214) attached to a red thread near the hostel entrance gate. Must have fallen from someone's bag.",
    category: "keys",
    status: "found",
    location: "Hostel Block B, Entrance",
    color: "Silver",
    brand: "N/A",
    images: ["https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=400&fit=crop"],
  },
  {
    title: "HP Laptop Bag - Black",
    description:
      "Lost my black HP laptop bag with a 15.6 inch laptop inside. Was carrying it through the main academic building corridor around 2 PM.",
    category: "bags",
    status: "lost",
    location: "Academic Building, Main Corridor",
    color: "Black",
    brand: "HP",
    images: ["https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=400&fit=crop"],
  },
  {
    title: "Casio Digital Watch",
    description:
      "Found a classic black Casio digital watch on the floor in the TSC lobby. The band is intact and the watch is running.",
    category: "other",
    status: "found",
    location: "TSC Lobby",
    color: "Black",
    brand: "Casio",
    images: ["https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=400&fit=crop"],
  },
  {
    title: "Plastic Ruler Set - 15cm & 30cm",
    description:
      "Left my set of transparent plastic rulers (15cm and 30cm) on the lab bench in the CSE software lab after the practical exam.",
    category: "other",
    status: "lost",
    location: "CSE Building, Software Lab",
    color: "Transparent",
    brand: "General",
    images: ["https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&h=400&fit=crop"],
  },
  {
    title: "Black Cap - Baseball Style",
    description:
      "Found a plain black baseball cap on the TSC football field bleachers. No logos or writing on it, just a plain cap.",
    category: "clothing",
    status: "found",
    location: "TSC Football Field",
    color: "Black",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=400&fit=crop"],
  },
  {
    title: "A4 Notebook - Unlined",
    description:
      "Lost my unlined A4 notebook with architecture sketches on the 4th floor of the library. Has a brown cardboard cover with my name in marker.",
    category: "books",
    status: "lost",
    location: "Central Library, 4th Floor",
    color: "Brown",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop"],
  },
  {
    title: "iPhone Lightning Cable",
    description:
      "Found a white Apple Lightning to USB-C cable coiled up neatly on the 2nd floor study desk of the library. Looks brand new.",
    category: "electronics",
    status: "found",
    location: "Central Library, 2nd Floor",
    color: "White",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop"],
  },
  {
    title: "Brown Leather Belt",
    description:
      "Left my brown leather belt in the washroom of the CSE building. Size 34, has a silver buckle with a small dent.",
    category: "clothing",
    status: "lost",
    location: "CSE Building, Washroom",
    color: "Brown",
    brand: "Woodland",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop"],
  },
  {
    title: "Marker Pen Set - 12 Colors",
    description:
      "Found a set of 12 colored marker pens in a clear plastic case on the floor near the architecture studio. All pens appear to be working.",
    category: "other",
    status: "found",
    location: "Architecture Studio, Building 6",
    color: "Multicolor",
    brand: "Camlin",
    images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop"],
  },
  {
    title: "Library Card - RUET Central",
    description:
      "Lost my RUET Central Library card somewhere near the checkout counter. Card number 2024-0847. Has my photo on it.",
    category: "documents",
    status: "lost",
    location: "Central Library, Checkout Counter",
    color: "White",
    brand: "RUET",
    images: ["https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&h=400&fit=crop"],
  },
  {
    title: "Wireless Speaker - JBL Go 3",
    description:
      "Found a small red JBL Go 3 Bluetooth speaker sitting on the windowsill of the CSE department common room. It was fully charged when I found it.",
    category: "electronics",
    status: "found",
    location: "CSE Department, Common Room",
    color: "Red",
    brand: "JBL",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop"],
  },
  {
    title: "Sports Shoes - White Running",
    description:
      "Left my white running shoes (size 10) at the TSC gym changing room after my morning workout. They're Asics Gel series with blue accents.",
    category: "clothing",
    status: "lost",
    location: "TSC Gym, Changing Room",
    color: "White",
    brand: "Asics",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop"],
  },
  {
    title: "Scientific Notebook - Graph Paper",
    description:
      "Found a spiral-bound graph paper notebook on the desk in the CEE structural lab. First few pages have beam calculation diagrams.",
    category: "books",
    status: "found",
    location: "CEE Building, Structural Lab",
    color: "White",
    brand: "Generic",
    images: ["https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop"],
  },
  {
    title: "Tablet Stylus Pen",
    description:
      "Lost my Samsung S-Pen stylus somewhere in the CSE department seminar hall. It's the original black one that came with my Galaxy Tab.",
    category: "electronics",
    status: "lost",
    location: "CSE Department, Seminar Hall",
    color: "Black",
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1575018907563-18e3ac44f090?w=600&h=400&fit=crop"],
  },
  {
    title: "Lunch Box - Steel",
    description:
      "Found a stainless steel lunch box (3 compartments) in the cafeteria lost and found box. Looks like it was left behind after lunch hour.",
    category: "other",
    status: "found",
    location: "Cafeteria, Lost & Found Box",
    color: "Silver",
    brand: "Milton",
    images: ["https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=400&fit=crop"],
  },
  {
    title: "Tripod Stand - Mini",
    description:
      "Left my small black mini tripod (for phone) on the table in the ECE media lab after filming the project presentation. Has a flexible leg design.",
    category: "other",
    status: "lost",
    location: "ECE Building, Media Lab",
    color: "Black",
    brand: "Yunteng",
    images: ["https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&h=400&fit=crop"],
  },
  {
    title: "Canvas Backpack - Navy Blue",
    description:
      "Found a navy blue canvas backpack with a laptop compartment on the bus stop bench near the main gate. Contains a hoodie and a book.",
    category: "bags",
    status: "found",
    location: "Main Gate, Bus Stop",
    color: "Navy Blue",
    brand: "Wildcraft",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop"],
  },
  {
    title: "Admit Card - Midterm Exam",
    description:
      "Lost my CSE department midterm exam admit card somewhere between the exam hall (Room 401) and the water fountain. Has my photo and exam schedule printed on it.",
    category: "documents",
    status: "lost",
    location: "Academic Building 2, Room 401",
    color: "White",
    brand: "RUET",
    images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"],
  },
  {
    title: "Wireless Charger Pad",
    description:
      "Found a white Samsung wireless charger pad plugged in at the library charging station. No phone was on it when I noticed.",
    category: "electronics",
    status: "found",
    location: "Central Library, Charging Station",
    color: "White",
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop"],
  },
];

const dates = [
  new Date("2024-09-01"),
  new Date("2024-09-05"),
  new Date("2024-09-10"),
  new Date("2024-09-14"),
  new Date("2024-09-18"),
  new Date("2024-09-22"),
  new Date("2024-09-26"),
  new Date("2024-09-30"),
  new Date("2024-10-03"),
  new Date("2024-10-07"),
  new Date("2024-10-10"),
  new Date("2024-10-14"),
  new Date("2024-10-17"),
  new Date("2024-10-20"),
  new Date("2024-10-23"),
  new Date("2024-10-26"),
  new Date("2024-10-29"),
  new Date("2024-11-01"),
  new Date("2024-11-04"),
  new Date("2024-11-07"),
  new Date("2024-11-10"),
  new Date("2024-11-13"),
  new Date("2024-11-16"),
  new Date("2024-11-19"),
  new Date("2024-11-22"),
  new Date("2024-11-25"),
  new Date("2024-11-28"),
  new Date("2024-12-01"),
  new Date("2024-12-04"),
  new Date("2024-12-07"),
  new Date("2024-12-10"),
  new Date("2024-12-13"),
  new Date("2024-12-16"),
  new Date("2024-12-19"),
  new Date("2024-12-22"),
  new Date("2024-12-25"),
  new Date("2024-12-28"),
  new Date("2024-12-31"),
  new Date("2025-01-02"),
  new Date("2025-01-05"),
  new Date("2025-01-08"),
  new Date("2025-01-11"),
  new Date("2025-01-14"),
  new Date("2025-01-17"),
  new Date("2025-01-20"),
  new Date("2025-01-23"),
  new Date("2025-01-26"),
  new Date("2025-01-29"),
  new Date("2025-02-01"),
  new Date("2025-02-04"),
  new Date("2025-02-07"),
  new Date("2025-02-10"),
  new Date("2025-02-13"),
  new Date("2025-02-16"),
  new Date("2025-02-19"),
  new Date("2025-02-22"),
  new Date("2025-02-25"),
  new Date("2025-02-28"),
  new Date("2025-03-03"),
  new Date("2025-03-06"),
];

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    await User.deleteMany({});
    await Item.deleteMany({});
    console.log("Cleared existing data");

    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`Created user: ${user.email} (${user.role})`);
    }

    const studentUsers = createdUsers.filter((u) => u.role === "student");

    for (let i = 0; i < items.length; i++) {
      const reporter = studentUsers[i % studentUsers.length];
      const item = await Item.create({
        ...items[i],
        reportedBy: reporter._id,
        dateLostFound: dates[i % dates.length],
        createdAt: dates[i % dates.length],
        itemStatus: "active",
      });
      console.log(`Created item: ${item.title} (${item.status})`);
    }

    const totalItems = await Item.countDocuments();
    const totalUsers = await User.countDocuments();
    console.log(`\nSeeding complete!`);
    console.log(`  Users: ${totalUsers}`);
    console.log(`  Items: ${totalItems}`);

    console.log(`\n--- DEMO ACCOUNTS ---`);
    console.log(`Admin:     admin@ruet.ac.bd / admin123`);
    console.log(`Student 1: sakib@ruet.ac.bd / demo123`);
    console.log(`Student 2: tanvir@ruet.ac.bd / demo123`);
    console.log(`Student 3: fatima@ruet.ac.bd / demo123`);
    console.log(`Student 4: rafid@ruet.ac.bd / demo123`);
    console.log(`Student 5: nusrat@ruet.ac.bd / demo123`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
