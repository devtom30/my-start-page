/*  Copyright (C) 2012-2014  Kurt Milam - http://xioup.com | Source: https://gist.github.com/1868955
 *   
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

// Returns true if range1 and 2 are overlapping. If one of the two ranges is not an Array, it tests if it is inside the other range.

function overlap(range1,range2) {
	if(_.isArray(range1)&&_.isArray(range2)){
		var x1 = Math.min.apply(null, range1);
		var x2 = Math.max.apply(null, range1);
		var y1 = Math.min.apply(null, range2);
		var y2 = Math.max.apply(null, range2);
		return x1 <= y2 && y1 <= x2;
	}else if(_.isArray(range1)){
		var x1 = Math.min.apply(null, range1);
		var x2 = Math.max.apply(null, range1);
		return x1 <= range2 && range2 <= x2;
	}else if(_.isArray(range2)){
		var y1 = Math.min.apply(null, range2);
		var y2 = Math.max.apply(null, range2);
		return range1 <= y2 && y1 <= range1;
	}else{
		return false;
	}
};

_.mixin({ 'overlap': overlap });

/**
 * Dependency: underscore.js ( http://documentcloud.github.com/underscore/ )
 *
 * Mix it in with underscore.js:
 * _.mixin({overlap: overlap});
 * 
 * Call it like this:
 * var result = _.overlap(range1,range2)
 *
 *
 **/