import React from "react";
import { Chart } from "./components/Chart";
import { PostData } from "./components/PostData";
import { Stack } from "@mui/material";

export const Admin = () => {
  return (
    <Stack spacing={2}>
      <Chart />
      <PostData />
    </Stack>
  );
};
