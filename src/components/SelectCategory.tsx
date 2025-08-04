import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { useCategories } from "@/features/categories/hook/useListCategory";

interface Props {
  control: any;
  name: string;
}

export function CategorySelect({ control, name }: Props) {
  const dataCategory = useCategories();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          value={field.value ?? ""}
          onValueChange={(val) => {
            field.onChange(val);
          }}
        >
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="z-[99999]">
            {dataCategory.data?.data?.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
