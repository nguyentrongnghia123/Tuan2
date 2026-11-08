import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import { goHome } from "../navigation/helpers";
import { useAuth } from "../store/hooks";
import { login } from "../services/authService";
import { getErrorMessage } from "../api/client";
import { validateEmail, validatePassword } from "../utils/validators";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme";

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  const { signIn } = useAuth();
  // BT8.1 — state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // câu hỏi bổ sung số 5
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(e);
    if (e.email || e.password) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await login(email, password);
      signIn(user, token);
      if (route.params?.redirectTo === "Checkout") navigation.replace("Checkout", { total: route.params.total ?? 0 });
      else goHome(navigation);
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <Text style={s.logo}>📚</Text>
      <Text style={s.title}>Chào mừng trở lại</Text>
      <Text style={s.sub}>Tài khoản thử: demo@bookstore.vn / 123456</Text>

      <FormField label="Email" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" />
      <FormField
        label="Mật khẩu" value={password} onChangeText={setPassword} error={errors.password}
        secureTextEntry={!showPassword}
        right={
          <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8} accessibilityLabel="Hiện/ẩn mật khẩu">
            <Text style={{ fontSize: 18, opacity: showPassword ? 1 : 0.5 }}>👁</Text>
          </Pressable>
        }
      />
      {submitError ? <Text style={s.submitError}>{submitError}</Text> : null}
      <PrimaryButton title="Đăng nhập" onPress={submit} loading={loading} />

      <Pressable onPress={() => navigation.navigate("Register", route.params)}>
        <Text style={s.link}>Chưa có tài khoản? <Text style={s.linkBold}>Đăng ký</Text></Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content: { padding: 20, gap: 14, backgroundColor: colors.bg, flexGrow: 1 },
  logo: { fontSize: 56, textAlign: "center", marginTop: 10 },
  title: { fontSize: 24, fontWeight: "800", color: colors.text, textAlign: "center" },
  sub: { color: colors.muted, textAlign: "center", marginBottom: 8 },
  submitError: { color: colors.red, textAlign: "center", fontWeight: "600" },
  link: { textAlign: "center", color: colors.muted, marginTop: 6 },
  linkBold: { color: colors.indigo, fontWeight: "800" },
});
