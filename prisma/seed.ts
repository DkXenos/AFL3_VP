import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.customer.deleteMany();

  console.log("Cleared existing data...");

  const customer1 = await prisma.customer.create({
    data: {
      username: "jason_tio",
      phone: "081234567890",
      password: await bcrypt.hash("password123", 10),
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      username: "bryanf",
      phone: "081234567891",
      password: await bcrypt.hash("password123", 10),
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      username: "obiez",
      phone: "081234567892",
      password: await bcrypt.hash("password123", 10),
    },
  });

  console.log("Created 3 customers...");

  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: "uncle tan",
      description: "makanan mahasiswa",
      is_open: true,
      customer_id: customer1.id,
    },
  });

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: "paus puas",
      description: "mahal!",
      is_open: true,
      customer_id: customer2.id,
    },
  });

  const restaurant3 = await prisma.restaurant.create({
    data: {
      name: "pig daddy",
      description: "enak tapi mahal",
      is_open: false,
      customer_id: customer1.id,
    },
  });

  console.log("Created 3 restaurants...");

  function calculateEstimatedArrival(itemCount: number): Date {
    const now = new Date();
    const preparationTime = itemCount * 10;
    const deliveryTime = 10;
    const totalMinutes = preparationTime + deliveryTime;
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }

  const order1 = await prisma.order.create({
    data: {
      item_count: 2,
      estimated_arrival: calculateEstimatedArrival(2),
      customer_id: customer1.id,
      restaurant_id: restaurant1.id,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      item_count: 5,
      estimated_arrival: calculateEstimatedArrival(5),
      customer_id: customer2.id,
      restaurant_id: restaurant2.id,
    },
  });

  const order3 = await prisma.order.create({
    data: {
      item_count: 1,
      estimated_arrival: calculateEstimatedArrival(1),
      customer_id: customer3.id,
      restaurant_id: restaurant1.id,
    },
  });

  const order4 = await prisma.order.create({
    data: {
      item_count: 3,
      estimated_arrival: calculateEstimatedArrival(3),
      customer_id: customer1.id,
      restaurant_id: restaurant2.id,
    },
  });

  const order5 = await prisma.order.create({
    data: {
      item_count: 4,
      estimated_arrival: calculateEstimatedArrival(4),
      customer_id: customer2.id,
      restaurant_id: restaurant1.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
