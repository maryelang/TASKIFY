import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WelcomeScreen from "./components/WelcomeScreen";
import Dashboard from "./components/Dashboard";
import TaskManager from "./components/TaskManager";
import RemoveAds from "./components/RemoveAds"; // Ensure this is correctly imported

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [tasks, setTasks] = useState([]);

  const goToDashboard = () => {
    setScreen("dashboard");
  };

  const goToTaskManager = () => {
    setScreen("taskManager");
  };

  const goToWelcomeScreen = () => {
    setScreen("welcome");
  };

  const goToRemoveAdsPage = () => {
    setScreen("removeAds"); // This function will change the screen to the remove ads page
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {screen === "welcome" && <WelcomeScreen goToDashboard={goToDashboard} />}
      {screen === "dashboard" && (
        <Dashboard
          tasks={tasks}
          goToTaskManager={goToTaskManager}
          goToWelcomeScreen={goToWelcomeScreen}
          goToRemoveAdsPage={goToRemoveAdsPage} // Pass the function here
        />
      )}
      {screen === "taskManager" && (
        <TaskManager addTask={addTask} goToDashboard={goToDashboard} />
      )}
      {screen === "removeAds" && <RemoveAds goToDashboard={goToDashboard} />} {/* Render RemoveAds screen */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
