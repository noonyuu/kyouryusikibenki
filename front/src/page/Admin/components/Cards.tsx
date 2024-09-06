import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

type PoopData = {
  Word: string;
  Day: string;
  DeleteAt: string;
  ID: string;
};

export const Cards = (props: PoopData) => {
  return (
    <Card>
      <CardContent>
        <Typography>{props.Day}</Typography>
        <Typography>{props.Word}</Typography>
      </CardContent>
    </Card>
  );
};
