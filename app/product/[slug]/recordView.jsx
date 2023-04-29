"use client";
import { useEffect } from "react";
import { refreshToken } from "@/components/auth/auth";

export async function recordProductViewWithoutToken(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/record_view/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
      }
    );
    if (res.status != 200) {
      console.log(res.status);
      throw new Error("Error");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function RecordProductView(props) {
  const id = props.id;
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      recordProductViewWithoutToken(id);
      return;
    }
    const record = async () => {
      console.log("recording");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/record_view/${id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 300 },
          }
        );
        if (res.status != 200) {
          console.log(res.status);
          throw new Error("Error");
        }
      } catch (error) {
        console.log(error);
        refreshToken();
        RecordProductView(props);
      }
    };
    record();
  }, []);

  return null;
}
