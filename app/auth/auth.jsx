import { getUser } from "./getUser";
// import Toast from "@/components/Toast";

export async function refreshToken() {
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
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.reload();
    return null;
  }
}

export async function loginwithSocial(accesstoken) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/social`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_token: accesstoken,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
      getUser();
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

// const logoutSuccessToast = () => {
//   Toast("Successfully logged out", "success", "", "reload");
// };

export const Logout = async () => {
  console.log("logout");
  const refresh_token = localStorage.getItem("refresh_token");
  const access_token = localStorage.getItem("access_token");
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refresh_token }),
  }).then((response) => {
    if (response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      // logoutSuccessToast();
      window.location.reload();
    } else {
      refreshToken();
      Logout();
    }
  });
};

export async function registerwithEmail(email, password, name) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
      getUserData();
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

export const updateUser = async (data) => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("access_token");
  if (!token) return null;
  console.log(data);

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile/update`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: formData,
      }
    );
    const user = await res.json();
    if (user.id) {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );
      const user = await res2.json();
      if (user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else {
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
