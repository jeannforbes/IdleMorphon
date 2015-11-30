var rand = new Ziggurat();

var curClip = [0, 3];

var curStart = Date.now();

var path = '../Sounds/';

var tracks = ['SFX/', 'Draft2/'];

var playingTracks = [];
playingTracks[0] = true;
playingTracks[1] = true;

var extension = '.ogg';

var loopTrack = new Audio();
loopTrack.src = path + tracks[1] + 'MainLoop' + extension;
loopTrack.load;
loopTrack.loop = true;
loopTrack.volume = 0.5;
loopTrack.play();

var audio = new Audio();
audio.src = path + tracks[1] + 'Clip' + curClip[1] + extension;
audio.load;
audio.volume = 1;
audio.play();

var sfx = new Audio();

//Make the entire thing one audio file, fast forward to the appropriate clips.
var clipTimes = [0, 5334, 13335, 18669, 24003, 32004, 37338, 58674, 61341, 66675];

//Length array hard-coded for now until I figure out file reading.
var clipLengths = [5334, 5334, 8001, 5334, 8001, 5334, 21336, 2667, 5334, 13335];

function detNext(prevClip)
{
	var finalClip;
	var randVal = Math.round(rand.nextGaussian());
	
	if(prevClip === 0 || prevClip === 3 || prevClip === 6)
	{
		if(randVal <= -3)
		{
			finalClip = 1;
		}
		
		if(randVal === -2)
		{
			finalClip = 9;
		}
		
		if(randVal === -1)
		{
			finalClip = 2;
		}
		
		if(randVal === 0)
		{
			finalClip = 4;
		}
		
		if(randVal === 1)
		{
			finalClip = 8;
		}
		
		if(randVal === 2)
		{
			finalClip = 5;
		}
		
		if(randVal >= 3)
		{
			finalClip = 7;
		}
	}
	
	if(prevClip === 1 || prevClip === 4 || prevClip === 7)
	{
		if(randVal <= -3)
		{
			finalClip = 0;
		}
		
		if(randVal === -2)
		{
			finalClip = 9;
		}
		
		if(randVal === -1)
		{
			finalClip = 2;
		}
		
		if(randVal === 0)
		{
			finalClip = 6;
		}
		
		if(randVal === 1)
		{
			finalClip = 8;
		}
		
		if(randVal === 2)
		{
			finalClip = 5;
		}
		
		if(randVal >= 3)
		{
			finalClip = 3;
		}
	}
	
	if(prevClip === 2 || prevClip === 5 || prevClip === 8)
	{
		if(randVal <= -3)
		{
			finalClip = 0;
		}
		
		if(randVal === -2)
		{
			finalClip = 9;
		}
		
		if(randVal === -1)
		{
			finalClip = 7;
		}
		
		if(randVal === 0)
		{
			finalClip = 6;
		}
		
		if(randVal === 1)
		{
			finalClip = 4;
		}
		
		if(randVal === 2)
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
		
		if(randVal === -2)
		{
			finalClip = 9;
		}
		
		if(randVal === -1)
		{
			finalClip = 1;
		}
		
		if(randVal === 0)
		{
			finalClip = 8;
		}
		
		if(randVal === 1)
		{
			finalClip = 2;
		}
		
		if(randVal === 2)
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

function changeClip()
{
    if(playingTracks[1])
    {
	if(Date.now() - curStart >= audio.duration*1000)
	{
            //playSFX('Test');
            curClip[1] = detNext(curClip[1]);
            audio.src = path + tracks[1] + 'Clip' + curClip[1] + extension;
            curStart = Date.now();
            audio.load;
            audio.play();
	}
    }
}

//To toggle a track, just enter in its name to match the if statements.
function swapTrack(trackName)
{
    if(trackName === 'MainTheme')
    {
        if(playingTracks[1])
        {
            playingTracks[1] = false;
        }
        
        else
            if(playingTracks[1])
        {
            playingTracks[1] = true;
        }
    }
}

//Currently compatible with: Test
function playSFX(clipName)
{
    sfx.src = path + tracks[0] + clipName + extension;
    sfx.volume = 1;
    sfx.load;
    sfx.play();
}

setInterval(changeClip, 30);