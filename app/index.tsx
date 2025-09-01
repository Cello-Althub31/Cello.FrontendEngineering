import { useAppSelector } from "@/hooks";
import { Redirect } from "expo-router";

export default function Index() {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    return <Redirect href="/(drawer)/home" />;
  }
  
  return <Redirect href="/(routes)/welcome" />;
}
