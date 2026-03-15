function generateTrace(points, start, spread){
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

function generateShot(id){

  const stability = Math.floor(60 + Math.random()*35)
  const trigger = Math.floor(60 + Math.random()*35)
  const score = Math.floor(70 + Math.random()*30)

  const holdSpread = (100-stability)/3
  const triggerSpread = (100-trigger)/2
  const recoilSpread = (100-score)/1.5

  const holdTrace = generateTrace(
    25,
    {x:0,y:-15},
    holdSpread
  )

  const triggerTrace = generateTrace(
    12,
    holdTrace[holdTrace.length-1],
    triggerSpread
  )

  const recoilTrace = generateTrace(
    10,
    triggerTrace[triggerTrace.length-1],
    recoilSpread
  )

  return{
    shotId:id,
    score,
    stability,
    triggerControl:trigger,
    trace:{
      hold:holdTrace,
      trigger:triggerTrace,
      recoil:recoilTrace
    }
  }
}

function generateDataset(count){

  const shots=[]

  for(let i=1;i<=count;i++){
    shots.push(generateShot(i))
  }

  return{
    mantisSensor:shots
  }

}

console.log(
  JSON.stringify(
    generateDataset(15),
    null,
    2
  )
)