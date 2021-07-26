import process from 'process'
import { getEvntComClientFromChildProcess, getEvntComServerFromChildProcess } from "evntboard-communicate";
import { Input, getInputs } from 'easymidi';

// parse params
const { name: NAME, customName: CUSTOM_NAME, config: { devices: DEVICES } } = JSON.parse(process.argv[2])
const EMITTER = CUSTOM_NAME || NAME

const evntComClient = getEvntComClientFromChildProcess();
const evntComServer = getEvntComServerFromChildProcess();

// real starting
const inputManager: Record<string, Input> = {};

const load = async () => {
  try {
    DEVICES.forEach((device:string) => {
      const input = new Input(device);
      inputManager[device] = input;

      input.on('noteon', (message) => {
        evntComClient?.newEvent('midi-note-on', message, { emitter: EMITTER })
      });
      input.on('noteoff', (message) => {
        evntComClient?.newEvent('midi-note-off', message, { emitter: EMITTER })
      });
      input.on('poly aftertouch', (message) => {
        evntComClient?.newEvent('midi-poly-aftertouch', message, { emitter: EMITTER })
      });
      input.on('cc', (message) => {
        evntComClient?.newEvent('midi-control-change', message, { emitter: EMITTER })
      });
      input.on('program', (message) => {
        evntComClient?.newEvent('midi-program', message, { emitter: EMITTER })
      });
      input.on('channel aftertouch', (message) => {
        evntComClient?.newEvent('midi-channel-aftertouch', message, { emitter: EMITTER })
      });
      input.on('pitch', (message) => {
        evntComClient?.newEvent('midi-pitch', message, { emitter: EMITTER })
      });
      input.on('position', (message) => {
        evntComClient?.newEvent('midi-position', message, { emitter: EMITTER })
      });
      input.on('mtc', (message) => {
        evntComClient?.newEvent('midi-mtc', message, { emitter: EMITTER })
      });
      input.on('select', (message) => {
        evntComClient?.newEvent('midi-select', message, { emitter: EMITTER })
      });
      input.on('clock', () => {
        evntComClient?.newEvent('midi-clock', null, { emitter: EMITTER })
      });
      input.on('start', () => {
        evntComClient?.newEvent('midi-start', null, { emitter: EMITTER })
      });
      input.on('continue', () => {
        evntComClient?.newEvent('midi-continue', null, { emitter: EMITTER })
      });
      input.on('stop', () => {
        evntComClient?.newEvent('midi-stop', null, { emitter: EMITTER })
      });
      input.on('activesense', () => {
        evntComClient?.newEvent('midi-active-sense', null, { emitter: EMITTER })
      });
      input.on('reset', () => {
        evntComClient?.newEvent('midi-reset', null, { emitter: EMITTER })
      });
      input.on('sysex', (message) => {
        evntComClient?.newEvent('midi-sysex', message, { emitter: EMITTER })
      });
    });
  } catch (e) {
    console.error(e)
    evntComClient?.newEvent('midi-error', null, { emitter: EMITTER })
  }
}

evntComServer.expose('load', load)

evntComServer.expose('getInputs', () => getInputs())