## RPGen

This module is set of tools for RPG games. It contains: 

- A random table generator
- A dice roller generator

### Installation

You can install it as a node module

```sh
$> npm install -S @guumaster/rpgen
```

Or add it to your HTML directly from `unpkg` CDN: 
```html
<script src="//unpkg.com/@guumaster/rpgen"></script>
```
And then is accesible globally as `rpgen` object.


### Usage 


#### Basic die roller

```js
const rpgen = require('@guumaster/rpgen')
const myRoller = rpgen.roller.create('best 3 of 4d6+1')

console.log(myRoller()) // output: 16
```

[Live demo (with VueJS)](https://jsfiddle.net/guumaster/y261L4qm/)


#### Multi dice roller

```js
const rpgen = require('@guumaster/rpgen')
const myRoller = rpgen.roller.create('best 3 of 4d6+1', { repeat: 6 })

console.log(myRoller()) // output: [16, 13, 12, 14, 13, 15]
```

[Live demo (with VueJS)](https://jsfiddle.net/guumaster/y261L4qm/latest/)


### Basic random table

```js
const myGenerator = rpgen.generator.create(`
;@tpl|main
- [lines]
- [roll]

;lines
line 1 is random
line 2 is awesome
line 3 is great

;roll
1d20 roll: [1d20]
`)
  
console.log(generator.generate()) 
// output: 
// - line 2 is awesome
// - 1d20 roll: 14
```

[Live demo (with VueJS)](https://jsfiddle.net/guumaster/w6eqxvp8/latest)


### TODO

- [ ] Add more complex table generator examples
- [ ] Allow combination of rolls (ex: 4d6 + 3d8)
- [ ] Improve dev workflow with a better webpack config
- [ ] Add filter to convert from number to words (ex: 12 => twelve, 100 => one hundred, etc)
- [ ] Maybe migrate to [nearley grammar parser](https://github.com/Hardmath123/nearley)


### Previous work

This is the successor of my other unfinished projects:
 - [rpg-generator-engine](https://github.com/guumaster/rpg-generator-engine)
 - [yadr (yet another dice roller)](https://github.com/guumaster/yadr)

