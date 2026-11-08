import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import { goHome } from "../navigation/helpers";
import { useAuth } from "../store/hooks";
import { register } from "../services/authService";
import { getErrorMessage } from "../api/client";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme";

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  // BT8.2 — state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e = {
      name: validateRequired("họ tên")(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: confirm === password ? null : "Mật khẩu nhập lại không khớp",
    };
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await register(name, email, password);
      signIn(user, token); // đăng ký xong tự đăng nhập
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
      <Text style={s.title}>Tạo tài khoản</Text>
      <FormField label="Họ tên" value={name} onChangeText={setName} error={errors.name} autoCapitalize="words" />
      <FormField label="Email" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" />
      <FormField label="Mật khẩu" value={password} onChangeText={setPassword} error={errors.password} secureTextEntry />
      <FormField label="Nhập lại mật khẩu" value={confirm} onChangeText={setConfirm} error={errors.confirm} secureTextEntry />
      {submitError ? <Text style={s.submitError}>{submitError}</Text> : null}
      <PrimaryButton title="Đăng ký" onPress={submit} loading={loading} />

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={s.link}>Đã có tài khoản? <Text style={s.linkBold}>Đăng nhập</Text></Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content: { padding: 20, gap: 14, backgroundColor: colors.bg, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: "800", color: colors.text, textAlign: "center", marginVertical: 8 },
  submitError: { color: colors.red, textAlign: "center", fontWeight: "600" },
  link: { textAlign: "center", color: colors.muted, marginTop: 6 },
  linkBold: { color: colors.indigo, fontWeight: "800" },
});
