import Constants from 'expo-constants'

import Main from './src/components/Main'

const App = () => {
  console.log('EXTRA property:', Constants.expoConfig.extra)
  return <Main />
}

export default App
