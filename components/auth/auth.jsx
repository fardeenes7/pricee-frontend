export async function loginwithGoogle(accesstoken) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/google`, {
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
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
    })
    .catch((err) => console.log(err));
}
