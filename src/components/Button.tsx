import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({
    title,
    onPress,
    disabled = false,
    loading = false,
    className,
    variant = 'primary',
}: ButtonProps) {
    
    if (variant === 'primary') {
        return (
            <TouchableOpacity
                onPress={disabled ? undefined : onPress}
                disabled={disabled}
                className={`rounded-xl overflow-hidden ${className} ${
                    disabled ? "opacity-50" : ""
                }`}
                style={{ elevation: disabled ? 0 : 6, shadowColor: '#39B2A7', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
            >
                <LinearGradient
                    colors={disabled ? ["#D1D5DB", "#9CA3AF"] : ["#65BF7A", "#39B2A7"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-4 px-6 items-center justify-center"
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text className="text-white text-lg font-bold">
                            {title}
                        </Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    if (variant === 'outline') {
        return (
            <TouchableOpacity
                onPress={disabled ? undefined : onPress}
                disabled={disabled}
                className={`py-4 px-6 rounded-xl items-center justify-center border-2 ${className} ${
                    disabled 
                        ? "border-gray-300 bg-gray-50" 
                        : "border-[#39B2A7] bg-transparent"
                }`}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={disabled ? "#9CA3AF" : "#39B2A7"} />
                ) : (
                    <Text
                        className={`text-lg font-bold ${
                            disabled ? "text-gray-400" : "text-[#39B2A7]"
                        }`}
                    >
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        );
    }

    // Secondary variant
    return (
        <TouchableOpacity
            onPress={disabled ? undefined : onPress}
            disabled={disabled}
            className={`py-4 px-6 rounded-xl items-center justify-center ${className} ${
                disabled ? "bg-gray-200" : "bg-white"
            }`}
            style={{ 
                elevation: disabled ? 0 : 2, 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 4 
            }}
        >
            {loading ? (
                <ActivityIndicator size="small" color={disabled ? "#9CA3AF" : "#39B2A7"} />
            ) : (
                <Text
                    className={`text-lg font-bold ${
                        disabled ? "text-gray-400" : "text-[#39B2A7]"
                    }`}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}