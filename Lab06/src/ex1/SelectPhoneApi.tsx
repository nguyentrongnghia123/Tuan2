import React, { useCallback, useEffect, useState } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);   // TODO 1
    setPhone(null);
    try {             // TODO 2
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể kết nối máy chủ");
    }
  }, []);

  useEffect(() => { load(); }, [load]); // TODO 3

  if (error) return <ErrorBox message={error} onRetry={load} />; // TODO 4
  if (!phone) return <Loading />;                                  // TODO 5
  return <SelectPhoneApp phone={phone} />;                         // TODO 6
}
