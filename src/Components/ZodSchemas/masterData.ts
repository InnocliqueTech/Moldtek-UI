// src/schemas/dyeCuttingSchema.ts
import { z } from "zod";

// Define the Zod schema for Dye Cutting data
export const dyeCuttingSchema = z.object({
  machine_type: z
    .string()
    .min(1, { message: "Machine Type is required" })
    .regex(/^[A-Za-z\s]*$/, { message: "Machine Type should only contain alphabetic characters" }),

  machine_name: z
    .string()
    .min(1, { message: "Machine Name is required" })
    .regex(/^[A-Za-z\s]*$/, { message: "Machine Name should only contain alphabetic characters" }),

  dye_code: z
    .string()
    .min(1, { message: "Dye Code is required" })
    .regex(/^[A-Za-z\s]*$/, { message: "Dye Code should only contain alphabetic characters" }),

  run_speed: z
    .number()
    .min(1, { message: "Run Speed must be a positive number" })
    .int({ message: "Run Speed must be an integer" })
    .positive({ message: "Run Speed must be greater than 0" }),
});

const machineFieldsSchema = z.object({
    mounting_tape: z.enum(["Standard", "Actual"]).optional(),
    cylinder_teeth: z.number().min(0, { message: "Cylinder Teeth must be a positive number" }).optional(),
    tension: z.number().min(0, { message: "Tension must be a positive number" }).optional(),
    unwinder: z.number().min(0, { message: "Unwinder must be a positive number" }).optional(),
    infeed: z.number().min(0, { message: "Infeed must be a positive number" }).optional(),
    outfeed: z.number().min(0, { message: "Outfeed must be a positive number" }).optional(),
    rewinder: z.number().min(0, { message: "Rewinder must be a positive number" }).optional(),
    static_charge: z.number().min(0, { message: "Static Charge must be a positive number" }).optional(),
    format_correct: z.number().min(0, { message: "Format Correct must be a positive number" }).optional(),
  });
  
  const substrateFieldsSchema = z.object({
    substrate_type: z.string().min(1, { message: "Substrate Type is required" }).optional(),
    supplier: z.enum(["U-Flex Ltd.", "Huhtamaki", "Gulf Pack Supplier"]).optional(),
    dyne_level: z.string().optional(),
    width: z.number().min(0, { message: "Width must be a positive number" }).optional(),
    thickness: z.number().min(0, { message: "Thickness must be a positive number" }).optional(),
    density: z.number().min(0, { message: "Density must be a positive number" }).optional(),
  });
  
 export  const printingFormValuesSchema = z.object({
    printingDetails: machineFieldsSchema,
    printingSubstrateSettings: substrateFieldsSchema,
    stationWiseMetrics: z.array(
      z.object({
        station_no: z.number(),
        color_pantone: z.string().optional(),
        lf_value: z.number().optional(),
        ink_supplier: z.string().optional(),
        lpcm: z.number().optional(),
        volume: z.string().optional(),
        uv_led: z.enum(["LED", "UV"]).optional(),
        uv_led_intensity: z.number().optional(),
      })
    ),
  });
