export const getUser = async () => {
  if (typeof window === "undefined") return null;

  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }

  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    });
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
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

      const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const user = await res2.json();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return null;
    }
  }
};
