import { redirect } from "next/navigation";
import axios from 'axios';

export async function signin(formData: FormData) {
  "use server";
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
    headers: { "Content-Type": "application/json", 'Accept': "application/json" },
  };

  console.log("req: ", options);
  try {
    const response = await axios.post(authUrl, body);
    console.log("response: ", response);
    redirect("/");
  } catch (error) {
    console.error(error);
    redirect("/login");
  }
}
