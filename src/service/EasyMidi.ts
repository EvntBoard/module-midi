import { inject, injectable } from "tsyringe";
import { Input, getInputs } from "easymidi";

import { EventType } from "../type/Event";
import { LoggerService } from "./Logger";
import { ConfigService } from "./Config";
import axios from "axios";

@injectable()
export class EasyMidiService {
  private configService: ConfigService;
  private loggerService: LoggerService;

  constructor(
    @inject(ConfigService) configService: ConfigService,
    @inject(LoggerService) loggerService: LoggerService,
  ) {
    this.configService = configService;
    this.loggerService = loggerService;
  }

  async load() {
    this.sendEvent({
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

      this.sendEvent({
        name: EventType.LOAD,
        emitter: this.configService.name
      });

      const input = new Input(this.configService.midiDevice);

      input.on("noteon", (message) => {
        this.sendEvent({
          name: EventType.NOTEON,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("noteoff", (message) => {
        this.sendEvent({
          name: EventType.NOTEOFF,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("poly aftertouch", (message) => {
        this.sendEvent({
          name: EventType.POLY_AFTERTOUCH,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("cc", (message) => {
        this.sendEvent({
          name: EventType.CONTROL_CHANGE,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("program", (message) => {
        this.sendEvent({
          name: EventType.PROGRAM,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("channel aftertouch", (message) => {
        this.sendEvent({
          name: EventType.CHANNEL_AFTERTOUCH,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("pitch", (message) => {
        this.sendEvent({
          name: EventType.PITCH,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("position", (message) => {
        this.sendEvent({
          name: EventType.POSITION,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("mtc", (message) => {
        this.sendEvent({
          name: EventType.MTC,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("select", (message) => {
        this.sendEvent({
          name: EventType.SELECT,
          payload: message,
          emitter: this.configService.name
        });
      });

      input.on("clock", () => {
        this.sendEvent({
          name: EventType.CLOCK,
          emitter: this.configService.name
        });
      });

      input.on("start", () => {
        this.sendEvent({
          name: EventType.START,
          emitter: this.configService.name
        });
      });

      input.on("continue", () => {
        this.sendEvent({
          name: EventType.CONTINUE,
          emitter: this.configService.name
        });
      });

      input.on("stop", () => {
        this.sendEvent({
          name: EventType.STOP,
          emitter: this.configService.name
        });
      });

      input.on("activesense", () => {
        this.sendEvent({
          name: EventType.ACTIVE_SENSE,
          emitter: this.configService.name
        });
      });

      input.on("reset", () => {
        this.sendEvent({
          name: EventType.RESET,
          emitter: this.configService.name
        });
      });

      input.on("sysex", (message) => {
        this.sendEvent({
          name: EventType.SYSEX,
          payload: message,
          emitter: this.configService.name
        });
      });
    } catch (e) {
      console.error(e);
      this.sendEvent({
        name: EventType.ERROR,
        payload: e,
        emitter: this.configService.name
      });
    }
  }

  private sendEvent = (event: any) => {
    axios.post(`http://${this.configService.host}:${this.configService.port}/api/event/new`, event)
  }
}
