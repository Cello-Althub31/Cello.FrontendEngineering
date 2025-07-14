import WelcomeScreen from '@/screens/welcome/welcome.screen'
import { StatusBar } from 'expo-status-bar'

const Welcome = () => {
  return (
    <>
      <StatusBar style="light" />
      <WelcomeScreen />
    </>
  )
}

export default Welcome