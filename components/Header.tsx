import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { router } from 'expo-router';

const Header = ({title}:{title:string}) => {
  return (
    <View className='flex-row items-center gap-4 mb-4 mt-4'>
        <TouchableOpacity onPress={() => router.back()}>
            <Entypo name='chevron-with-circle-left' size={30} />
        </TouchableOpacity>
      <Text className='font-poppins-semibold font-semibold text-2xl'>{title}</Text>
    </View>
  )
}

export default Header