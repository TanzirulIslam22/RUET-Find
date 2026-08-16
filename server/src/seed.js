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
];

const dates = [
  new Date("2024-10-20"),
  new Date("2024-10-21"),
  new Date("2024-10-22"),
  new Date("2024-10-23"),
  new Date("2024-10-24"),
  new Date("2024-10-25"),
  new Date("2024-10-26"),
  new Date("2024-10-27"),
  new Date("2024-10-28"),
  new Date("2024-10-29"),
  new Date("2024-10-30"),
  new Date("2024-10-31"),
  new Date("2024-11-01"),
  new Date("2024-11-02"),
  new Date("2024-11-03"),
  new Date("2024-11-04"),
  new Date("2024-11-05"),
  new Date("2024-11-06"),
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
