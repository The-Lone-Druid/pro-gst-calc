import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { excludeOptions, includeOptions } from "./utils";
import { CurrencyRupee } from "@mui/icons-material";

function App() {
  const [productPrice, setProductPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    label: string;
    value: number;
  }>();
  const [gstExcludeOptions] = useState(excludeOptions);
  const [gstIncludeOptions] = useState(includeOptions);

  function calculateCgstSgst(amount: number, gstRate: number) {
    // Ensure GST rate is a decimal (e.g., 0.18 for 18%)
    gstRate = gstRate / 100;
    let revisedRate = 0;

    // Formula to exclude GST
    if (selectedOption?.label.includes("+")) {
      revisedRate = amount * (1 + gstRate) - Number(productPrice);
    } else {
      revisedRate = Number(productPrice) - amount / (1 + gstRate);
    }

    return revisedRate;
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={"h4"} fontWeight={"bold"}>
            GST Calculator
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={"productPrice"}
            value={productPrice}
            onChange={(e) => {
              if (/^[0-9]*$/.test(e.target.value)) {
                setProductPrice(e.target.value);
              }
            }}
            label={"GST Amount"}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupee />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant={"h6"} fontWeight={"semibold"} mb={1}>
            Exclude GST
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            {gstExcludeOptions.map((option) => (
              <Button
                disabled={!productPrice}
                variant={
                  selectedOption?.id === option.id ? "contained" : "outlined"
                }
                sx={{
                  borderColor:
                    selectedOption?.id === option.id
                      ? "primary.main"
                      : "grey.800",
                  color:
                    selectedOption?.id === option.id ? "white" : "grey.800",
                }}
                key={option.id}
              >
                <Typography
                  variant={"body1"}
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                >
                  {option.label}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={"h6"} fontWeight={"semibold"} mb={1}>
            Include GST
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            {gstIncludeOptions.map((option) => (
              <Button
                disabled={!productPrice}
                variant={
                  selectedOption?.id === option.id ? "contained" : "outlined"
                }
                sx={{
                  borderColor:
                    selectedOption?.id === option.id
                      ? "primary.main"
                      : "grey.800",
                  color:
                    selectedOption?.id === option.id ? "white" : "grey.800",
                }}
                key={option.id}
              >
                <Typography
                  variant={"body1"}
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                >
                  {option.label}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {selectedOption && (
          <>
            <Grid item xs={12}>
              <Typography variant={"body1"} fontWeight={"bold"}>
                CGST:{" "}
                {parseFloat(
                  String(
                    calculateCgstSgst(
                      Number(productPrice),
                      selectedOption.value
                    ) / 2
                  )
                ).toFixed(2)}
                /-
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} fontWeight={"bold"}>
                SGST:{" "}
                {parseFloat(
                  String(
                    calculateCgstSgst(
                      Number(productPrice),
                      selectedOption.value
                    ) / 2
                  )
                ).toFixed(2)}
                /-
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} fontWeight={"bold"}>
                Total GST:{" "}
                {parseFloat(
                  String(
                    calculateCgstSgst(
                      Number(productPrice),
                      selectedOption.value
                    )
                  )
                ).toFixed(2)}{" "}
                /-
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} fontWeight={"bold"}>
                {selectedOption.label.includes("+")
                  ? "Including GST"
                  : "Excluding GST"}
                {": "}
                {parseFloat(
                  String(
                    selectedOption.label.includes("+")
                      ? calculateCgstSgst(
                          Number(productPrice),
                          selectedOption.value
                        ) + Number(productPrice)
                      : Number(productPrice) -
                          calculateCgstSgst(
                            Number(productPrice),
                            selectedOption.value
                          )
                  )
                ).toFixed(2)}
                /-
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default App;
