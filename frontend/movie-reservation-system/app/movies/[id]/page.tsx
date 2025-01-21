import React from "react";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = React.use(params);
  //get movie info
  return (
    <div>
      <h1>movie {id}</h1>
    </div>
  );
}
