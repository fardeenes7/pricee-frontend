import { getUser } from "./getUser";

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
    } else {
      // If the response is not OK, try to refresh the access token
      return fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/token/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refresh_token }),

          // body: JSON.stringify({ refresh: refreshToken }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("access_token", data.access);
          const newRequestOptions = {
            method: "POST",
            headers: { Authorization: `Bearer ${data.access}` },
          };
          return fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/logout`,
            newRequestOptions
          ).then((response) => {
            if (response.ok) {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("user");
            }
          });
        });
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
