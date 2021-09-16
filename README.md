# Midi for EvntBoard

## Config

```json5
{
    "host": "localhost", // EvntBoard HOST (optionnal)
    "port": 5001, // Evntboard PORT (optionnal)
    "config": {
      "name": "midi", // if no name is provided default value is "midi"
      "device": "YOUR DEVICE NAME", 
      "listDevice": true // true or false
    }
}
```

## Multiple config

Name property should be different :)

```json5
{
  "host": "localhost", // EvntBoard HOST (optionnal)
  "port": 5001, // Evntboard PORT (optionnal)
  "config": [
    {
      "name": "midi-mini-32", // if no name is provided default value is "midi-1"
      "device": "YOUR DEVICE NAME",
      "listDevice": false // true or false
    },{
      "name": "midi-keystation-m12", // if no name is provided default value is "midi-2"
      "device": "YOUR DEVICE NAME",
      "listDevice": false // true or false
    }
  ]
}
```
