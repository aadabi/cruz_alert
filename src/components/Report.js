import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { toggleThank, getPublicReports } from "../api";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thanked: this.props.report.hasUserThanked,
      thankCount: this.props.report.thankCount
    };
  }

  handleThank = () => {
    this.setState(prevState => {
      const newThankCount = prevState.thanked
        ? prevState.thankCount - 1
        : prevState.thankCount + 1;
      return {
        thanked: !prevState.thanked,
        thankCount: newThankCount
      };
    });
    const { reportID, isPublic } = this.props.report;
    toggleThank(reportID, isPublic);
  };

  render() {
    const { title, description, category } = this.props.report;
    const thankCount = this.state.thankCount;
    let thankCountText;
    if (thankCount === 1) {
      thankCountText = "1 Thank";
    } else {
      thankCountText = `${thankCount} Thanks`;
    }
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
        <TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.category}>{category}</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.secondaryContainer}>
          <TouchableOpacity onPress={this.handleThank}>
            <Text style={styles.bold }>{this.state.thanked ? "Unthank  " : "Thank "}</Text>
          </TouchableOpacity>
          <Text style={[thankCount > 0 ? styles.counter : styles.noThank]}>{thankCountText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 8,
    flex: 1
  },
  contentContainer: {
    padding: 12
  },
  secondaryContainer: {
    height: 40,
    padding: 12,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "lightgray"
  },
  title: {
    fontWeight: "500",
    color: "black",
    fontSize: 18,
    marginBottom: 6
  },
  category: {
    color: "gray"
  },
  description: {
    color: "black",
    fontSize: 14,
    marginBottom: 4
  },
  button: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "powderblue"
  },
  buttonText: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
  },
  counter: {
    fontWeight: "bold",
    color: "#FFB511",
  },
  bold: {
    fontWeight: "bold",
    color: "#1295D8"
  }
});

export default Report;
