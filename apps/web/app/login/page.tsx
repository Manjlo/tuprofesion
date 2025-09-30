"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { Button, Checkbox, Form, Input, Select, Row, Col, Space } from "antd";
import {
  ArrowLeftOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [form] = Form.useForm();
  const [otpForm] = Form.useForm();

  const [shake, setShake] = useState(false);

  const onFinishPhone = (values: any) => {
    console.log("Enviando OTP a:", values);
    setStep("otp");
  };

  const onFinishFailed = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  };

  const onFinishOtp = (values: any) => {
    const otp = Object.values(values).join("");
    console.log("Verificando OTP:", otp);
    // Aquí la lógica de verificación y redirección
  };

  const handleOtpInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    if (value.length === 1 && index < 5) {
      const nextSibling = document.querySelector<HTMLInputElement>(
        `input[name=otp-${index + 1}]`,
      );
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  };

  const countryPrefix = (
    <Form.Item name="prefix" noStyle initialValue="+57">
      <Select
        style={{ width: 100 }}
        size="large"
        className={styles.countrySelector}
      >
        <Option value="+57">🇨🇴 +57</Option>
        <Option value="+1">🇺🇸 +1</Option>
        <Option value="+34">🇪🇸 +34</Option>
        <Option value="+52">🇲🇽 +52</Option>
      </Select>
    </Form.Item>
  );

  return (
    <main className={styles.main}>
      <div className={styles.authContainer}>
        <div className={styles.logoWrapper}>
          <Image
            src="/tp_logo1.png"
            alt="Company Logo"
            width={350}
            height={60}
          />
        </div>

        {step === "phone" ? (
          <>
            <p className={styles.title}>Ingresa tu número para continuar 🚀 </p>
            <Form
              form={form}
              onFinish={onFinishPhone}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Por favor ingresa tu número" },
                ]}
              >
                <Input
                  addonBefore={countryPrefix}
                  size="large"
                  className={styles.minimalistInput}
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                className={shake ? styles.shake : ""}
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(),
                  },
                ]}
              >
                <Checkbox onChange={(e) => setTermsAccepted(e.target.checked)}>
                  <span>He leído y acepto los </span>
                  <a href="/terms" target="_blank">
                    Términos y Condiciones
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  disabled={!termsAccepted}
                >
                  SIGUIENTE
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <div className={styles.backArrow} onClick={() => setStep("phone")}>
              <ArrowLeftOutlined />
            </div>
            <h1 className={styles.title}>Verificar Código</h1>
            <p className={styles.subtitle}>
              Ingresa el código de 6 dígitos que enviamos a tu WhatsApp.
            </p>
            <Form form={otpForm} onFinish={onFinishOtp}>
              <Space.Compact
                block
                size="large"
                style={{ justifyContent: "center", marginBottom: "1.5rem" }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <Form.Item
                    key={index}
                    name={`otp-${index}`}
                    noStyle
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input
                      style={{ width: "14%", textAlign: "center" }}
                      maxLength={1}
                      onChange={(e) => handleOtpInputChange(e, index)}
                    />
                  </Form.Item>
                ))}
              </Space.Compact>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Verificar
                </Button>
              </Form.Item>
            </Form>
            <p className={styles.resendText}>
              ¿No recibiste el código?{" "}
              <a
                onClick={() => setStep("phone")}
                className={styles.resendButton}
              >
                Reenviar
              </a>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
