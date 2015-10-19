var rand = new Ziggurat();

var curClip = 0;

var curStart = Date.now();

var path = '../Sounds/';

var tracks = 'MainTheme/BaseClip';

var extension = '.ogg';

var audio = new Audio();
audio.src = path + tracks + curClip + extension;;
audio.load;
audio.play();

//Make the entire thing one audio file, fast forward to the appropriate clips.
var clipTimes = [0, 5334, 13335, 18669, 24003, 32004, 37338, 58674, 61341, 66675];

//Length array hard-coded for now until I figure out file reading.
var clipLengths = [5334, 5334, 8001, 5334, 8001, 5334, 21336, 2667, 5334, 13335];

function detNext(prevClip)
{
	var finalClip;
	var randVal = Math.round(rand.nextGaussian());
	
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

function changeSound()
{
	if(Date.now() - curStart >= clipLengths[curClip])
	{
		curClip = detNext(curClip);
		audio.src = path + tracks + curClip + extension;
		curStart = Date.now();
		audio.load;
		audio.play();
	}
}

setInterval(changeSound, 1);