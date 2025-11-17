import "@/global.css";

import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="(public)" />
    </Stack>
  );
};

export default Layout;
