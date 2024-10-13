import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Giriş Yap",
    description: "SMM Yorum Uygulaması",
  };

export default function LoginPage(){
    return <LoginForm/>
}