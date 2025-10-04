import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface AuthModalProps {
    visible: boolean;
    type: "success" | "warning" | "error";
    title: string;
    message: string;
    primaryButtonText: string;
    onPrimaryButtonPress: () => void;
    onClose: () => void;
    secondaryButtonText?: string;
    onSecondaryButtonPress?: () => void;
}

const AuthModal = ({
    visible,
    type,
    title,
    message,
    primaryButtonText,
    onPrimaryButtonPress,
    onClose,
    secondaryButtonText,
    onSecondaryButtonPress,
}: AuthModalProps) => {
    const getIconName = () => {
        switch (type) {
            case "success":
                return "check-circle";
            case "warning":
                return "alert-circle";
            case "error":
                return "x-circle";
            default:
                return "info";
        }
    };

    const getIconColor = () => {
        switch (type) {
            case "success":
                return "#10B981";
            case "warning":
                return "#F59E0B";
            case "error":
                return "#EF4444";
            default:
                return "#3B82F6";
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/50 px-6">
                <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
                    <View className="items-center mb-4">
                        <Feather
                            name={getIconName()}
                            size={60}
                            color={getIconColor()}
                        />
                    </View>
                    
                    <Text className="text-xl font-bold text-center text-gray-800 mb-2">
                        {title}
                    </Text>
                    
                    <Text className="text-base text-center text-gray-600 mb-6">
                        {message}
                    </Text>
                    
                    <View className="gap-3">
                        <TouchableOpacity
                            onPress={onPrimaryButtonPress}
                            className="bg-blue-600 py-3 rounded-xl"
                        >
                            <Text className="text-white text-center font-semibold">
                                {primaryButtonText}
                            </Text>
                        </TouchableOpacity>
                        
                        {secondaryButtonText && (
                            <TouchableOpacity
                                onPress={onSecondaryButtonPress}
                                className="bg-gray-200 py-3 rounded-xl"
                            >
                                <Text className="text-gray-700 text-center font-semibold">
                                    {secondaryButtonText}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    
                    <TouchableOpacity
                        onPress={onClose}
                        className="absolute top-4 right-4"
                    >
                        <Feather name="x" size={24} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AuthModal;