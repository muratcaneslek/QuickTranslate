import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ModalProps,
} from "react-native";
import ConfirmationButton from "./Button";

interface ConfirmationModalProps extends ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  modalText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onClose,
  onConfirm,
  modalText = "Are you sure you want to clear history?",
  cancelButtonText = "Cancel",
  confirmButtonText = "Clear",
  ...props
}) => {
  return (
    <Modal {...props} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalText}</Text>
            <View style={styles.buttonContainer}>
              <ConfirmationButton
                text={cancelButtonText}
                onPress={onClose}
                variant="secondary"
              />
              <View style={styles.buttonSpacer} />
              <ConfirmationButton
                text={confirmButtonText}
                onPress={onConfirm}
                variant="orange"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface Styles {
  modalOverlay: ViewStyle;
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalText: TextStyle;
  buttonContainer: ViewStyle;
  buttonSpacer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
  },
  modalContent: {
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "#ccc",
  },
  buttonSpacer: {
    width: 20,
  },
});

export default ConfirmationModal;
