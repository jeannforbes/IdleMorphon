var rand = new Ziggurat();
//Objectives:
//Read from the file the lengths, and initialize those numbers, parsed to an array.
//Using the date.now taken at the first play, keep track of milliseconds so that when changes need to be made is properly tracked
//With the gaussian algorithm, change clips at the proper time, with proper timing.
//With some series of if statements, determine what should play next. -done

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


var audio = SoundTesting.getElementsByTagName("audio");

var curClip = 5;
var source = audioCtx.createMediaElementSource(audio[curClip]);
source.connect(audioCtx.destination);

var curStart = Date.now();
//Length array hard-coded for now until I figure out file reading.
var clipLengths = [5334, 5334, 8001, 5334, 8001, 5334, 21336, 2667, 5334, 13335];

function detNext(prevClip)
{
	var finalClip;
	var randVal = Math.round(rand.nextGaussian);
	
	if(prevClip == 0 || prevClip == 3 || prevClip == 6)
	{
		if(randVal <= -3)
		{
			finalClip = 1;
		}
		
		if(randVal == -2)
		{
			finalClip = 9;
		}
		
		if(randVal == -1)
		{
			finalClip = 2;
		}
		
		if(randVal == 0)
		{
			finalClip = 4;
		}
		
		if(randVal == 1)
		{
			finalClip = 8;
		}
		
		if(randVal == 2)
		{
			finalClip = 5;
		}
		
		if(randVal >= 3)
		{
			finalClip = 7;
		}
	}
	
	if(prevClip == 1 || prevClip == 4 || prevClip == 7)
	{
		if(randVal <= -3)
		{
			finalClip = 0;
		}
		
		if(randVal == -2)
		{
			finalClip = 9;
		}
		
		if(randVal == -1)
		{
			finalClip = 2;
		}
		
		if(randVal == 0)
		{
			finalClip = 6;
		}
		
		if(randVal == 1)
		{
			finalClip = 8;
		}
		
		if(randVal == 2)
		{
			finalClip = 5;
		}
		
		if(randVal >= 3)
		{
			finalClip = 3;
		}
	}
	
	if(prevClip == 2 || prevClip == 5 || prevClip == 8)
	{
		if(randVal <= -3)
		{
			finalClip = 0;
		}
		
		if(randVal == -2)
		{
			finalClip = 9;
		}
		
		if(randVal == -1)
		{
			finalClip = 7;
		}
		
		if(randVal == 0)
		{
			finalClip = 6;
		}
		
		if(randVal == 1)
		{
			finalClip = 4;
		}
		
		if(randVal == 2)
		{
			finalClip = 1;
		}
		
		if(randVal >= 3)
		{
			finalClip = 3;
		}
		
	}
	
	else
	{
		if(randVal <= -3)
		{
			finalClip = 0;
		}
		
		if(randVal == -2)
		{
			finalClip = 9;
		}
		
		if(randVal == -1)
		{
			finalClip = 1;
		}
		
		if(randVal == 0)
		{
			finalClip = 8;
		}
		
		if(randVal == 1)
		{
			finalClip = 2;
		}
		
		if(randVal == 2)
		{
			finalClip = 7;
		}
		
		if(randVal >= 3)
		{
			finalClip = 3;
		}
		
	}
	
	return finalClip;
}

function playLoop()
{
	if(Date.now() - curStart >= clipLengths[curClip]
	{
		curClip = detNext(curClip);
		curStart = Date.now();
		var source = audioCtx.createMediaElementSource(audio[curClip]);
		source.connect(audioCtx.destination);
	}
	
	Window.requestAnimationFrame(playLoop);
}

Window.requestAnimationFrame(playLoop);