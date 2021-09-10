require("dotenv").config();
import { EvntComNode } from "evntcom-js/dist/node";
import { Input, getInputs } from 'easymidi';

const NAME: string = process.env.EVNTBOARD_NAME || "midi";
const HOST: string = process.env.EVNTBOARD_HOST || "localhost";
const PORT: number = process.env.EVNTBOARD_PORT ? parseInt(process.env.EVNTBOARD_PORT) : 5001;
const DEVICE: string = process.env.EVNTBOARD_CONFIG_DEVICE;
const LIST_DEVICE: boolean = process.env.EVNTBOARD_CONFIG_LIST_DEVICE === "true";

const evntCom = new EvntComNode({
  name: NAME,
  port: PORT,
  host: HOST,
})

let input: Input;

evntCom.onOpen = async () => {
  await evntCom.callMethod("newEvent", ['midi-load', null, { emitter: NAME }])
  if (LIST_DEVICE) {
    console.log('Available midi devices', getInputs())
  }
  try {
    if (!DEVICE) {
      throw new Error('No device set midi module ...')
    }

    input = new Input(DEVICE);
    input.on('noteon', (message) => {
      evntCom.callMethod("newEvent", ['midi-note-on', message, { emitter: NAME }])
    });
    input.on('noteoff', (message) => {
      evntCom.callMethod("newEvent", ['midi-note-off', message, { emitter: NAME }])
    });
    input.on('poly aftertouch', (message) => {
      evntCom.callMethod("newEvent", ['midi-poly-aftertouch', message, { emitter: NAME }])
    });
    input.on('cc', (message) => {
      evntCom.callMethod("newEvent", ['midi-control-change', message, { emitter: NAME }])
    });
    input.on('program', (message) => {
      evntCom.callMethod("newEvent", ['midi-program', message, { emitter: NAME }])
    });
    input.on('channel aftertouch', (message) => {
      evntCom.callMethod("newEvent", ['midi-channel-aftertouch', message, { emitter: NAME }])
    });
    input.on('pitch', (message) => {
      evntCom.callMethod("newEvent", ['midi-pitch', message, { emitter: NAME }])
    });
    input.on('position', (message) => {
      evntCom.callMethod("newEvent", ['midi-position', message, { emitter: NAME }])
    });
    input.on('mtc', (message) => {
      evntCom.callMethod("newEvent", ['midi-mtc', message, { emitter: NAME }])
    });
    input.on('select', (message) => {
      evntCom.callMethod("newEvent", ['midi-select', message, { emitter: NAME }])
    });
    input.on('clock', () => {
      evntCom.callMethod("newEvent", ['midi-clock', null, { emitter: NAME }])
    });
    input.on('start', () => {
      evntCom.callMethod("newEvent", ['midi-start', null, { emitter: NAME }])
    });
    input.on('continue', () => {
      evntCom.callMethod("newEvent", ['midi-continue', null, { emitter: NAME }])
    });
    input.on('stop', () => {
      evntCom.callMethod("newEvent", ['midi-stop', null, { emitter: NAME }])
    });
    input.on('activesense', () => {
      evntCom.callMethod("newEvent", ['midi-active-sense', null, { emitter: NAME }])
    });
    input.on('reset', () => {
      evntCom.callMethod("newEvent", ['midi-reset', null, { emitter: NAME }])
    });
    input.on('sysex', (message) => {
      evntCom.callMethod("newEvent", ['midi-sysex', message, { emitter: NAME }])
    });
  } catch (e) {
    console.error(e)
    await evntCom.callMethod("newEvent", ['midi-error', e, {emitter: NAME}])
  }
}

evntCom.expose('getInputs', async () => getInputs())