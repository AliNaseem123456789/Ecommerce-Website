import React from "react";
import { Box, Typography } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: { xs: 3, md: 4 },
          fontSize: { xs: "1.8rem", md: "2rem" },
        }}
      >
        Privacy Policy
      </Typography>

      {/* Content */}
      <Typography
        sx={{
          lineHeight: 1.8,
          color: "#4b5563",
          fontSize: { xs: "0.9rem", md: "1rem" },
          textAlign: "justify",
        }}
      >
        This is a placeholder Privacy Policy. You can add information about how
        your site collects, stores, and uses customer data. Make sure to include
        details on data protection, cookies, third-party integrations, and any
        relevant user rights. On smaller screens, the layout will adjust to
        maintain readability and spacing.
      </Typography>
    </Box>
  );
}

