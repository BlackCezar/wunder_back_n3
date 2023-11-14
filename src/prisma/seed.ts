import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {

    const region = await prisma.region.upsert({
        where: { name: "BY" },
        update: {},
        create: {
            name: "BY",
            contacts: {
                create: {
                    companyName: "-",
                    accountNumber: "-",
                    bankName: "-",
                    BIC: "-",
                    companyAddress: "-",
                    companyTaxNumber: "-",
                    contactName: "Тестовое имя",
                },
            },
            sign: "",
            isActive: true,
        },
    });

    const BYSettings = await prisma.settings.upsert({
        where: { id: 1 },
        update: { projectId: parseInt(process.env.PROJECT_ID) },
        create: {
            regionId: region.id,
            emailFrom: "Platform Wunder",
            projectId: parseInt(process.env.PROJECT_ID),
        },
    });

    const secret = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const superAdmin = await prisma.user.upsert({
        where: { email: "adminWunder@gmail.com" },
        update: {},
        create: {
            email: "adminWunder@gmail.com",
            secret,
            role: "ADMIN",
            admin: {
                create: {
                    name: "Super Admin",
                },
            },
        },
    });

    const googleAds = await prisma.system.upsert({
        where: { name: "Google Ads" },
        update: {},
        create: {
            name: "Google Ads",
        },
    });

    const YandexDirect = await prisma.system.upsert({
        where: { name: "Яндекс Директ" },
        update: {},
        create: {
            name: "Яндекс Директ",
        },
    });

    const Twitter = await prisma.system.upsert({
        where: { name: "Twitter" },
        update: {},
        create: {
            name: "Twitter",
        },
    });

    const YandexNav = await prisma.system.upsert({
        where: { name: "Яндекс Навигатор" },
        update: {},
        create: {
            name: "Яндекс Навигатор",
        },
    });

    const TikTok = await prisma.system.upsert({
        where: { name: "TikTok" },
        update: {},
        create: {
            name: "TikTok",
        },
    });

    const Facebook = await prisma.system.upsert({
        where: { name: "Facebook" },
        update: {},
        create: {
            name: "Facebook",
        },
    });

    const MyTarget = await prisma.system.upsert({
        where: { name: "MyTarget" },
        update: {},
        create: {
            name: "MyTarget",
        },
    });

    const DV360 = await prisma.system.upsert({
        where: { name: "DV360" },
        update: {},
        create: {
            name: "DV360",
        },
    });

    const VK = await prisma.system.upsert({
        where: { name: "VK" },
        update: {},
        create: {
            name: "VK",
        },
    });

    const OK = await prisma.system.upsert({
        where: { name: "OK" },
        update: {},
        create: {
            name: "OK",
        },
    });

    const linkedIn = await prisma.system.upsert({
        where: { name: "LinkedIn" },
        update: {},
        create: {
            name: "LinkedIn",
        },
    });

    const YandexLook = await prisma.system.upsert({
        where: { name: "Яндекс Взгляд" },
        update: {},
        create: {
            name: "Яндекс Взгляд",
        },
    });
    await prisma.system.upsert({
        where: { name: "Apple Search" },
        update: {},
        create: {
            name: "Apple Search",
        },
    });
    await prisma.system.upsert({
        where: { name: "Telegram" },
        update: {},
        create: {
            name: "Telegram",
        },
    });

    try {
        await prisma.system.delete({
            where: { name: "Яндекс Дзен" },
        });
    } catch (err) {
        console.log("No delete");
    }

    const systems = await prisma.system.findMany();
    const regions = await prisma.region.findMany();
    const customers = await prisma.customer.findMany({
        include: {
            contracts: true,
        },
    });

    for (const system of systems) {
        for (const region of regions) {
            const regionId = region.id;
            const systemName = system.name;
            await prisma.systemSettings.upsert({
                where: { regionId_systemName: { regionId, systemName } },
                update: {},
                create: {
                    system: { connect: { id: system.id } },
                    region: { connect: { id: region.id } },
                },
            });

            if (system.name === "Twitter") {
                for (const customer of customers) {
                    for (const contract of customer.contracts) {
                        await prisma.customerToSystemSettings.upsert({
                            where: {
                                contractId_systemName: {
                                    systemName: "Twitter",
                                    contractId: contract.id,
                                },
                            },
                            update: {},
                            create: {
                                customerId: customer.id,
                                contractId: contract.id,
                                systemName: "Twitter",
                            },
                        });
                    }
                }
            }

            if (system.name === "Apple Search") {
                for (const customer of customers) {
                    console.log(customer.contracts);
                    for (const contract of customer.contracts) {
                        await prisma.customerToSystemSettings.upsert({
                            where: {
                                contractId_systemName: {
                                    systemName: system.name,
                                    contractId: contract.id,
                                },
                            },
                            update: {},
                            create: {
                                Contract: {
                                    connect: {
                                        id: contract.id,
                                    },
                                },
                                customer: {
                                    connect: {
                                        id: customer.id,
                                    },
                                },
                                isActive: false,
                                minSum: 0,
                                system: {
                                    connect: {
                                        name: system.name,
                                    },
                                },
                            },
                        });
                    }
                }
            }

            if (system.name === "Telegram") {
                for (const customer of customers) {
                    for (const contract of customer.contracts) {
                        await prisma.customerToSystemSettings.upsert({
                            where: {
                                contractId_systemName: {
                                    systemName: system.name,
                                    contractId: contract.id,
                                },
                            },
                            update: {},
                            create: {
                                Contract: {
                                    connect: {
                                        id: contract.id,
                                    },
                                },
                                customer: {
                                    connect: {
                                        id: customer.id,
                                    },
                                },
                                isActive: false,
                                minSum: 0,
                                system: {
                                    connect: {
                                        name: system.name,
                                    },
                                },
                            },
                        });
                    }
                }
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
