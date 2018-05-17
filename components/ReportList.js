import React from "react";
import { FlatList } from "react-native";
import Report from "./Report";

const ReportList = ({ reports }) => (
  <FlatList
    data={reports}
    renderItem={({ item }) => <Report report={item} />}
  />
);

export default ReportList;
