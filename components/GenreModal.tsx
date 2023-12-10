import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import RNModal from "react-native-modal";
type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};
export const Modal = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      // animationInTiming={1000}
      // animationOutTiming={1000}
      // backdropTransitionInTiming={800}
      // backdropTransitionOutTiming={800}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      // animationInTiming={600}
      // animationOutTiming={600}
      // backdropTransitionInTiming={600}
      // backdropTransitionOutTiming={600}
      {...props}
    >
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({
  title,
  onClose,
  onEdit,
}: {
  title: string;
  onClose: () => void;
  onEdit: () => void;
}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onClose}>
      <AntDesign name="close" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.text}>{title}</Text>
    <TouchableOpacity onPress={onEdit}>
      <FontAwesome5 name="pen" size={20} color="black" />
    </TouchableOpacity>
  </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  text: {
    paddingVertical: 20,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "mon-b",
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: 15,
    // minHeight: 100,
    // height: "60%",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
