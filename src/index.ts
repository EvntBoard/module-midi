import { ConfigLoader } from "./ConfigLoader";
import { MidiConnexion } from "./MidiConnexion";

const main = async () => {
  const configLoader = new ConfigLoader();
  await configLoader.load();

  const conf = configLoader.getConfig();

  if (!Array.isArray(conf.config)) {
    if (!conf.config.name) {
      conf.config.name = "midi";
    }
    new MidiConnexion(conf.host, conf.port, conf.config);
  } else {
    conf.config.forEach((value, index) => {
      if (!value.name) {
        value.name = `midi-${index + 1}`;
      }
      new MidiConnexion(conf.host, conf.port, value);
    });
  }
};

main();
