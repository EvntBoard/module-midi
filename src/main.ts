import "reflect-metadata";

import { LoggerService } from "./service/Logger";
import { ConfigService } from "./service/Config";
import { EasyMidiService } from "./service/EasyMidi";
import { getInstance } from "./utils/IocContainer";

const main = async () => {
  const configService = getInstance(ConfigService);

  const loggerService = getInstance(LoggerService);
  const easyMidiService = getInstance(EasyMidiService);

  loggerService.info(
    `Starting EvntBoard module midi with name "${configService.name}"`
  );

  await easyMidiService.load();
};

main().catch((e) => {
  console.error(e);
});
