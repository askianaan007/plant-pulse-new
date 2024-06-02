import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../../screens/Welcome";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import Home from "../../screens/Home";
import ResetPass from "../../screens/auth/ResetPassword";
import Plants from "../../screens/plant/Plants";
import AddPlant from "../../screens/plant/AddPlant";
import { AuthContext } from "../../context/authContext";
import Profile from "../../screens/auth/Profile";
import AllPlants from "../../screens/plant/AllPlants";
import Weather from "../../screens/weather/Weather";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //condition true false
  const authenticatedUser = state?.user && state?.token;

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Welcome">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Plants"
            component={Plants}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddPlant"
            component={AddPlant}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllPlants"
            component={AllPlants}
            options={{ headerShown: false }}
          />
         <Stack.Screen
            name="Weather"
            component={Weather}
            options={{ headerShown: false }}
          />
          
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPass"
            component={ResetPass}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
