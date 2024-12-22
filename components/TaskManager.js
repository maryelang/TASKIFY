import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment"; // Import moment.js
import { Ionicons } from "@expo/vector-icons"; // Importing the icon library

export default function TaskManager({ addTask, goToDashboard }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = () => {
    if (!taskName || !taskDate || !description) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const newTask = {
      id: Math.random().toString(),
      name: taskName,
      date: taskDate,
      description,
    };

    addTask(newTask); // Pass the new task to App.js

    // Clear fields after task is added
    setTaskName("");
    setTaskDate(null);
    setDescription("");
    goToDashboard(); // Navigate back to Dashboard after adding task
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToDashboard} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Task</Text>
      </View>

      {/* Task Creation Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>{taskDate || "Select Date"}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <CalendarPicker
            onDateChange={(date) => {
              setTaskDate(moment(date).format("YYYY-MM-DD"));
              setShowDatePicker(false);
            }}
          />
        )}

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.createButton} onPress={handleAddTask}>
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F0F8FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#333",
    borderRadius: 50,
    marginRight: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E3E6EA",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  createButton: {
    padding: 16,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});