export function computeGrouping(shots){

  if(!shots.length){
    return {
      centerX:50,
      centerY:65,
      radius:0,
      avgSpread:0
    }
  }

  let sumX=0
  let sumY=0

  shots.forEach(s=>{
    sumX+=s.x
    sumY+=s.y
  })

  const centerX=sumX/shots.length
  const centerY=sumY/shots.length

  let maxDist=0
  let totalDist=0

  shots.forEach(s=>{

    const dx=s.x-centerX
    const dy=s.y-centerY

    const dist=Math.sqrt(dx*dx+dy*dy)

    totalDist+=dist
    maxDist=Math.max(maxDist,dist)

  })

  return{
    centerX,
    centerY,
    radius:maxDist,
    avgSpread: totalDist/shots.length
  }

}