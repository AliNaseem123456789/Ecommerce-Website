import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ContactUs() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        mt: 6, // Space from navbar
      }}
    >
      {/* LEFT SIDE – FAQ */}
      <Box sx={{ flex: 1, pr: { xs: 0, md: 3 } }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "#8c8c8c", fontWeight: 500, mb: 0.5, fontSize: "0.75rem" }}
        >
          INFORMATION QUESTIONS
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#2c7cf1", mb: 1.5, fontSize: "1rem" }}
        >
          FREQUENTLY ASKED QUESTIONS
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Are your beauty products safe for sensitive skin?
            </AccordionSummary>
            <AccordionDetails>
              Yes, our products are formulated to be gentle and safe for most skin types.
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              What materials are used in your kitchen tools?
            </AccordionSummary>
            <AccordionDetails>
              High-quality stainless steel, BPA-free plastics, and food-safe silicone.
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Do you offer international shipping?
            </AccordionSummary>
            <AccordionDetails>
              Yes, we ship to most countries worldwide.
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              How do I clean and maintain my kitchen tools?
            </AccordionSummary>
            <AccordionDetails>
              Most tools are dishwasher-safe. Hand wash delicate items.
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Are your beauty products cruelty-free?
            </AccordionSummary>
            <AccordionDetails>
              Yes, all our products are 100% cruelty-free.
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      {/* DIVIDER */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" }, mx: 2 }}
      />

      {/* RIGHT SIDE – CONTACT FORM */}
      <Box sx={{ flex: 1, pl: { xs: 0, md: 3 } }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "#8c8c8c", fontWeight: 500, mb: 0.5, fontSize: "0.75rem" }}
        >
          INFORMATION ABOUT US
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#2c7cf1", mb: 1.5, fontSize: "1rem" }}
        >
          CONTACT US FOR ANY QUESTIONS
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Your Name"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 0.5 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Your Email"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 0.5 }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 0.5 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Company"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 0.5 }}
            />
          </Box>

          <TextField
            fullWidth
            size="small"
            multiline
            rows={6}
            label="Your Message"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 0.5 }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2c7cf1",
              textTransform: "none",
              px: 3,
              py: 1,
              fontSize: "0.8rem",
              borderRadius: "5px",
              alignSelf: "flex-start",
            }}
          >
            Ask a Question
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
