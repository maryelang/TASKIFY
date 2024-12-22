import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function WelcomeScreen({ goToDashboard }) {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>
        <Icon name="tasks" size={30} color="#007bff" /> Taskify
      </Text>
      <Text style={styles.welcomeText}>
        <Text style={styles.highlight}>Welcome to Taskify,</Text> your personal task manager!
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={goToDashboard} color="#007bff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007bff",
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
    lineHeight: 24,
  },
  highlight: {
    fontWeight: "bold",
    color: "#007bff",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
  },
});


