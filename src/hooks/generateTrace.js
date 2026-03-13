function generateTrace(value){

  const points = []

  for(let i=0;i<20;i++){

    const noise = (Math.random() - 0.5) * 4

    points.push({
      index:i,
      value: value + noise
    })

  }

  return points
}