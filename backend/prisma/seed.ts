import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create users
  const password = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'alice@growdiaries.com' },
    update: {},
    create: {
      email: 'alice@growdiaries.com',
      username: 'alice_grower',
      password,
      emailVerified: true,
      bio: '🌿 Passionate indoor grower | 5 years experience',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@growdiaries.com' },
    update: {},
    create: {
      email: 'bob@growdiaries.com',
      username: 'bob_cultivator',
      password,
      emailVerified: true,
      bio: '🌱 Organic grower | Love experimenting with strains',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'charlie@growdiaries.com' },
    update: {},
    create: {
      email: 'charlie@growdiaries.com',
      username: 'charlie_green',
      password,
      emailVerified: true,
      bio: '🌿 Hydroponic specialist | Tech-savvy grower',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
    },
  });

  console.log('✅ Created users');

  // Create runs
  const run1 = await prisma.run.create({
    data: {
      title: 'Northern Lights Auto - First Grow',
      description: 'My first grow with Northern Lights autoflower. Using LED lights and organic soil.',
      strainName: 'Northern Lights Auto',
      strainType: 'Indica-dominant autoflower',
      isPublic: true,
      lightType: 'LED Full Spectrum',
      lightWatts: 300,
      medium: 'Organic Soil Mix',
      nutrients: 'BioBizz Organic Line',
      phase: 'FLOWERING',
      userId: user1.id,
    },
  });

  const run2 = await prisma.run.create({
    data: {
      title: 'Blue Dream - Indoor Hydro Setup',
      description: 'Growing Blue Dream in DWC hydroponic system. Aiming for maximum yields!',
      strainName: 'Blue Dream',
      strainType: 'Sativa-dominant hybrid',
      isPublic: true,
      lightType: 'HPS 600W',
      lightWatts: 600,
      medium: 'DWC Hydroponics',
      nutrients: 'General Hydroponics Flora Series',
      phase: 'VEGETATIVE',
      userId: user2.id,
    },
  });

  const run3 = await prisma.run.create({
    data: {
      title: 'White Widow - Outdoor Season 2024',
      description: 'Classic White Widow strain grown outdoors. All natural sunlight!',
      strainName: 'White Widow',
      strainType: 'Balanced hybrid',
      isPublic: true,
      lightType: 'Natural Sunlight',
      medium: 'Living Soil',
      nutrients: 'Compost Tea & Organic Amendments',
      phase: 'SEEDLING',
      userId: user3.id,
    },
  });

  console.log('✅ Created runs');

  // Create entries
  await prisma.entry.create({
    data: {
      title: 'Day 30 - Flowering has begun!',
      content: 'First signs of flowering appeared today. The plants are looking healthy and vigorous. Switched to bloom nutrients.',
      dayNumber: 30,
      weekNumber: 5,
      temperature: 24.5,
      humidity: 55,
      vpd: 1.2,
      ec: 1.8,
      ph: 6.2,
      ppfd: 800,
      images: [
        'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=800',
        'https://images.unsplash.com/photo-1536964549788-6c4e1d0c0c2f?w=800',
      ],
      runId: run1.id,
      userId: user1.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'Day 45 - Buds are swelling',
      content: 'The buds are really starting to fill out now. Added some bloom boosters to the nutrient solution. Trichomes are developing nicely.',
      dayNumber: 45,
      weekNumber: 7,
      temperature: 23,
      humidity: 50,
      vpd: 1.3,
      ec: 2.0,
      ph: 6.3,
      ppfd: 850,
      images: [
        'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=800',
      ],
      runId: run1.id,
      userId: user1.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'Week 3 - Explosive Vegetative Growth',
      content: 'The plants have doubled in size this week. DWC is really showing its benefits with rapid growth. Started LST training.',
      dayNumber: 21,
      weekNumber: 3,
      temperature: 26,
      humidity: 60,
      vpd: 1.1,
      ec: 1.4,
      ph: 5.8,
      ppfd: 600,
      images: [
        'https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=800',
      ],
      runId: run2.id,
      userId: user2.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'Day 7 - Seedlings emerging',
      content: 'All seeds have germinated successfully! Healthy looking seedlings with nice green color. Keeping humidity high.',
      dayNumber: 7,
      weekNumber: 1,
      temperature: 25,
      humidity: 70,
      vpd: 0.8,
      ph: 6.5,
      images: [
        'https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=800',
      ],
      runId: run3.id,
      userId: user3.id,
    },
  });

  console.log('✅ Created entries');

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'Looking great! Those buds are going to be massive 🔥',
      userId: user2.id,
      runId: run1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Nice work! What's your light schedule during flowering?',
      userId: user3.id,
      runId: run1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'DWC is the way to go! Your growth rate is impressive 💪',
      userId: user1.id,
      runId: run2.id,
    },
  });

  console.log('✅ Created comments');

  // Create likes
  await prisma.like.create({
    data: {
      userId: user2.id,
      runId: run1.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user3.id,
      runId: run1.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user1.id,
      runId: run2.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user1.id,
      runId: run3.id,
    },
  });

  console.log('✅ Created likes');

  // Create follows
  await prisma.follow.create({
    data: {
      followerId: user2.id,
      followingId: user1.id,
    },
  });

  await prisma.follow.create({
    data: {
      followerId: user3.id,
      followingId: user1.id,
    },
  });

  await prisma.follow.create({
    data: {
      followerId: user1.id,
      followingId: user2.id,
    },
  });

  console.log('✅ Created follows');

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
