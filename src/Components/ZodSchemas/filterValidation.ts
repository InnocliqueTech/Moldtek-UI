import { z } from "zod";

export const filterSchema = z
  .object({
    fromDate: z.string().nonempty("From Date is required"),
    toDate: z.string().nonempty("To Date is required"),
    searchType: z.string().nonempty("Search type is required"),
    searchValue: z.string().min(1, "Search value is required"),
  })
  .superRefine(({ fromDate, toDate }, ctx) => {
    if (new Date(fromDate) > new Date(toDate)) {
      ctx.addIssue({
        path: ["toDate"],
        message: "To Date cannot be before From Date",
        code: "custom",
      });
    }
  });

export type FilterFormValues = z.infer<typeof filterSchema>;
