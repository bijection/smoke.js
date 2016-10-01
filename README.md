smoke.js
========
## tl;dr
```javascript
var ctx = canvas.getContext('2d')

var party = smokemachine(ctx)
party.addsmoke(500,500)
party.start()
```

## DEMO

### [You can play with a live demo here.](http://omrelli.ug/smoke.js/)

## you'll probably copy paste this
```html
    <canvas id="canvas"></canvas>
<script src="smoke.js"></script>
<script>
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	canvas.width = 1000
	canvas.height = 1000

	var party = smokemachine(ctx, [54, 16.8, 18.2])

	party.start() // start animating

	party.addsmoke(500,500,10) // wow we made smoke

	setTimeout(function(){

		party.stop() // stop animating

		party.addsmoke(600,500,100)
		party.addsmoke(500,600,20)

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


### smokemachine(context, [r,g,b])
Returns a smoke machine that makes smoke.

* context — the context of the canvas we wanna draw smoke on
* [r,g,b] — (optional) the color we want the smoke to be

```javascript
var party = smokemachine(context, [1,5,253])
```

### party.start()

Start Animating!!


### party.stop()

Stop animating :(

### party.addsmoke(x,y,numberofparticles)

* x,y — the coords at which the smoke should be created in the canvas
* numberofparticles — more makes more smoke

### party.step(milliseconds)
redaws the smoke as if `milliseconds` milliseconds have passed
