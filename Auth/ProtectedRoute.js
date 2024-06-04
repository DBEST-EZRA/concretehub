import React from "react";
import { useAuth } from "./AuthContext";
import { View, Text } from "react-native";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <View>
        <Text>You must be logged in to access this page</Text>
      </View>
    );
  }

  if (!roles.includes(user.role)) {
    return (
      <View>
        <Text>You do not have permission to access this page</Text>
      </View>
    );
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
