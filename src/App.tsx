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

  const calculateGST = () => {
    if (selectedOption && selectedOption.label.includes("-")) {
      return String((productPrice * selectedOption.value) / 100 / 2);
    } else if (selectedOption && selectedOption.label.includes("+")) {
      return String((productPrice * selectedOption.value) / 100 / 2);
    }

    return "0";
  };

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
              <Typography variant={"h6"} fontWeight={"bold"}>
                CGST: {parseFloat(calculateGST()).toFixed(2)} /-
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h6"} fontWeight={"bold"}>
                SGST: {parseFloat(calculateGST()).toFixed(2)} /-
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h6"} fontWeight={"bold"}>
                Total GST:{" "}
                {parseFloat(
                  String(Number(calculateGST()) + Number(calculateGST()))
                ).toFixed(2)}{" "}
                /-
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h6"} fontWeight={"bold"}>
                Total Amount:{" "}
                {parseFloat(
                  String(
                    selectedOption.label.includes("+")
                      ? productPrice + Number(calculateGST()) * 2
                      : productPrice
                  )
                ).toFixed(2)}{" "}
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
