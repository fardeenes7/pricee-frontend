export const checkPermission = async () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("access_token");
  if (!token) return null;
  console.log("checking");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MANAGE_URL}/permission/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.status);
    if (res.status == 200) {
      return true;
    } else {
      //go to catch block
      throw new Error("error");
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
        `${process.env.NEXT_PUBLIC_API_MANAGE_URL}/permission/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(res.status);

      if (res2.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
};
