"use client";
import { useRouter } from "next/navigation";
export default function user() {
  //push user to /user/profile page
  const router = useRouter();
  router.push("/user/profile");
}
