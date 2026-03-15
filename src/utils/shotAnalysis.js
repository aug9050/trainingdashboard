export function classifyShot(x,y){

  const centerX = 50
  const centerY = 65

  const dx = x - centerX
  const dy = y - centerY

  const threshold = 5

  if(Math.abs(dx) < threshold && Math.abs(dy) < threshold)
    return "Center"

  if(dy > threshold && Math.abs(dx) < threshold)
    return "High"

  if(dy < -threshold && Math.abs(dx) < threshold)
    return "Low"

  if(dx < -threshold && Math.abs(dy) < threshold)
    return "Left"

  if(dx > threshold && Math.abs(dy) < threshold)
    return "Right"

  if(dx < -threshold && dy < -threshold)
    return "LowLeft"

  if(dx > threshold && dy < -threshold)
    return "LowRight"

  if(dx < -threshold && dy > threshold)
    return "HighLeft"

  if(dx > threshold && dy > threshold)
    return "HighRight"

}

export function getDiagnosis(segment){

  const diagnosis = {

    LowLeft:{
      title:"Low Left Grouping",
      explanation:
        "You tighten and tense your fingers with little support hand grip. Improper trigger pull causes the shot to drift low left.",
      advice:[
        "Only trigger finger moves",
        "Use the pad of your trigger finger",
        "Maintain steady grip with support hand"
      ]
    },

    LowRight:{
      title:"Low Right Grouping",
      explanation:
        "You are pushing forward with the heel of your palm or tightening your grip during the shot.",
      advice:[
        "Relax the firing hand",
        "Allow the trigger press to be smooth",
        "Focus on follow-through"
      ]
    },

    HighLeft:{
      title:"High Left Grouping",
      explanation:
        "This may be caused by thumbing the pistol or tightening the thumb during trigger press.",
      advice:[
        "Relax your thumbs",
        "Maintain consistent grip pressure",
        "Focus on smooth trigger control"
      ]
    },

    HighRight:{
      title:"High Right Grouping",
      explanation:
        "Breaking the wrist upward while pressing the trigger.",
      advice:[
        "Lock your wrist firmly",
        "Maintain consistent sight alignment",
        "Press the trigger slowly"
      ]
    },

    Low:{
      title:"Low Shots",
      explanation:
        "Anticipating recoil and pushing the gun downward before the shot breaks.",
      advice:[
        "Practice surprise break trigger press",
        "Focus on front sight during trigger pull",
        "Do not anticipate recoil"
      ]
    },

    High:{
      title:"High Shots",
      explanation:
        "Breaking your wrist upward or improper sight alignment.",
      advice:[
        "Keep wrist locked",
        "Maintain proper sight picture",
        "Slow down trigger press"
      ]
    },

    Left:{
      title:"Left Drift",
      explanation:
        "Jerking the trigger sideways during the shot.",
      advice:[
        "Use only the trigger finger",
        "Apply slow and steady trigger pressure",
        "Avoid tightening the rest of the hand"
      ]
    },

    Right:{
      title:"Right Drift",
      explanation:
        "Too much finger on the trigger causing sideways pressure.",
      advice:[
        "Use only the pad of the trigger finger",
        "Adjust finger placement",
        "Maintain stable grip"
      ]
    },

    Center:{
      title:"Good Shot Group",
      explanation:
        "Your shots are centered with proper trigger control and stable grip.",
      advice:[
        "Maintain current technique",
        "Focus on consistent breathing",
        "Continue practicing trigger discipline"
      ]
    }

  }

  return diagnosis[segment] || diagnosis.Center

}

export function classifyScore(x,y){

  // center mass
  if(x>=45 && x<=55 && y>=55 && y<=75)
    return "in"

  // outer torso
  if(x>=40 && x<=60 && y>=40 && y<=80)
    return "out"

  return "miss"

}
