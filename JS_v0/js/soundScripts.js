var curClip = 0;

var curStart = Date.now();

var audio = new Audio();
audio.src = '../Sounds/MainTheme/BaseClip1.ogg';
audio.load;
audio.play();

//Make the entire thing one audio file, fast forward to the appropriate clips.
var clipTimes = [0, 5334, 13335, 18669, 24003, 32004, 37338, 58674, 61341, 66675];

//Length array hard-coded for now until I figure out file reading.
var clipLengths = [5334, 5334, 8001, 5334, 8001, 5334, 21336, 2667, 5334, 13335];

var audio_Files = [ '../Sounds/MainTheme/BaseClip1.ogg', '../Sounds/MainTheme/BaseClip2.ogg',
					'../Sounds/MainTheme/BaseClip3.ogg', '../Sounds/MainTheme/BaseClip4.ogg',
					'../Sounds/MainTheme/BaseClip5.ogg', '../Sounds/MainTheme/BaseClip6.ogg',
					'../Sounds/MainTheme/BaseClip7.ogg', '../Sounds/MainTheme/BaseClip8.ogg',
					'../Sounds/MainTheme/BaseClip9.ogg', '../Sounds/MainTheme/BaseClip10.ogg' ];

//Obtained from filosophy,
//http://www.filosophy.org/post/35/normaldistributed_random_values_in_javascript_using_the_ziggurat_algorithm/
function Ziggurat()
{

  var jsr = 123456789;

  var wn = Array(128);
  var fn = Array(128);
  var kn = Array(128);

  function RNOR()
  {
    var hz = SHR3();
    var iz = hz & 127;
    return (Math.abs(hz) < kn[iz]) ? hz * wn[iz] : nfix(hz, iz);
  }

  this.nextGaussian = function()
  {
    return RNOR();
  }

  function nfix(hz, iz)
  {
    var r = 3.442619855899;
    var r1 = 1.0 / r;
    var x;
    var y;
    while(true)
    {
      x = hz * wn[iz];
      if( iz == 0 )
      {
        x = (-Math.log(UNI()) * r1); 
        y = -Math.log(UNI());
        while( y + y < x * x){
          x = (-Math.log(UNI()) * r1); 
          y = -Math.log(UNI());
        }
        return ( hz > 0 ) ? r+x : -r-x;
      }

      if( fn[iz] + UNI() * (fn[iz-1] - fn[iz]) < Math.exp(-0.5 * x * x) )
      {
         return x;
      }
      hz = SHR3();
      iz = hz & 127;
 
      if( Math.abs(hz) < kn[iz])
      {
        return (hz * wn[iz]);
      }
    }
  }

  function SHR3()
  {
    var jz = jsr;
    var jzr = jsr;
    jzr ^= (jzr << 13);
    jzr ^= (jzr >>> 17);
    jzr ^= (jzr << 5);
    jsr = jzr;
    return (jz+jzr) | 0;
  }

  function UNI()
  {
    return 0.5 * (1 + SHR3() / -Math.pow(2,31));
  }

  function zigset()
  {
    // seed generator based on current time
    jsr ^= new Date().getTime();

    var m1 = 2147483648.0;
    var dn = 3.442619855899;
    var tn = dn;
    var vn = 9.91256303526217e-3;
    
    var q = vn / Math.exp(-0.5 * dn * dn);
    kn[0] = Math.floor((dn/q)*m1);
    kn[1] = 0;

    wn[0] = q / m1;
    wn[127] = dn / m1;

    fn[0] = 1.0;
    fn[127] = Math.exp(-0.5 * dn * dn);

    for(var i = 126; i >= 1; i--)
    {
      dn = Math.sqrt(-2.0 * Math.log( vn / dn + Math.exp( -0.5 * dn * dn)));
      kn[i+1] = Math.floor((dn/tn)*m1);
      tn = dn;
      fn[i] = Math.exp(-0.5 * dn * dn);
      wn[i] = dn / m1;
    }
  }
  zigset();
}

function detNext(prevClip)
{
	var finalClip;
	var randVal = Math.round(Ziggurat.nextGaussian);
	
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
		//audio.currentTime = desTime;
		audio.src = audio_Files[curClip];
		curStart = Date.now();
		audio.load;
		audio.play();
	}
}

setInterval(changeSound, 1);