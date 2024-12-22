import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Dashboard({ tasks, goToTaskManager, goToWelcomeScreen, goToRemoveAdsPage }) {
  const [currentTime, setCurrentTime] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [adsRemoved, setAdsRemoved] = useState(false);

  const completedTasks = completedTaskList.length;
  const totalTasks = taskList.length + completedTasks;
  const addedTasks = taskList.length;

  const updateClock = () => {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleTaskAction = (taskId, action) => {
    const updatedTasks = [...taskList];
    const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
    const task = updatedTasks[taskIndex];

    if (action === "complete") {
      task.status = "Completed";
      updatedTasks.splice(taskIndex, 1);
      setTaskList(updatedTasks);
      setCompletedTaskList((prevList) => [...prevList, task]);
    } else if (action === "edit") {
      setEditingTask(task);
      setEditedName(task.name);
      setEditedDescription(task.description);
    }
  };

  const saveEditedTask = () => {
    if (!editedName || !editedDescription) {
      alert("Both name and description are required.");
      return;
    }

    const updatedTasks = [...taskList];
    const taskIndex = updatedTasks.findIndex((task) => task.id === editingTask.id);

    if (taskIndex !== -1) {
      updatedTasks[taskIndex] = {
        ...editingTask,
        name: editedName,
        description: editedDescription,
      };
    }

    setTaskList(updatedTasks);
    setEditingTask(null);
    setEditedName("");
    setEditedDescription("");
  };

  const deleteTask = () => {
    const updatedTasks = taskList.filter((task) => task.id !== editingTask.id);
    setTaskList(updatedTasks);
    setEditingTask(null);
    setEditedName("");
    setEditedDescription("");
  };

  const handleRemoveAds = () => {
    setAdsRemoved(true); // Simulate removing ads
    goToRemoveAdsPage(); // Navigate to remove ads page
  };

  // This function is invoked when payment is completed on the remove ads page
  const handlePaymentSuccess = () => {
    setAdsRemoved(true); // Ads are removed
    goToWelcomeScreen(); // Navigate back to the dashboard after payment
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToWelcomeScreen} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MY TASK</Text>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.timestamp}>{currentTime}</Text>
        </View>

        <View style={styles.quickStatsContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.quickStatCard}>
              <Ionicons name="checkmark-done" size={20} color="#28A745" />
              <Text style={styles.statValue}>{completedTasks}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.quickStatCard}>
              <Ionicons name="ios-list" size={20} color="#FF9800" />
              <Text style={styles.statValue}>{totalTasks}</Text>
              <Text style={styles.statLabel}>Total Tasks</Text>
            </View>
            <View style={styles.quickStatCard}>
              <Ionicons name="time" size={20} color="#FFC107" />
              <Text style={styles.statValue}>{addedTasks}</Text>
              <Text style={styles.statLabel}>Added Tasks</Text>
            </View>
          </View>
        </View>

        {editingTask && (
          <View style={styles.editTaskContainer}>
            <Text style={styles.editTaskHeader}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Name"
              value={editedName}
              onChangeText={setEditedName}
            />
            <TextInput
              style={styles.input}
              placeholder="Task Description"
              value={editedDescription}
              onChangeText={setEditedDescription}
            />
            <TouchableOpacity style={styles.completeButton} onPress={saveEditedTask}>
              <Text style={styles.completeButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.completeButton, { backgroundColor: "#dc3545" }]}
              onPress={() => setEditingTask(null)}
            >
              <Text style={styles.completeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.completeButton, { backgroundColor: "#FF4136" }]}
              onPress={deleteTask}
            >
              <Text style={styles.completeButtonText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.addedTasksContainer}>
          <Text style={styles.addedTasksHeader}>Added Tasks</Text>
          <FlatList
            data={taskList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.taskCard}
                onPress={() => handleTaskAction(item.id, "edit")}
              >
                <Text style={styles.taskTitle}>{item.name}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleTaskAction(item.id, "complete")}
                >
                  <Text style={styles.completeButtonText}>
                    {item.status === "Completed" ? "Completed" : "Mark as Completed"}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No tasks added yet.</Text>}
          />
        </View>

        <TouchableOpacity style={styles.createTaskButton} onPress={goToTaskManager}>
          <Text style={styles.createTaskText}>Create New Task</Text>
        </TouchableOpacity>

        {/* Simulated Ad Section */}
        {!adsRemoved && (
          <View style={styles.adContainer}>
            <Text style={styles.adText}>This is an ad. You can remove it by paying.</Text>
            <TouchableOpacity style={styles.removeAdsButton} onPress={handleRemoveAds}>
              <Text style={styles.removeAdsButtonText}>Remove Ads</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.completedTasksContainer}>
          <Text style={styles.completedTasksHeader}>Completed Tasks</Text>
          <ScrollView>
            {completedTaskList.length > 0 ? (
              completedTaskList.map((task) => (
                <View style={styles.completedTaskCard} key={task.id}>
                  <Text style={styles.taskTitle}>{task.name}</Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No completed tasks yet.</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 16,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#333",
    borderRadius: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 10,
  },
  mainContent: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  dateTimeContainer: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  timestamp: {
    fontSize: 18,
    color: "#4A90E2",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 22,
  },
  quickStatsContainer: {
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 5,
  },
  quickStatCard: {
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  editTaskContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  editTaskHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: "#F5F5F5",
  },
  completeButton: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  completeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  taskCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginVertical: 20,
  },
  createTaskButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  createTaskText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  addedTasksContainer: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addedTasksHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  completedTasksContainer: {
    marginTop: 24,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  completedTasksHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  completedTaskCard: {
    backgroundColor: "#F0F0F0",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  adContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
  },
  adText: {
    color: "#6c757d",
    fontSize: 20,
    textAlign: "center",
  },
  removeAdsButton: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  removeAdsButtonText: {
    color: "black",
    fontSize: 18,
  },
  
});





