import process from 'process'
import { getEvntComClientFromChildProcess, getEvntComServerFromChildProcess } from "evntboard-communicate";
import { Input } from 'easymidi';

// parse params
const { name: NAME, customName: CUSTOM_NAME, config: { devices: DEVICES } } = JSON.parse(process.argv[2])
const EMITTER = CUSTOM_NAME || NAME

const evntComClient = getEvntComClientFromChildProcess();
const evntComServer = getEvntComServerFromChildProcess();

// real starting
const inputManager = {};

const load = async () => {
  try {
    DEVICES.forEach((device) => {
      const input = new Input(device);
      inputManager[device] =

      input.on('noteon', (message) => {
        evntComClient?.newEvent('midi-noteon', message, { emitter: EMITTER })
      });
      // input.on('noteoff', (message) => {
      //   console.log('noteoff', message);
      // });
      // input.on('poly aftertouch', (message) => {
      //   console.log('poly aftertouch', message);
      // });
      // input.on('cc', (message) => {
      //   console.log('cc', message);
      // });
      // input.on('program', (message) => {
      //   console.log('program', message);
      // });
      // input.on('channel aftertouch', (message) => {
      //   console.log('channel aftertouch', message);
      // });
      // input.on('pitch', (message) => {
      //   console.log('pitch', message);
      // });
      // input.on('position', (message) => {
      //   console.log('position', message);
      // });
      // input.on('mtc', (message) => {
      //   console.log('mtc', message);
      // });
      // input.on('select', (message) => {
      //   console.log('select', message);
      // });
      // input.on('clock', (message) => {
      //   console.log('clock', message);
      // });
      // input.on('start', (message) => {
      //   console.log('start', message);
      // });
      // input.on('continue', (message) => {
      //   console.log('continue', message);
      // });
      // input.on('stop', (message) => {
      //   console.log('stop', message);
      // });
      // input.on('activesense', (message) => {
      //   console.log('activesense', message);
      // });
      // input.on('reset', (message) => {
      //   console.log('reset', message);
      // });
      // input.on('sysex', (message) => {
      //   console.log('sysex', message);
      // });
    });
  } catch (e) {
    console.error(e)
    evntComClient?.newEvent('midi-error', null, { emitter: EMITTER })
  }
}

evntComServer.expose('load', load)