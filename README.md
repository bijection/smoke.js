<p align="center">
  <a href="http://omrelli.ug/smoke.js"/>
    <img src="https://user-images.githubusercontent.com/8824442/55344169-90d5c380-5461-11e9-8acd-0b222e55f55d.png" width='270'/>
  </a>
</p>

## Demo
### [You can play with a live demo here →](http://omrelli.ug/smoke.js/)


## Installation
### Basic
Copy the smoke.js file into your project and use it with a script tag:
```html
<script src="smoke.js"></script>
```
That defines a `SmokeMachine` global that you can use to make smoke (see examples below).

### Package Manager
You can also use yarn or npm:
```
yarn add @bijection/smoke
```
```
npm add @bijection/smoke
```

Thern you can import or require smoke.js like this:
```javascript
import SmokeMachine from '@bijection/smoke'
```
```javascript
var SmokeMachine = require('@bijection/smoke')
```

## Usage
### Short Example
```javascript
var ctx = canvas.getContext('2d')

var party = SmokeMachine(ctx)
party.addSmoke(500,500)
party.start()
```

### Copy-Pastable Example
```html
<canvas id="canvas"></canvas>
<script src="smoke.js"></script>
<script>
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	canvas.width = 1000
	canvas.height = 1000

	var party = SmokeMachine(ctx, [54, 16.8, 18.2])

	party.start() // start animating

	party.addSmoke(500,500,10) // wow we made smoke

	setTimeout(function(){

		party.stop() // stop animating

		party.addSmoke(600,500,100)
		party.addSmoke(500,600,20)

		for(var i=0;i<10;i++){
			party.step(10) // pretend 10 ms pass and rerender
		}

		setTimeout(function(){
			party.start()
		},1000)

	},1000)
</script>
```

## API

### SmokeMachine(context, [r,g,b])
Returns a smoke machine that makes smoke.

* context — the context of the canvas we wanna draw smoke on
* [r,g,b] — (optional) the color we want the smoke to be

```javascript
var party = SmokeMachine(context, [1,5,253])
```

### party.start()

Start Animating!!


### party.stop()

Stop animating :(

### party.addSmoke(x,y,numberofparticles)

* x,y — the coords at which the smoke should be created in the canvas
* numberofparticles — more makes more smoke

### party.step(milliseconds)
redaws the smoke as if `milliseconds` milliseconds have passed
