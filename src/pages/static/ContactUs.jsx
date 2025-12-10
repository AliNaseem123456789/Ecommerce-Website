import React from "react";
import { TextField, Typography, Box, Button } from "@mui/material";

export default function ContactUs() {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 6,
        px: { xs: 2, md: 6 },
        maxWidth: 900,
        mx: "auto",
      }}
    >
      {/* Heading */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "#8c8c8c",
          fontWeight: 500,
          mb: 0.5,
          fontSize: { xs: "0.7rem", md: "0.75rem" },
        }}
      >
        INFORMATION ABOUT US
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#2c7cf1",
          mb: 3,
          fontSize: { xs: "1.2rem", md: "1.6rem" },
        }}
      >
        Contact Us For Any Questions
      </Typography>

      {/* Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        {/* Name & Email */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
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

        {/* Phone & Company */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
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

        {/* Message */}
        <TextField
          fullWidth
          size="small"
          multiline
          rows={5}
          label="Your Message"
          InputLabelProps={{ shrink: true }}
        />

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#111", // Dark button
            color: "#fff",
            textTransform: "none",
            px: 4,
            py: 1.5,
            fontSize: { xs: "0.85rem", md: "0.95rem" },
            borderRadius: "6px",
            alignSelf: "flex-start",
            "&:hover": { backgroundColor: "#222" },
          }}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
}
