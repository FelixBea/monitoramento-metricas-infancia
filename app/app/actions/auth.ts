"use server";

import { redirect } from "next/navigation";
import axios from "axios";

export async function signin(_previousState: any, formData: FormData) {
  const body = {
    user: formData.get("user") as string,
    password: formData.get("password") as string,
  };
  console.log(body);
  const baseUrl = process.env.API_BASE_URL;
  const authUrl = `${baseUrl}/auth/token`;

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  };

  try {
    const response = await axios.post(authUrl, body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
