import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const breakAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) scale(0.5);
    opacity: 0;
  }
`;

const TeaCup = () => {
  const totalDuration = 30000;

  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const [teaHeight, setTeaHeight] = useState(100);
  const [isBroken, setIsBroken] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        const newTimeLeft = timeLeft - 100;
        setTimeLeft(newTimeLeft);

        const newTeaHeight = (newTimeLeft / totalDuration) * 100;
        setTeaHeight(newTeaHeight);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setIsBroken(true);
    }
  }, [timeLeft, totalDuration]);

  return (
    <Container maxWidth="xs" style={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h5">Tea Cup Timer</Typography>

      <Box
        sx={{
          width: "100px",
          height: "150px",
          border: "2px solid #000",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          margin: "2rem auto",
          background: isBroken ? "none" : "",
          animation: isBroken ? `${breakAnimation} 1s forwards` : "",
        }}
      >
        {!isBroken && (
          <Box
            sx={{
              width: "100%",
              height: `${teaHeight}%`,
              backgroundColor: "saddlebrown",
              position: "absolute",
              bottom: 0,
              transition: "height 0.1s linear",
            }}
          />
        )}
      </Box>

      <Typography variant="subtitle1">
        Time left: {(timeLeft / 1000).toFixed(1)}s
      </Typography>

      {isBroken && (
        <Typography variant="subtitle1" color="red">
          The cup is broken!
        </Typography>
      )}
    </Container>
  );
};

export default TeaCup;
