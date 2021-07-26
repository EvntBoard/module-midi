var easymidi = require('easymidi');

var input = new easymidi.Input('Keystation Mini 32:Keystation Mini 32 MIDI 1 28:0');


input.on('noteon', (message) => {
  console.log('noteon', message);
});
input.on('noteoff', (message) => {
  console.log('noteoff', message);
});
input.on('poly aftertouch', (message) => {
  console.log('poly aftertouch', message);
});
input.on('cc', (message) => {
  console.log('cc', message);
});
input.on('program', (message) => {
  console.log('program', message);
});
input.on('channel aftertouch', (message) => {
  console.log('channel aftertouch', message);
});
input.on('pitch', (message) => {
  console.log('pitch', message);
});
input.on('position', (message) => {
  console.log('position', message);
});
input.on('mtc', (message) => {
  console.log('mtc', message);
});
input.on('select', (message) => {
  console.log('select', message);
});
input.on('clock', (message) => {
  console.log('clock', message);
});
input.on('start', (message) => {
  console.log('start', message);
});
input.on('continue', (message) => {
  console.log('continue', message);
});
input.on('stop', (message) => {
  console.log('stop', message);
});
input.on('activesense', (message) => {
  console.log('activesense', message);
});
input.on('reset', (message) => {
  console.log('reset', message);
});
input.on('sysex', (message) => {
  console.log('sysex', message);
});

var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();

console.log({
  inputs,
  outputs,
})