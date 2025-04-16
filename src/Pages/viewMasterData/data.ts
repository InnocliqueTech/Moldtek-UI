export const  mockData = {
    "masterDataDetails": {
      "job_master_id": 1,
      "unit_effectivity_number": "619797",
      "customer_name": "Aarafh Foods",
      "customer_logo": null,
      "item_code": null,
      "brand_description": "1250 ML_GP (With WAD), Mix - Veg Pickle, Aarafh Foods , IML Containers.",
      "jar_cap": "101",
      "structure": null,
      "label_type": "Thin Wall",
      "repeat_length": 927,
      "ups": 1,
      "tracks": 1,
      "labels_per_meter": 200
  },
  "masterDataPrinting": {
      "printingDetails": {
          "machine_settings_id": 1,
          "job_master_id": 1,
          "mounting_tape": "Medium 0.38MM",
          "cylinder_teeth": 292,
          "tension": 23,
          "unwinder": 15,
          "rewinder": 10,
          "infeed": 54,
          "outfeed": 24,
          "static_charge": 45,
          "format_correct": 64
      },
      "printingSubstrateSettings": {
          "print_substrate_id": 1,
          "machine_settings_id": 1,
          "substrate_type": "PET",
          "supplier": "Karthik",
          "dyne_level": "24",
          "width": 1200,
          "thickness": 12,
          "density": 27.2,
          "gsm": 28
      },
      "stationWiseMetrics": [
          {
              "station_id": 1,
              "station_no": 1,
              "color_pantone": "C",
              "lf_value": 3,
              "ink_supplier": "Jasmine",
              "lpcm": 8,
              "volume": "200",
              "uv_led": "UV",
              "uv_led_intensity": "25"
          },
          {
              "station_id": 2,
              "station_no": 2,
              "color_pantone": "G",
              "lf_value": 5,
              "ink_supplier": "Gulabi",
              "lpcm": 7,
              "volume": "900",
              "uv_led": "LED",
              "uv_led_intensity": "21"
          },
          {
              "station_id": 3,
              "station_no": 3,
              "color_pantone": "Y",
              "lf_value": 8,
              "ink_supplier": "Banthi",
              "lpcm": 5,
              "volume": "800",
              "uv_led": "UV",
              "uv_led_intensity": "66"
          }
      ]
  },
  "masterDataLamination": {
      "laminationConditions": {
          "lamination_id": 1,
          "job_master_id": 1,
          "zone1_temp": 23,
          "zone2_temp": 24,
          "nip_pressure_bar": 6.0,
          "speed": 90,
          "lami_set_tension": "7",
          "rewinder_tension": "8",
          "printed_film_tension": "6",
          "laminate_film_tension": "7.5",
          "viscosity_range": "16-80",
          "adhesive_gsm": "224",
          "composite_gsm": "19"
      },
      "laminationSubstrate": {
          "substrate_id": 1,
          "lamination_id": 1,
          "substrate_type": "SET",
          "supplier": "NK",
          "dyne_level": "32",
          "width": 220,
          "thickness": 9,
          "density": 20.0,
          "gsm": 40.0
      },
      "bondingMaterials": [
          {
              "bonding_id": 1,
              "lamination_id": 1,
              "type": "Adhesive",
              "code": "1009N",
              "brand": "Poistic",
              "ratio": 10.0
          },
          {
              "bonding_id": 2,
              "lamination_id": 1,
              "type": "Hardner",
              "code": "KN75",
              "brand": "Poistic",
              "ratio": 1.2
          },
          {
              "bonding_id": 3,
              "lamination_id": 1,
              "type": "Ethyl",
              "code": "261",
              "brand": "Poistic",
              "ratio": 3.0
          }
      ]
  },
  "masterDataDyeCutting": {
      "dye_cutting_id": 1,
      "job_master_id": 1,
      "machine_type": "Rotary",
      "machine_name": "DC-500",
      "dye_code": "XYZ",
      "run_speed": 120
  }
}
export const versionData = 
    {
        "statusCode": 200,
        "statusMessage": "Data Successfully Retrieved",
        "totalRecords": 12,
        "data": [
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V12"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V11"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V10"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V9"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V8"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V7"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V6"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V5"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V4"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V3"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V2"
            },
            {
                "customer_name": "Nestle",
                "created_at": null,
                "unit_effective_number": 20240801,
                "version_no": "V1"
            }
        ]
    }

    export const jobsList = {
        "statusCode": 200,
        "statusMessage": "Records Fetched Successfully",
        "totalRecords": 2,
        "data": [
            {
                "dailyPlanId": 1,
                "indentNumber": "1962",
                "unitEffectivityNumber": "20240801",
                "ppcIndentQtyNos": 6565,
                "balanceIndentQtyPlanned": 6086,
                "noOfColorsSetting": 6,
                "noOfSpecialColors": 1,
                "webLengthForColorMatch": 50,
                "colorMatching": "20",
                "shadeMatching": "20",
                "numberOfRolls": 1,
                "targetLabelsQty": 5437,
                "targetFilmMtrs": 5240,
                "filmRequiredPrintingMtrs": 5240,
                "plainFilmRequiredStoreMtrs": 5240,
                "impressionSettingMtrs": 70,
                "registrationSettingMtrs": 60,
                "shadeMatchingMtrs": 170,
                "processWastageMtrs": 50,
                "setupWastageMtrs": 50,
                "balanceIndentQtyMtrs": 4778,
                "mouldingWastagePercent": 96.0,
                "printedFilmIssuedGoodMtrs": 4585,
                "dieCutWastage": 5,
                "laminationWastage": 150,
                "unforeseenInspectionMtrs": 50,
                "createdAt": "2025-04-13T05:30:00",
                "updatedAt": "2025-04-15T08:10:01",
                "status": "Completed",
                "labelType": "PB",
                "jobRunDate": "2025-04-13T05:30:00",
                "shift": "Morning",
                "workOrderNumber": 123,
                "machineName": "UVG-2",
                "jobType": "Repeat"
            },
            {
                "dailyPlanId": 2,
                "indentNumber": "1962/A",
                "unitEffectivityNumber": "20240801",
                "ppcIndentQtyNos": 6748,
                "balanceIndentQtyPlanned": 739,
                "noOfColorsSetting": 7,
                "noOfSpecialColors": 8,
                "webLengthForColorMatch": 2,
                "colorMatching": "29",
                "shadeMatching": "38",
                "numberOfRolls": 1,
                "targetLabelsQty": 2738,
                "targetFilmMtrs": 2930,
                "filmRequiredPrintingMtrs": 7289,
                "plainFilmRequiredStoreMtrs": 3739,
                "impressionSettingMtrs": 930,
                "registrationSettingMtrs": 82,
                "shadeMatchingMtrs": 28,
                "processWastageMtrs": 28,
                "setupWastageMtrs": 28,
                "balanceIndentQtyMtrs": 3829,
                "mouldingWastagePercent": 12.0,
                "printedFilmIssuedGoodMtrs": 1113,
                "dieCutWastage": 7,
                "laminationWastage": 281,
                "unforeseenInspectionMtrs": 37,
                "createdAt": "2025-04-15T08:13:37",
                "updatedAt": "2025-04-15T08:13:37",
                "status": "In progress",
                "labelType": "LB",
                "jobRunDate": "2025-04-15T05:30:00",
                "shift": "Morning",
                "workOrderNumber": 1239,
                "machineName": "UVG-1",
                "jobType": "Repeat"
            }
        ]
    }
