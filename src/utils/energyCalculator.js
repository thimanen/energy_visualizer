// round to four digits
const roundToFour = (value) => Math.round(value * 10000) / 10000

const computeEnergyFlows = (mains, solar) => {
  if (!mains || !solar || mains.length !== solar.length) {
    console.log(
      'Both mains and solar energy readings are required and must be same length'
    )
    return []
  }

  const result = []

  for (let i = 0; i < mains.length; i++) {
    const mainsData = mains[i]
    const solarData = solar[i]

    const timestamp = mainsData.timestamp
    const solarProduced = roundToFour(solarData.total_act_energy)
    const solarSold = roundToFour(mainsData.total_act_ret_energy)
    const mainsBought = roundToFour(mainsData.total_act_energy)
    const solarUsed = roundToFour(solarProduced - solarSold)
    const totalConsumption = roundToFour(mainsBought + solarUsed)
    const netFlow = roundToFour(mainsBought - solarSold)

    result.push({
      timestamp,
      solarProduced,
      solarSold,
      mainsBought,
      solarUsed,
      totalConsumption,
      netFlow,
    })
  }

  return result
}

export default computeEnergyFlows
