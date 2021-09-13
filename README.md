# Midi for EvntBoard

## Config

```json5
{
    "name": "midi", // if no name is provided default value is "midi"
    "config": {
      "device": "YOUR DEVICE NAME", 
      "list_device": true, // true or false
    }
}
```

## Multiple config

Name property should be different :)
Otherwise you can't filter events from the specific midi source !

```json5
[
  {
    "name": "midi-mini-32",
    "config": {
      "device": "YOUR DEVICE NAME",
      "list_device": true, // true or false
    }
  },
  {
    "name": "midi-keystation-m12",
    "config": {
      "device": "YOUR DEVICE NAME",
      "list_device": true, // true or false
    }
  }
]
```
