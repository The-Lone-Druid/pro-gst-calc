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
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { excludeOptions, includeOptions } from "./utils";
import { CurrencyRupee } from "@mui/icons-material";

function App() {
  const gstForm = useForm({
    defaultValues: {
      productPrice: 0,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  const [productPrice, setProductPrice] = useState<number>(0);
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
      revisedRate = amount * (1 + gstRate) - productPrice;
    } else {
      revisedRate = productPrice - amount / (1 + gstRate);
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
          <gstForm.Field
            name={"productPrice"}
            children={(field) => (
              <TextField
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(Number(e.target.value));
                  setProductPrice(Number(e.target.value));
                }}
                onBlur={field.handleBlur}
                label={"GST Amount"}
                type={"number"}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee />
                    </InputAdornment>
                  ),
                }}
              />
            )}
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
                disabled={gstForm.state.values.productPrice <= 0}
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
                disabled={gstForm.state.values.productPrice <= 0}
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
                    calculateCgstSgst(productPrice, selectedOption.value) / 2
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
                    calculateCgstSgst(productPrice, selectedOption.value) / 2
                  )
                ).toFixed(2)}
                /-
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} fontWeight={"bold"}>
                Total GST:{" "}
                {parseFloat(
                  String(calculateCgstSgst(productPrice, selectedOption.value))
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
                      ? calculateCgstSgst(productPrice, selectedOption.value) +
                          productPrice
                      : productPrice -
                          calculateCgstSgst(productPrice, selectedOption.value)
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
