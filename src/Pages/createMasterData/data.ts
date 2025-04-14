export const dataofCards= {
    "statusCode": 200,
    "message": "Metrics retrieved successfully",
    "data": {
        "totalJobs": 4,
        "nonLaminationJobs": 1,
        "laminationJobs": 1,
        "totalCustomers": 2
    }
  }

  export const listOfCompanies=
    [
        {
            "customerId": 1,
            "firstName": "Aarafh",
            "lastName": "Foods",
            "fullName": "Aarafh Foods"
        },
        {
            "customerId": 2,
            "firstName": "Asian",
            "lastName": "Paints",
            "fullName": "Asian Paints"
        }
    ]
    
  

  export const mockData = {
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
          "last_set_tension": "7",
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