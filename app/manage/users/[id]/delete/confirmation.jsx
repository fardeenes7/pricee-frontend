"use client";

import { useState } from "react";

export default function ConfirmDelete({ id }) {
  const [status, setStatus] = useState("loading");

  const handleDelete = async () => {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "error") {
    return <Error />;
  }
  if (status === "success") {
    return <Success />;
  }
}

function Loading() {
  return (
    <div className="loading">
      <p>Loading...</p>
    </div>
  );
}

function Error() {
  return (
    <div className="error">
      <p>Error</p>
    </div>
  );
}

function Success() {
  return (
    <div className="success">
      <p>Success</p>
    </div>
  );
}
