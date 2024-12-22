import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const RemoveAds = ({ goToDashboard }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [warningMessage, setWarningMessage] = useState(""); // State for warning
  const [successMessage, setSuccessMessage] = useState(""); // State for success

  const handleInputChange = (field, value) => {
    setPaymentInfo({ ...paymentInfo, [field]: value });
  };

  const handlePayment = () => {
    // Check if any required fields are empty
    if (!paymentInfo.name || !paymentInfo.cardNumber || !paymentInfo.expirationDate || !paymentInfo.cvv) {
      setWarningMessage("All fields are required. Please fill out all the details."); // Set warning message
      setSuccessMessage(""); // Clear success message
      return;
    }

    // Simulate a successful payment
    setSuccessMessage("Payment Successful! Ads have been removed."); // Set success message
    setWarningMessage(""); // Clear warning message

    // Navigate back to the dashboard after payment
    setTimeout(() => goToDashboard(), 2000); // Give time for the message to be visible
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToDashboard} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Remove Ads</Text>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text> // Show success message
        ) : (
          <Text style={styles.text}>You can remove ads here!</Text> // Default text
        )}

        {warningMessage ? (
          <Text style={styles.warningMessage}>{warningMessage}</Text> // Show warning message if fields are missing
        ) : null}

        <View style={styles.paymentSection}>
          <Text style={styles.paymentHeader}>Enter Payment Information</Text>

          <TextInput
            style={styles.input}
            placeholder="Name on Card"
            value={paymentInfo.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChangeText={(text) => handleInputChange("cardNumber", text)}
            keyboardType="number-pad" // Numeric keyboard for card number
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="Expiration Date"
              value={paymentInfo.expirationDate}
              onChangeText={(text) => handleInputChange("expirationDate", text)}
              keyboardType="number-pad" // Numeric keyboard for expiration date
            />
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChangeText={(text) => handleInputChange("cvv", text)}
              keyboardType="number-pad" // Numeric keyboard for CVV
            />
          </View>

          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.paymentButtonText}>Submit Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  mainContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16, // Reduced size
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  successMessage: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    color: "green", // Success color
    fontWeight: "bold",
  },
  warningMessage: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "red", // Warning color
    fontWeight: "bold",
  },
  paymentSection: {
    marginTop: 30,
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  paymentHeader: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallInput: {
    width: "48%",
  },
  paymentButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  paymentButtonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
});

export default RemoveAds;



