// round to four digits
const roundToFour = (value) => Math.round(value * 10000) / 10000

const fillMissingTimestamps = (inputMains, inputSolar) => {
  const resultMains = []
  const resultSolar = []

  let i = 0,
    j = 0

  while (i < inputMains.length || j < inputSolar.length) {
    const mainsTime = inputMains[i]?.timestamp
    const solarTime = inputSolar[j]?.timestamp

    if (mainsTime === solarTime) {
      resultMains.push(inputMains[i])
      resultSolar.push(inputSolar[j])
      i++
      j++
    } else if (
      mainsTime &&
      (!solarTime || new Date(mainsTime) < new Date(solarTime))
    ) {
      resultMains.push(inputMains[i])
      resultSolar.push({
        total_act_energy: 0,
        total_act_ret_energy: 0,
        timestamp: mainsTime,
      })
      i++
    } else if (
      solarTime &&
      (!mainsTime || new Date(solarTime) < new Date(mainsTime))
    ) {
      resultSolar.push(inputSolar[j])
      resultMains.push({
        total_act_energy: 0,
        total_act_ret_energy: 0,
        timestamp: solarTime,
      })
      j++
    } else {
      break
    }
  }

  return { mains: resultMains, solar: resultSolar }
}

const computeEnergyFlows = (inputMains, inputSolar) => {
  let mains
  let solar

  if (!inputMains || !inputSolar || inputMains.length !== inputSolar.length) {
    ;({ mains, solar } = fillMissingTimestamps(inputMains, inputSolar))
  } else {
    mains = inputMains
    solar = inputSolar
  }

  const result = []

  const max_length = mains.length >= solar.length ? mains.length : solar.length

  for (let i = 0; i < max_length; i++) {
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

const computeEnergyFlowsForTotals = (mainsTotals, solarTotals) => {
  const solarProduced = roundToFour(solarTotals.total_act_energy)
  const solarSold = roundToFour(mainsTotals.total_act_ret_energy)
  const mainsBought = roundToFour(mainsTotals.total_act_energy)
  const solarUsed = roundToFour(solarProduced - solarSold)
  const totalConsumption = roundToFour(mainsBought + solarUsed)
  const netFlow = roundToFour(mainsBought - solarSold)

  return {
    solarProduced,
    solarSold,
    mainsBought,
    solarUsed,
    totalConsumption,
    netFlow,
  }
}

export default computeEnergyFlows
export { computeEnergyFlowsForTotals }
