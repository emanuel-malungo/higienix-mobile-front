import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  TextInputProps,
} from "react-native";

interface InputProps extends Omit<TextInputProps, 'onBlur'> {
  placeholder: string;
  error?: string;
  nameIcon: keyof typeof Feather.glyphMap;
  className?: string;
  onBlur?: () => void;
}

const Input = ({
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  value,
  onChangeText,
  onBlur,
  nameIcon,
  className,
  ...rest
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={className}>
      <View
        className={`flex-row items-center border-2 rounded-xl px-4 py-4 bg-gray-50/80 transition-all duration-200
                ${error 
                  ? "border-red-400 bg-red-50/80" 
                  : isFocused 
                    ? "border-[#39B2A7] bg-white shadow-sm" 
                    : "border-gray-200 bg-gray-50/80"
                }`}
      >
        <Feather 
          name={nameIcon} 
          size={20} 
          color={error ? "#EF4444" : isFocused ? "#39B2A7" : "#6B7280"} 
          style={{ marginRight: 12 }} 
        />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          style={{ 
            flex: 1, 
            color: "#374151",
            fontSize: 16,
            fontWeight: "500"
          }}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setHidePassword(!hidePassword)}
            className="p-1"
          >
            <Feather 
              name={hidePassword ? "eye-off" : "eye"} 
              size={20} 
              color={isFocused ? "#39B2A7" : "#6B7280"} 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View className="flex-row items-center mt-2 px-1">
          <Feather name="alert-circle" size={14} color="#EF4444" />
          <Text className="text-red-500 text-sm ml-1 font-medium">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Input;