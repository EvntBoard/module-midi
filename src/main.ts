import "reflect-metadata";

import { LoggerService } from "./service/Logger";
import { ConfigService } from "./service/Config";
import { getInstance } from "./utils/IocContainer";
import {EvntBoardService} from "./service/EvntBoard";

const main = async () => {
  const configService = getInstance(ConfigService);

  const loggerService = getInstance(LoggerService);
  const evntBoardService = getInstance(EvntBoardService);

  loggerService.info(
    `Starting EvntBoard module midi with name "${configService.name}"`
  );

  await evntBoardService.load();
};

main().catch((e) => {
  console.error(e);
});
