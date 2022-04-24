import {delay, inject, injectable} from "tsyringe";
import { Input, getInputs } from "easymidi";

import { EventType } from "../type/Event";
import { LoggerService } from "./Logger";
import { ConfigService } from "./Config";
import {EvntBoardService} from "./EvntBoard";

@injectable()
export class EasyMidiService {
  private configService: ConfigService;
  private loggerService: LoggerService;
  private evntBoardService: EvntBoardService;
  private input: Input;

  constructor(
    @inject(ConfigService) configService: ConfigService,
    @inject(LoggerService) loggerService: LoggerService,
    @inject(delay(() => EvntBoardService)) evntBoardService: EvntBoardService
  ) {
    this.configService = configService;
    this.loggerService = loggerService;
    this.evntBoardService = evntBoardService;
  }
  
  async load() {
    this.evntBoardService.rpc.notify("event.new", {
      name: EventType.LIST,
      payload: {
        devices: getInputs()
      },
      emitter: this.configService.name
    });

    try {
      if (!this.configService.midiDevice) {
        this.loggerService.error("No device set midi module ...");
        throw new Error("No device set midi module ...");
      }

      this.evntBoardService.rpc.notify("event.new", {
        name: EventType.LOAD,
        emitter: this.configService.name
      });

      this.input = new Input(this.configService.midiDevice);

      this.input.on("noteon", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.NOTEON,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("noteoff", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.NOTEOFF,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("poly aftertouch", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.POLY_AFTERTOUCH,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("cc", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.CONTROL_CHANGE,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("program", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.PROGRAM,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("channel aftertouch", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.CHANNEL_AFTERTOUCH,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("pitch", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.PITCH,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("position", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.POSITION,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("mtc", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.MTC,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("select", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.SELECT,
          payload: message,
          emitter: this.configService.name
        });
      });

      this.input.on("clock", () => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.CLOCK,
          emitter: this.configService.name
        });
      });

      this.input.on("start", () => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.START,
          emitter: this.configService.name
        });
      });

      this.input.on("continue", () => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.CONTINUE,
          emitter: this.configService.name
        });
      });

      this.input.on("stop", () => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.STOP,
          emitter: this.configService.name
        });
      });

      this.input.on("activesense", () => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.ACTIVE_SENSE,
          emitter: this.configService.name
        });
      });

      this.input.on("reset", () => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.RESET,
          emitter: this.configService.name
        });
      });

      this.input.on("sysex", (message) => {
        this.evntBoardService.rpc.notify("event.new", {
          name: EventType.SYSEX,
          payload: message,
          emitter: this.configService.name
        });
      });
    } catch (e) {
      console.error(e);
      this.evntBoardService.rpc.notify("event.new", {
        name: EventType.ERROR,
        payload: e,
        emitter: this.configService.name
      });
    }
  }

  async unload() {
    this.input = null;
  }
}
