import { InputAdornment, TextField } from "@mui/material";
import { Search } from "lucide-react";

interface SearchInputPropsT {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputPropsT) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
      sx={{ maxWidth: "224px" }}
      size="small"
      placeholder="Search"
    />
  );
};
