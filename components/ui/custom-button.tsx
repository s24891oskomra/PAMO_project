import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

type Variant = "primary" | "outline" | "ghost";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: Variant;
  icon?: IoniconsName;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<
  Variant,
  { container: string; text: string; iconColor: string }
> = {
  primary: {
    container: "bg-primary",
    text: "text-white",
    iconColor: Colors.white,
  },
  outline: {
    container: "border border-primary bg-transparent",
    text: "text-primary",
    iconColor: Colors.primary.DEFAULT,
  },
  ghost: {
    container: "bg-transparent",
    text: "text-primary",
    iconColor: Colors.primary.DEFAULT,
  },
};

export default function CustomButton({
  title,
  variant = "primary",
  icon,
  iconPosition = "right",
  ...touchableProps
}: AppButtonProps) {
  const styles = variantStyles[variant];

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-full py-4 ${styles.container}`}
      activeOpacity={0.8}
      {...touchableProps}
    >
      {icon && iconPosition === "left" && (
        <Ionicons
          name={icon}
          size={18}
          color={styles.iconColor}
          style={{ marginRight: 8 }}
        />
      )}

      <Text className={`text-base font-semibold ${styles.text}`}>{title}</Text>

      {icon && iconPosition === "right" && (
        <Ionicons
          name={icon}
          size={18}
          color={styles.iconColor}
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  );
}
