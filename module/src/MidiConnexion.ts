import { EvntCom } from "@evntboard/evntcom-node";
import { Input, getInputs } from "easymidi";
import { IConfigItem } from "./ConfigLoader";

export class MidiConnexion {
  private evntCom: EvntCom;
  private config: IConfigItem;

  constructor(
    evntBoardHost: string,
    evntBoardPort: number,
    config: IConfigItem
  ) {
    this.config = config;
    this.evntCom = new EvntCom({
      name: config.name,
      port: evntBoardPort,
      host: evntBoardHost,
    });

    this.evntCom.on('open', () => {
      this.evntCom.notify("newEvent", [
        "midi-load",
        null,
        { emitter: this.config.name },
      ]);
      if (this.config.listDevice) {
        console.log("Available midi devices", getInputs());
      }
      try {
        if (!this.config.device) {
          throw new Error("No device set midi module ...");
        }

        const input = new Input(this.config.device);
        input.on("noteon", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-note-on",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("noteoff", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-note-off",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("poly aftertouch", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-poly-aftertouch",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("cc", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-control-change",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("program", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-program",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("channel aftertouch", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-channel-aftertouch",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("pitch", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-pitch",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("position", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-position",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("mtc", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-mtc",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("select", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-select",
            message,
            { emitter: this.config.name },
          ]);
        });
        input.on("clock", () => {
          this.evntCom.notify("newEvent", [
            "midi-clock",
            null,
            { emitter: this.config.name },
          ]);
        });
        input.on("start", () => {
          this.evntCom.notify("newEvent", [
            "midi-start",
            null,
            { emitter: this.config.name },
          ]);
        });
        input.on("continue", () => {
          this.evntCom.notify("newEvent", [
            "midi-continue",
            null,
            { emitter: this.config.name },
          ]);
        });
        input.on("stop", () => {
          this.evntCom.notify("newEvent", [
            "midi-stop",
            null,
            { emitter: this.config.name },
          ]);
        });
        input.on("activesense", () => {
          this.evntCom.notify("newEvent", [
            "midi-active-sense",
            null,
            { emitter: this.config.name },
          ]);
        });
        input.on("reset", () => {
          this.evntCom.notify("newEvent", [
            "midi-reset",
            null,
            { emitter: this.config.name },
          ]);
        });
        input.on("sysex", (message) => {
          this.evntCom.notify("newEvent", [
            "midi-sysex",
            message,
            { emitter: this.config.name },
          ]);
        });
      } catch (e) {
        console.error(e);
        this.evntCom.notify("newEvent", [
          "midi-error",
          e,
          { emitter: this.config.name },
        ]);
      }
    });

    this.evntCom.expose("getInputs", async () => getInputs());

    this.evntCom.connect()
  }
}
