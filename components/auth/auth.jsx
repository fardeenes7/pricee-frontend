const getUserData = async () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // If the response is not OK, try to refresh the access token
        return fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/token/refresh`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("access_token", data.access);
            const newRequestOptions = {
              headers: { Authorization: `Bearer ${data.access}` },
            };
            return fetch(url, newRequestOptions).then((response) =>
              response.json()
            );
          });
      }
    })
    .then((data) => {
      // setUser(data);
      console.log(data);
      window.sessionStorage.setItem("userData", JSON.stringify(data));
    })
    .catch((error) => console.error(error));
};

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
      getUserData();
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
      window.sessionStorage.removeItem("userData");
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
              window.sessionStorage.removeItem("userData");
            }
          });
        });
    }
  });
};

export async function loginwithEmail(email, password) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
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
