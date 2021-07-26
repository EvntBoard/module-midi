const midi = require('midi');

const input = new midi.Input();
for (let i = 0; i < input.getPortCount(); i++) {
  console.log(i, input.getPortName(i));
}

input.openPort(2);

// Configure a callback.
input.on('message', (deltaTime, message) => {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  console.log(`m: ${message} d: ${deltaTime}`);
});
