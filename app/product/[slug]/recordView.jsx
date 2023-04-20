"use client";
import { useEffect } from "react";

export default function RecordProductView(props) {
  const id = props.id;
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    const record = async () => {
      console.log("recording");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/record_view/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 300 },
          }
        );
        if (res.status != 200) {
          // raise error
        }
      } catch (error) {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) return null;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/token/refresh`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: refresh }),
            }
          );
          const { access } = await res.json();
          localStorage.setItem("access_token", access);

          const res2 = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/record_view/${id}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`,
              },
              next: { revalidate: 300 },
            }
          );
          return null;
        } catch (error) {
          return null;
        }
      }
    };
    record();
  }, []);

  return null;
}
