import { useRef, useState } from "react";
import GradientBackground from "@/components/shared/gradient-bg";
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {slides} from "@/constants/data"
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const ref = useRef<FlatList<any> | null>(null);
  const router = useRouter();

  const updateSlideIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / SCREEN_WIDTH);
    setCurrentSlideIndex(newIndex); 
  }

  const nextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * SCREEN_WIDTH;
      ref.current?.scrollToOffset({ offset, animated: true });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      router.push("/(routes)/get-started");
    }
  }

  const prevSlide = () => {
    const prevSlideIndex = currentSlideIndex - 1;
    if (prevSlideIndex >= 0) {
      const offset = prevSlideIndex * SCREEN_WIDTH;
      ref.current?.scrollToOffset({ offset, animated: true });
      setCurrentSlideIndex(prevSlideIndex);
    }
  }

  const skipSlides = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * SCREEN_WIDTH;
    ref.current?.scrollToOffset({ offset, animated: true });
    setCurrentSlideIndex(lastSlideIndex);
  }

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-1 mt-5 text-center items-center" style={{ width: SCREEN_WIDTH }}>
      <Image source={item.image} style={{ width: 362, height: 455, alignSelf: 'center' }} className="w-[362] h-auto object-contain" />
      <Text className="text-center text-white text-2xl font-popins font-extrabold mt-4 mb-2">
        {item.title}
      </Text>
      <Text className="text-center text-white text-base font-popins font-normal mb-4 px-4" style={{ maxWidth: SCREEN_WIDTH - 32 }}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <GradientBackground style={{ paddingTop: insets.top }}>
      <Pressable onPress={skipSlides}>
        <Text className="flex text-right pr-4 font-popins text-white mt-4 font-semibold">
          Skip
        </Text>
      </Pressable>
      <FlatList
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={updateSlideIndex}
        scrollEventThrottle={16}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}
        ref={ref}
      />
      <View className="flex-row items-center justify-center mt-4">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentSlideIndex ? "border p-2 border-primary" : "bg-gray-500"}`}
            style={{
              backgroundColor:
                index === currentSlideIndex ? "#B22222" : "#D1D5DB",
            }}
          />
        ))}
      </View>
      <View className="flex-1" />
      <View className="flex-row justify-center">
        <View className="flex-row justify-center items-center bg-gray-200 rounded-[20px] min-h-16 gap-4 px-8">
          <Pressable onPress={prevSlide}>
            <Text className="text-center text-white font-popins font-semibold">
              <FontAwesome
                name="long-arrow-left"
                size={24}
                color={currentSlideIndex > 0 ? "#23262F" : "#B1B5C3"}
              />
            </Text>
          </Pressable>
          <Text className="px-2">|</Text>
          <Pressable onPress={nextSlide}>
            {currentSlideIndex === slides.length - 1 ? (
              <Text className="text-[#B22222] font-popins font-bold text-base">
                Get Started
              </Text>
            ) : (
              <FontAwesome name="long-arrow-right" size={24} color="#23262F" />
            )}
          </Pressable>
        </View>
      </View>
      <View
        style={
          Platform.OS === "ios"
            ? { height: insets.bottom }
            : { marginBottom: 20 }
        }
      />
    </GradientBackground>
  );
}
