import React from "react";
import { TextField, Typography, Box, Button } from "@mui/material";

export default function ContactUs() {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 6,
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "#8c8c8c", fontWeight: 500, mb: 0.5, fontSize: "0.75rem" }}
      >
        INFORMATION ABOUT US
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#2c7cf1", mb: 2, fontSize: "1.2rem" }}
      >
        CONTACT US FOR ANY QUESTIONS
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: "column", md: "row" } }}>
          <TextField
            fullWidth
            size="small"
            label="Your Name"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            size="small"
            label="Your Email"
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: "column", md: "row" } }}>
          <TextField
            fullWidth
            size="small"
            label="Phone Number"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            size="small"
            label="Company"
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <TextField
          fullWidth
          size="small"
          multiline
          rows={6}
          label="Your Message"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2c7cf1",
            textTransform: "none",
            px: 3,
            py: 1,
            fontSize: "0.9rem",
            borderRadius: "6px",
            width: "fit-content",
          }}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
}
