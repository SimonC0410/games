import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {

    console.log('🌱 Starting seed...')

    // -----------------------------
    // 1. Clean database
    // -----------------------------

    await prisma.game.deleteMany()
    await prisma.console.deleteMany()

    console.log('🧹 Database cleaned')

    // -----------------------------
    // 2. Create Consoles
    // -----------------------------

    const consoles = await prisma.console.createMany({
        data: [
            {
                name: 'PlayStation 5',
                manuFacturer: 'Sony Interactive Entertainment',
                releaseDate: new Date('2020-11-12'),
                description:
                    'The PlayStation 5 (PS5) is a home video game console bringing 4K gaming at 120Hz and ray tracing support.',
            },
            {
                name: 'Xbox Series X',
                manuFacturer: 'Microsoft',
                releaseDate: new Date('2020-11-10'),
                description:
                    'The Xbox Series X is a high-performance console, featuring a custom AMD processor and 12 TFLOPS of graphical power.',
            },
            {
                name: 'Nintendo Switch OLED Model',
                manuFacturer: 'Nintendo',
                releaseDate: new Date('2021-10-08'),
                description:
                    'A hybrid console that can be used as a home console and a portable handheld device, now with a vibrant OLED screen.',
            },
            {
                name: 'Nintendo Switch 2',
                manuFacturer: 'Nintendo',
                releaseDate: new Date('2025-06-05'),
                description:
                    'The successor to the popular Nintendo Switch, featuring larger magnetic Joy-cons and enhanced performance.',
            },
            {
                name: 'Steam Deck OLED',
                manuFacturer: 'Valve',
                releaseDate: new Date('2023-11-16'),
                description:
                    'A powerful handheld gaming computer that plays PC games from your Steam library on the go.',
            },
        ],
    })

    console.log('🎮 5 consoles seeded')

    // -----------------------------
    // 3. Get consoles from DB
    // -----------------------------

    const allConsoles = await prisma.console.findMany()

    const ps5 = allConsoles.find(c => c.name === 'PlayStation 5')
    const xbox = allConsoles.find(c => c.name === 'Xbox Series X')
    const switchOLED = allConsoles.find(c => c.name === 'Nintendo Switch OLED Model')
    const switch2 = allConsoles.find(c => c.name === 'Nintendo Switch 2')
    const steamDeck = allConsoles.find(c => c.name === 'Steam Deck OLED')

    // -----------------------------
    // 4. Create Games
    // -----------------------------

    const gamesData = [
        {
            title: 'God of War Ragnarök',
            developer: 'Santa Monica Studio',
            releasedate: new Date('2022-11-09'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Kratos and Atreus must journey to each of the Nine Realms and find answers as the forces of Asgard prepare for a prophesied battle.',
            console_id: ps5?.id,
        },
        {
            title: 'Halo Infinite',
            developer: '343 Industries',
            releasedate: new Date('2021-12-08'),
            price: 59.99,
            genre: 'First-person shooter',
            description:
                'Master Chief returns in the most expansive Halo campaign yet.',
            console_id: xbox?.id,
        },
        {
            title: 'Elden Ring',
            developer: 'FromSoftware',
            releasedate: new Date('2022-02-25'),
            price: 59.99,
            genre: 'Action role-playing',
            description:
                'A fantasy action RPG adventure set within a world created by Hidetaka Miyazaki.',
            console_id: ps5?.id,
        },
        {
            title: 'Forza Horizon 5',
            developer: 'Playground Games',
            releasedate: new Date('2021-11-09'),
            price: 59.99,
            genre: 'Racing',
            description:
                'Explore the vibrant open world landscapes of Mexico.',
            console_id: xbox?.id,
        },
        {
            title: 'Pokémon Scarlet',
            developer: 'Game Freak',
            releasedate: new Date('2022-11-18'),
            price: 59.99,
            genre: 'Role-playing',
            description:
                'Embark on a new journey in the Paldea region.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Spider-Man 2',
            developer: 'Insomniac Games',
            releasedate: new Date('2023-10-20'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Peter Parker and Miles Morales face the Symbiote threat.',
            console_id: ps5?.id,
        },
        {
            title: 'Starfield',
            developer: 'Bethesda Game Studios',
            releasedate: new Date('2023-09-06'),
            price: 69.99,
            genre: 'Role-playing',
            description:
                'Explore the vastness of space and create your own story.',
            console_id: xbox?.id,
        },
        {
            title: 'Mario Kart 9',
            developer: 'Nintendo EPD',
            releasedate: new Date('2025-12-01'),
            price: 59.99,
            genre: 'Racing',
            description:
                'The next installment in the popular Mario Kart series.',
            console_id: switch2?.id,
        },
        {
            title: 'Hogwarts Legacy',
            developer: 'Avalanche Software',
            releasedate: new Date('2023-02-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description:
                'Experience a new story set in the wizarding world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Red Dead Redemption 2',
            developer: 'Rockstar Games',
            releasedate: new Date('2018-10-26'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'An epic tale of life in America at the dawn of the modern age.',
            console_id: ps5?.id,

        },
        {
            title: 'The Witcher 3: Wild Hunt',
            developer: 'CD Projekt Red',
            releasedate: new Date('2015-05-19'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'Geralt of Rivia searches for his missing adopted daughter.',
            console_id: ps5?.id,

        },
        {
            title: 'Cyberpunk 2077',
            developer: 'CD Projekt Red',
            releasedate: new Date('2020-12-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'An open-world RPG set in Night City.',
            console_id: xbox?.id,

        },
        {
            title: 'Grand Theft Auto V',
            developer: 'Rockstar Games',
            releasedate: new Date('2013-09-17'),
            price: 29.99,
            genre: 'Action-adventure',
            description: 'Three criminals plan and execute heists in Los Santos.',
            console_id: ps5?.id,

        },
        {
            title: 'Resident Evil 4',
            developer: 'Capcom',
            releasedate: new Date('2023-03-24'),
            price: 59.99,
            genre: 'Survival horror',
            description: 'Leon S. Kennedy rescues the president’s daughter.',
            console_id: ps5?.id,

        },
        {
            title: 'Dead Space',
            developer: 'Motive Studio',
            releasedate: new Date('2023-01-27'),
            price: 59.99,
            genre: 'Survival horror',
            description: 'A remake of the sci-fi horror classic.',
            console_id: xbox?.id,

        },
        {
            title: 'Call of Duty: Modern Warfare II',
            developer: 'Infinity Ward',
            releasedate: new Date('2022-10-28'),
            price: 69.99,
            genre: 'First-person shooter',
            description: 'Task Force 141 returns in a global conflict.',
            console_id: xbox?.id,

        },
        {
            title: 'Assassin’s Creed Valhalla',
            developer: 'Ubisoft Montreal',
            releasedate: new Date('2020-11-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'Play as a Viking raider exploring England.',
            console_id: ps5?.id,

        },
        {
            title: 'Baldur’s Gate 3',
            developer: 'Larian Studios',
            releasedate: new Date('2023-08-03'),
            price: 59.99,
            genre: 'Role-playing',
            description: 'A deep RPG based on Dungeons & Dragons.',
            console_id: steamDeck?.id,

        },
        {
            title: 'Diablo IV',
            developer: 'Blizzard Entertainment',
            releasedate: new Date('2023-06-06'),
            price: 69.99,
            genre: 'Action role-playing',
            description: 'Battle demons in a dark open world.',
            console_id: xbox?.id,

        },
        {
            title: 'Street Fighter 6',
            developer: 'Capcom',
            releasedate: new Date('2023-06-02'),
            price: 59.99,
            genre: 'Fighting',
            description: 'The next evolution of the Street Fighter series.',
            console_id: ps5?.id,

        },
        {
            title: 'Tekken 8',
            developer: 'Bandai Namco',
            releasedate: new Date('2024-01-26'),
            price: 69.99,
            genre: 'Fighting',
            description: 'The Mishima saga continues.',
            console_id: ps5?.id,

        },
        {
            title: 'Mortal Kombat 1',
            developer: 'NetherRealm Studios',
            releasedate: new Date('2023-09-19'),
            price: 69.99,
            genre: 'Fighting',
            description: 'A reboot of the Mortal Kombat universe.',
            console_id: xbox?.id,

        },
        {
            title: 'Hades',
            developer: 'Supergiant Games',
            releasedate: new Date('2020-09-17'),
            price: 24.99,
            genre: 'Roguelike',
            description: 'Escape the Underworld in this action roguelike.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Celeste',
            developer: 'Matt Makes Games',
            releasedate: new Date('2018-01-25'),
            price: 19.99,
            genre: 'Platformer',
            description: 'Climb a mountain and overcome challenges.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Hollow Knight',
            developer: 'Team Cherry',
            releasedate: new Date('2017-02-24'),
            price: 14.99,
            genre: 'Metroidvania',
            description: 'Explore a vast underground kingdom.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Cuphead',
            developer: 'Studio MDHR',
            releasedate: new Date('2017-09-29'),
            price: 19.99,
            genre: 'Run and gun',
            description: 'A challenging cartoon-style action game.',
            console_id: xbox?.id,

        },
        {
            title: 'The Last of Us Part I',
            developer: 'Naughty Dog',
            releasedate: new Date('2022-09-02'),
            price: 69.99,
            genre: 'Action-adventure',
            description: 'Joel escorts Ellie across a post-apocalyptic USA.',
            console_id: ps5?.id,

        },
        {
            title: 'Ghost of Tsushima',
            developer: 'Sucker Punch Productions',
            releasedate: new Date('2020-07-17'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'A samurai fights to save Tsushima Island.',
            console_id: ps5?.id,

        },
        {
            title: 'Sekiro: Shadows Die Twice',
            developer: 'FromSoftware',
            releasedate: new Date('2019-03-22'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'A shinobi seeks revenge.',
            console_id: xbox?.id,

        },
        {
            title: 'Persona 5 Royal',
            developer: 'Atlus',
            releasedate: new Date('2020-03-31'),
            price: 59.99,
            genre: 'Role-playing',
            description: 'Students explore a supernatural world.',
            console_id: xbox?.id,

        },
        {
            title: 'Final Fantasy XVI',
            developer: 'Square Enix',
            releasedate: new Date('2023-06-22'),
            price: 69.99,
            genre: 'Action role-playing',
            description: 'A dark fantasy story of Eikons.',
            console_id: ps5?.id,

        },
        {
            title: 'Monster Hunter Rise',
            developer: 'Capcom',
            releasedate: new Date('2021-03-26'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'Fast-paced hunting action.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Splatoon 3',
            developer: 'Nintendo EPD',
            releasedate: new Date('2022-09-09'),
            price: 59.99,
            genre: 'Shooter',
            description: 'Ink-based multiplayer battles.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Animal Crossing: New Horizons',
            developer: 'Nintendo',
            releasedate: new Date('2020-03-20'),
            price: 59.99,
            genre: 'Simulation',
            description: 'Build your dream island.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Dark Souls III',
            developer: 'FromSoftware',
            releasedate: new Date('2016-04-12'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'A challenging dark fantasy RPG.',
            console_id: ps5?.id,
        },
        {
            title: 'Bloodborne',
            developer: 'FromSoftware',
            releasedate: new Date('2015-03-24'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'Hunt nightmarish creatures in Yharnam.',
            console_id: ps5?.id,
        },
        {
            title: 'Final Fantasy VII Remake',
            developer: 'Square Enix',
            releasedate: new Date('2020-04-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'A reimagining of the classic Final Fantasy VII.',
            console_id: ps5?.id,
        },
        {
            title: 'Final Fantasy XV',
            developer: 'Square Enix',
            releasedate: new Date('2016-11-29'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'Prince Noctis journeys with his friends.',
            console_id: xbox?.id,
        },
        {
            title: 'Battlefield 2042',
            developer: 'DICE',
            releasedate: new Date('2021-11-19'),
            price: 59.99,
            genre: 'First-person shooter',
            description: 'A near-future multiplayer warfare experience.',
            console_id: xbox?.id,
        },
        {
            title: 'Battlefield V',
            developer: 'DICE',
            releasedate: new Date('2018-11-20'),
            price: 39.99,
            genre: 'First-person shooter',
            description: 'World War II returns to Battlefield.',
            console_id: ps5?.id,
        },
        {
            title: 'Far Cry 6',
            developer: 'Ubisoft Toronto',
            releasedate: new Date('2021-10-07'),
            price: 59.99,
            genre: 'First-person shooter',
            description: 'Fight against a dictator in Yara.',
            console_id: xbox?.id,
        },
        {
            title: 'Far Cry 5',
            developer: 'Ubisoft Montreal',
            releasedate: new Date('2018-03-27'),
            price: 39.99,
            genre: 'First-person shooter',
            description: 'A cult has taken over Hope County.',
            console_id: ps5?.id,
        },
        {
            title: 'Watch Dogs: Legion',
            developer: 'Ubisoft Toronto',
            releasedate: new Date('2020-10-29'),
            price: 49.99,
            genre: 'Action-adventure',
            description: 'Recruit anyone to resist in London.',
            console_id: xbox?.id,
        },
        {
            title: 'Watch Dogs 2',
            developer: 'Ubisoft Montreal',
            releasedate: new Date('2016-11-15'),
            price: 29.99,
            genre: 'Action-adventure',
            description: 'Hack your way through San Francisco.',
            console_id: ps5?.id,
        },
        {
            title: 'Death Stranding',
            developer: 'Kojima Productions',
            releasedate: new Date('2019-11-08'),
            price: 49.99,
            genre: 'Action',
            description: 'Reconnect a fractured society.',
            console_id: ps5?.id,
        },
        {
            title: 'Control',
            developer: 'Remedy Entertainment',
            releasedate: new Date('2019-08-27'),
            price: 39.99,
            genre: 'Action-adventure',
            description: 'A supernatural agency under attack.',
            console_id: xbox?.id,
        },
        {
            title: 'Alan Wake 2',
            developer: 'Remedy Entertainment',
            releasedate: new Date('2023-10-27'),
            price: 59.99,
            genre: 'Survival horror',
            description: 'A psychological horror sequel.',
            console_id: ps5?.id,
        },
        {
            title: 'Doom Eternal',
            developer: 'id Software',
            releasedate: new Date('2020-03-20'),
            price: 39.99,
            genre: 'First-person shooter',
            description: 'Rip and tear through demons.',
            console_id: xbox?.id,
        },
        {
            title: 'Doom',
            developer: 'id Software',
            releasedate: new Date('2016-05-13'),
            price: 19.99,
            genre: 'First-person shooter',
            description: 'A reboot of the classic Doom series.',
            console_id: ps5?.id,
        },
        {
            title: 'Overwatch 2',
            developer: 'Blizzard Entertainment',
            releasedate: new Date('2022-10-04'),
            price: 0.00,
            genre: 'First-person shooter',
            description: 'A team-based hero shooter.',
            console_id: xbox?.id,
        },
        {
            title: 'Apex Legends',
            developer: 'Respawn Entertainment',
            releasedate: new Date('2019-02-04'),
            price: 0.00,
            genre: 'Battle royale',
            description: 'A squad-based battle royale shooter.',
            console_id: xbox?.id,
        },
        {
            title: 'Fortnite',
            developer: 'Epic Games',
            releasedate: new Date('2017-07-25'),
            price: 0.00,
            genre: 'Battle royale',
            description: 'A massively popular online battle royale.',
            console_id: ps5?.id,
        },
        {
            title: 'Rocket League',
            developer: 'Psyonix',
            releasedate: new Date('2015-07-07'),
            price: 0.00,
            genre: 'Sports',
            description: 'Soccer with rocket-powered cars.',
            console_id: xbox?.id,
        },
        {
            title: 'Minecraft',
            developer: 'Mojang Studios',
            releasedate: new Date('2011-11-18'),
            price: 29.99,
            genre: 'Sandbox',
            description: 'Build and explore infinite worlds.',
            console_id: switchOLED?.id,
        }

    ]

    for (const game of gamesData) {
        if (!game.console_id) continue

        await prisma.game.create({
            data: game,
        })
    }

    console.log('🕹️ 10 games seeded')

    console.log('✅ Seed completed successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })