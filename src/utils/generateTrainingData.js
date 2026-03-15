

function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}

function rand(min,max){
  return Math.random()*(max-min)+min
}

function randInt(min,max){
  return Math.floor(rand(min,max))
}

/* generate aim trace */

function generateTrace(points,start,spread){

  const trace=[]
  let x=start.x
  let y=start.y

  for(let i=0;i<points;i++){

    x += (Math.random()-0.5)*spread
    y += (Math.random()-0.5)*spread

    trace.push({
      x:Math.round(x),
      y:Math.round(y)
    })

  }

  return trace

}

/* generate target board hit */

function generateHit(){

    const ranges = ["5m", "10m", "15m"];
    const lightingLevels = ["Low", "Medium", "High"];

    const zone = Math.random();

    let x;
    let y;

    // center mass (most shots)
    if(zone < 0.7){
        x = rand(45,55);
        y = rand(60,70);
    }

    // head shots
    else if(zone < 0.85){
        x = rand(47,53);
        y = rand(85,92);
    }

    // lower torso
    else if(zone < 0.95){
        x = rand(45,55);
        y = rand(40,50);
    }

    // edge / miss
    else{
        x = rand(0,100);
        y = rand(0,100);
    }

    return{
        x,
        y,
        range: pick(ranges),
        lighting: pick(lightingLevels)
    }

}

/* generate one shot */

function generateShot(id){

  const stability=randInt(60,95)
  const trigger=randInt(60,95)
  const score=randInt(70,98)

  const holdSpread=(100-stability)/3
  const triggerSpread=(100-trigger)/2
  const recoilSpread=(100-score)/1.5

  const holdTrace=generateTrace(
    25,
    {x:0,y:-15},
    holdSpread
  )

  const triggerTrace=generateTrace(
    12,
    holdTrace[holdTrace.length-1],
    triggerSpread
  )

  const recoilTrace=generateTrace(
    10,
    triggerTrace[triggerTrace.length-1],
    recoilSpread
  )

  return{

    shotId:id,

    score,
    stability,
    triggerControl:trigger,

    hit:generateHit(),

    trace:{
      hold:holdTrace,
      trigger:triggerTrace,
      recoil:recoilTrace
    }

  }

}

/* build dataset */

function generateDataset(count){

  const playback=[]
  const mantisSensor=[]

  for(let i=1;i<=count;i++){

    const shot=generateShot(i)

    mantisSensor.push({
      shotId:shot.shotId,
      score:shot.score,
      stability:shot.stability,
      triggerControl:shot.triggerControl,
      trace:shot.trace
    })

    playback.push({
      time:i,
      shots:[
        {
            x:shot.hit.x,
            y:shot.hit.y,
            shotId:shot.shotId,
            range: shot.hit.range,
            lighting: shot.hit.lighting
        }
      ]
    })

  }

  return{
    playback,
    mantisSensor
  }

}

console.log(
  JSON.stringify(
    generateDataset(15),
    null,
    2
  )
)