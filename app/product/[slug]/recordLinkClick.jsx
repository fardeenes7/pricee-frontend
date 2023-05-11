"use client";
import { useEffect, useState } from "react";
import { refreshToken } from "@/components/auth/auth";

export async function recordLinkClickWithoutToken(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/link_click/${id}/`,
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

export async function recordLinkClickWithToken(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/link_click/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 300 },
      }
    );
    if (res.status == 401) {
      await refreshToken();
      await recordLinkClickWithToken(id);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function RecordLinkClick(props) {
  const id = props.id;
  //   const [id, setId] = useState(props.id);
  const token = localStorage.getItem("access_token");
  if (!token) {
    await recordLinkClickWithoutToken(id);
    return;
  } else {
    await recordLinkClickWithToken(id);
  }
  return null;
}
