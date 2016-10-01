var smokemachine = function (context, color){
	color = color || [24, 46.8, 48.2]
	var polyfillAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var lastframe;
	var currentparticles = []
	var pendingparticles = []

	var smokeimage = new Image();
	smokeimage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAF/SURBVHjafNNdTxNBFMbx385ut2mhpS1gjRA1JBjjhaJX+hH44n4AvRCvFG1E6kuAUtza7Y4XfVGIem4mmfnPOXPO84zoH5FcX7Mbx6mAYIYZVnmyxa2Irqa2NZmhsUJpoqZUikswIrGr56dLdzRdGJtIXZj5KhGz1Use6UrVNe2bCV4Kxkrn1lWuwgJ8oC7R1PfQFdoOrOkq0VBblq5LBbfk1m3acaI0dGmqb+BUtOixKdoQNWxqykWvjKQqU4lcMgcrXYWo0tLR0nAgc+jQlg0dvd+lz2wbe6ISFT4KHjuya0suVTqxGu+ljh96Cl2Jlp4DiSATjKXzjJVz9wRMbTs18k5L8EWu9N66b2JYKXRuhO8ypbYX9owUioU6VRLnqt91X66vsGfgGY7kBl47niu3BDtqRvY9d9vEsb7Phk68vW4KziR27BnqqEl88kFh8Ifr4tJwiSj3VK4u9caFs2v2XIHzaGsIpgoT0/+Bc0FnouKGpf/yFTJBuLn5awAGz32g+KVMGQAAAABJRU5ErkJggg=="


	var buffer = document.createElement('canvas'),
		bctx = buffer.getContext('2d')
	buffer.width = 20
	buffer.height = 20
	bctx.drawImage(smokeimage,0,0,20,20)
	
	var data = bctx.getImageData(0,0,20,20)
	var d = data.data

	for(var i=0;i<d.length;i+=4){
		d[i]=color[0]
		d[i+1]=color[1]
		d[i+2]=color[2]
	}

	bctx.putImageData(data,0,0)
	smokeimage.src = buffer.toDataURL('img/png')

	var imagewidth = smokeimage.width*5
	var imageheight = smokeimage.height*5

	function particle(x,y,l){
		this.x = x
		this.y = y
		this.age = 0
		this.vx = (Math.random()*8-4)/100
		this.startvy = -(Math.random()*30+10)/100
		this.vy = this.startvy
		this.scale = Math.random()*.5
		this.lifetime = Math.random()*l+l/2
		this.finalscale = 5+this.scale+Math.random()

		this.update = function(deltatime){
			this.x+=this.vx*deltatime
			this.y+=this.vy*deltatime
			var frac = Math.pow((this.age)/this.lifetime,.5)
			this.vy = (1-frac)*this.startvy
			this.age+=deltatime
			this.scale=frac*this.finalscale
		}

		this.draw = function(){
			context.globalAlpha = (1-Math.abs(1-2*(this.age)/this.lifetime))/8
			var off = this.scale*imagewidth/2
			var xmin = this.x-off
			var xmax = xmin+this.scale*imageheight
			var ymin = this.y-off
			var ymax = ymin+this.scale*imageheight
			context.drawImage(smokeimage, xmin, ymin, xmax-xmin, ymax-ymin)
		}
	}


	function addparticles(x,y,n,lifetime){
		lifetime = lifetime || 4000
		n = n || 10
        if(n < 1) return Math.random() <= n && pendingparticles.push(new particle(x,y,lifetime));
		for (var i = 0; i < n; i++) {
			pendingparticles.push(new particle(x,y,lifetime))
		};
	}

	function updateanddrawparticles(deltatime){
		context.clearRect(0, 0, canvas.width, canvas.height);	
		deltatime = deltatime || 16
		var newparticles = []
		currentparticles = currentparticles.concat(pendingparticles)
		pendingparticles = []

		currentparticles.forEach(function(p){
			p.update(deltatime)
			if (p.age<p.lifetime){
				p.draw()
				newparticles.push(p)
			}
		})
		currentparticles = newparticles
	}

	function frame(time){
		if(running){
			var deltat = time-lastframe
			lastframe = time;

			updateanddrawparticles(deltat)

			polyfillAnimFrame(frame)			
		}
	}

	var running = false
	function start(){
		running = true
		polyfillAnimFrame(function(time){
			lastframe = time
			polyfillAnimFrame(frame)
		})			
	}

	function stop(){
		running = false
	}

	return {
		start:start,
		stop:stop,
		step: updateanddrawparticles,
		addsmoke: addparticles
	}

}