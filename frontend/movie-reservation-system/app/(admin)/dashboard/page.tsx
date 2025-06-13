import AddMovieForm from "@/components/admin-components/AddMovieForm";
import AddShowing from "@/components/admin-components/AddShowing";
import React from "react";

export default function Page() {
  return (
    <div>
      <div>admin dashboard</div>
      <AddMovieForm />
      <AddShowing />
    </div>
  );
}
