import { useAppSelector } from "@/hooks";
import { Redirect } from "expo-router";

export default function Index() {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/welcome" />;
}
