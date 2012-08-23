/*
 * 
 * from http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
 * from http://lodev.org/cgtutor/filtering.html
 * modify by ggoiya@gmail.com
 * definition : �̹��� ���͸�
 * date : 2012. 08. 14
 */
var Filters = {
	filterImage : function(filter, pixels, var_args) {
		var args = [ pixels ];
		for ( var i = 2; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		return filter.apply(this, args);
	},
	grayscale : function(pixels, args) {
		var d = pixels.data;
		for ( var i = 0; i < d.length; i += 4) {
			var r = d[i + 0];
			var g = d[i + 1];
			var b = d[i + 2];
			// CIE luminance for the RGB
			// The human eye is bad at seeing red and blue, so we de-emphasize
			// them.
			var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
			d[i] = d[i + 1] = d[i + 2] = v;
		}
		return pixels;
	},
	brightness : function(pixels, adjustment) {
		adjustment = 60;
		var d = pixels.data;
		for ( var i = 0; i < d.length; i += 4) {
			d[i + 0] += adjustment;
			d[i + 1] += adjustment;
			d[i + 2] += adjustment;
		}
		return pixels;
	},
	threshold : function(pixels, threshold) {
		threshold = 128;
		var d = pixels.data;
		for ( var i = 0; i < d.length; i += 4) {
			var r = d[i + 0];
			var g = d[i + 1];
			var b = d[i + 2];
			var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255
					: 0;
			d[i + 0] = d[i + 1] = d[i + 2] = v;
		}
		return pixels;
	},
	convolute : function(pixels, tmpPixels, kernel, factor, bias) {
		var d = pixels.data;
		var tmpd = tmpPixels.data;
		var w = pixels.width;
		var h = pixels.height;
		var kernelWidth = kernelHeight = kernel.length;
		var idx;
		for ( var x = 0; x < w; x++) {
			for ( var y = 0; y < h; y++) {
				var r = g = b = 0;
				for ( var kernelX = 0; kernelX < kernelWidth; filterX++) {
					for ( var kernelY = 0; kernelY < kernelHeight; kernelY++) {
						var imageX = Math.round((x - kernelWidth / 2 + kernelX + w) % w);
						var imageY = Math.round((y - kernelHeight / 2 + kernelY + h) % h);
						idx = (imageX + imageY * w) * 4;
						r += d[idx + 0] * kernel[kernelX][kernelY];
						g += d[idx + 1] * kernel[kernelX][kernelY];
						b += d[idx + 2] * kernel[kernelX][kernelY];
					}
				}
				idx = (x + y * w) * 4;
				tmpd[idx + 0] = Math.min(Math.max(parseInt(factor * r + bias, 10), 0), 255);
				tmpd[idx + 1] = Math.min(Math.max(parseInt(factor * g + bias, 10), 0), 255);
				tmpd[idx + 2] = Math.min(Math.max(parseInt(factor * b + bias, 10), 0), 255);
			}
		}
		return tmpd;
	}
};
var FilterData = {
	_c:null,
	_ctx:null,
	setCanvas : function(id){
		if(_c) return;
		_c = document.getElementById(id);
	},
	getCanvas : function(){
		return _c;
	},
	setFilter : function(){
		
	}
};

var KernalData = {
		softBlur : {
			factor : 1.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[0.0, 0.2,  0.0],
				[0.2, 0.2,  0.2],
				[0.0, 0.2,  0.0]
			]
		},
		blur : {
			factor : 1.0 / 13.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[0, 0, 1, 0, 0],
			 	[0, 1, 1, 1, 0],
			 	[1, 1, 1, 1, 1],
			 	[0, 1, 1, 1, 0],
			 	[0, 0, 1, 0, 0]
			]
		},
		motionBlur : {
			factor : 1.0 / 9.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[1, 0, 0, 0, 0, 0, 0, 0, 0],
			 	[0, 1, 0, 0, 0, 0, 0, 0, 0],
			 	[0, 0, 1, 0, 0, 0, 0, 0, 0],
			 	[0, 0, 0, 1, 0, 0, 0, 0, 0],
			 	[0, 0, 0, 0, 1, 0, 0, 0, 0],
			 	[0, 0, 0, 0, 0, 1, 0, 0, 0],
			 	[0, 0, 0, 0, 0, 0, 1, 0, 0],
			 	[0, 0, 0, 0, 0, 0, 0, 1, 0],
			 	[0, 0, 0, 0, 0, 0, 0, 0, 1]
			]
		},
		edgesHorizontal : {
			factor : 1.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[0,  0,  0,  0,  0],
			 	[0,  0,  0,  0,  0],
			 	[-1, -1,  2,  0,  0],
			 	[0,  0,  0,  0,  0],
			 	[0,  0,  0,  0,  0]
			]
		},
		edgesVertical : {
			factor : 1.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[0,  0, -1,  0,  0],
			 	[0,  0, -1,  0,  0],
			 	[0,  0,  4,  0,  0],
			 	[0,  0, -1,  0,  0],
			 	[0,  0, -1,  0,  0]
			]
		},
		edges : {
			factor : 1.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[-1,  0,  0,  0,  0],
			 	[0, -2,  0,  0,  0],
			 	[0,  0,  6,  0,  0],
			 	[0,  0,  0, -2,  0],
			 	[0,  0,  0,  0, -1]
			]
		},
		edgesSharpen : {
			factor : 1.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[-1, -1, -1],
			 	[-1,  8, -1],
			 	[-1, -1, -1]
			]
		},
		sharpen : {
			factor : 1.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[-1, -1, -1],
			 	[-1,  9, -1],
			 	[-1, -1, -1]
			]
		},
		softSharpen : {
			factor : 1.0 / 8.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[-1, -1, -1, -1, -1],
			 	[-1,  2,  2,  2, -1],
			 	[-1,  2,  8,  2, -1],
			 	[-1,  2,  2,  2, -1],
			 	[-1, -1, -1, -1, -1]
			]
		},
		sharpenEdges : {
			factor : 1.0, 
			bias : 0.0, 
			kernel : 
			[
			 	[1,  1,  1],
			 	[1, -7,  1],
			 	[1,  1,  1]
			]
		},
		emboss : {
			factor : 1.0, 
			bias : 128.0, 
			kernel : 
			[
			 	[-1, -1,  0],
			 	[-1,  0,  1],
			 	[0,  1,  1]
			]
		},
		strongEmboss : {
			factor : 1.0, 
			bias : 128.0, 
			kernel : 
			[
			 	[-1, -1, -1, -1,  0],
			 	[-1, -1, -1,  0,  1],
			 	[-1, -1,  0,  1,  1],
			 	[-1,  0,  1,  1,  1],
			 	[0,  1,  1,  1,  1]
			]
		}	
};