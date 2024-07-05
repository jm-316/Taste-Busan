import { PrismaClient } from "@prisma/client";
import * as data from "../src/data/store_data.json";

const prisma = new PrismaClient();

async function seedData() {
  data?.["item"]?.map(async (store) => {
    const storeData = {
      phone: store?.cntct_tel,
      address: store?.addr1,
      lat: store?.lat,
      lng: store?.lng,
      name: store?.main_title,
      menu: typeof store?.rprsntv_menu === "string" ? store.rprsntv_menu : null,
      time: store?.usage_day_week_and_time,
      homepage:
        typeof store?.homepage_url === "string" ? store.homepage_url : null,
    };

    const res = await prisma.store.create({
      data: storeData,
    });
    console.log(res);
  });
}

async function main() {
  await seedData();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
