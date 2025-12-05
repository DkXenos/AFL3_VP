import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.order.deleteMany()
    await prisma.restaurant.deleteMany()
    await prisma.customer.deleteMany()

    console.log('Cleared existing data...')

    // Create 3 Customers
    const customer1 = await prisma.customer.create({
        data: {
            username: 'john_doe',
            phone: '081234567890',
            password: await bcrypt.hash('password123', 10),
        },
    })

    const customer2 = await prisma.customer.create({
        data: {
            username: 'jane_smith',
            phone: '081234567891',
            password: await bcrypt.hash('password123', 10),
        },
    })

    const customer3 = await prisma.customer.create({
        data: {
            username: 'bob_wilson',
            phone: '081234567892',
            password: await bcrypt.hash('password123', 10),
        },
    })

    console.log('Created 3 customers...')

    // Create 3 Restaurants
    const restaurant1 = await prisma.restaurant.create({
        data: {
            name: 'Pizza Paradise',
            description: 'Best pizza in town with authentic Italian recipes',
            is_open: true,
            customer_id: customer1.id,
        },
    })

    const restaurant2 = await prisma.restaurant.create({
        data: {
            name: 'Burger House',
            description: 'Juicy burgers and crispy fries, open late!',
            is_open: true,
            customer_id: customer2.id,
        },
    })

    const restaurant3 = await prisma.restaurant.create({
        data: {
            name: 'Sushi Express',
            description: 'Fresh sushi and Japanese cuisine',
            is_open: false,
            customer_id: customer1.id,
        },
    })

    console.log('Created 3 restaurants...')

    // Helper function to calculate estimated arrival
    function calculateEstimatedArrival(itemCount: number): Date {
        const now = new Date()
        const preparationTime = itemCount * 10
        const deliveryTime = 10
        const totalMinutes = preparationTime + deliveryTime
        now.setMinutes(now.getMinutes() + totalMinutes)
        return now
    }

    // Create 5 Orders
    const order1 = await prisma.order.create({
        data: {
            item_count: 2,
            estimated_arrival: calculateEstimatedArrival(2),
            customer_id: customer1.id,
            restaurant_id: restaurant1.id,
        },
    })

    const order2 = await prisma.order.create({
        data: {
            item_count: 5,
            estimated_arrival: calculateEstimatedArrival(5),
            customer_id: customer2.id,
            restaurant_id: restaurant2.id,
        },
    })

    const order3 = await prisma.order.create({
        data: {
            item_count: 1,
            estimated_arrival: calculateEstimatedArrival(1),
            customer_id: customer3.id,
            restaurant_id: restaurant1.id,
        },
    })

    const order4 = await prisma.order.create({
        data: {
            item_count: 3,
            estimated_arrival: calculateEstimatedArrival(3),
            customer_id: customer1.id,
            restaurant_id: restaurant2.id,
        },
    })

    const order5 = await prisma.order.create({
        data: {
            item_count: 4,
            estimated_arrival: calculateEstimatedArrival(4),
            customer_id: customer2.id,
            restaurant_id: restaurant1.id,
        },
    })

    console.log('Created 5 orders...')

    console.log('\n========== SEED DATA SUMMARY ==========')
    console.log('\nCustomers:')
    console.log('1. john_doe (phone: 081234567890, password: password123)')
    console.log('2. jane_smith (phone: 081234567891, password: password123)')
    console.log('3. bob_wilson (phone: 081234567892, password: password123)')
    
    console.log('\nRestaurants:')
    console.log(`1. Pizza Paradise (ID: ${restaurant1.id}, Owner: john_doe, Open: Yes)`)
    console.log(`2. Burger House (ID: ${restaurant2.id}, Owner: jane_smith, Open: Yes)`)
    console.log(`3. Sushi Express (ID: ${restaurant3.id}, Owner: john_doe, Open: No)`)
    
    console.log('\nOrders:')
    console.log(`1. Order #${order1.id}: john_doe ordered 2 items from Pizza Paradise`)
    console.log(`2. Order #${order2.id}: jane_smith ordered 5 items from Burger House`)
    console.log(`3. Order #${order3.id}: bob_wilson ordered 1 item from Pizza Paradise`)
    console.log(`4. Order #${order4.id}: john_doe ordered 3 items from Burger House`)
    console.log(`5. Order #${order5.id}: jane_smith ordered 4 items from Pizza Paradise`)
    console.log('\n=======================================\n')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
