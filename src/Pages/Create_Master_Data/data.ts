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

  export const listOfData=
  {
    "statusCode": 200,
    "statusMessage": "Fetched data successfully",
    "totalRecords": 4,
    "data": [
        {
            "job_master_id": 1,
            "unit_effectivity_number": "619797",
            "customer_name": "Aarafh Foods",
            "customer_logo": null,
            "item_code": null,
            "brand_description": "1250 ML_GP (With WAD), Mix - Veg Pickle, Aarafh Foods , IML Containers.",
            "jar_cap": "101",
            "structure": null,
            "label_type": "Mono Layer",
            "repeat_length": 927,
            "ups": 1,
            "tracks": 1,
            "labels_per_meter": 200,
            "version_no": 1,
            "created_at": "2025-04-09T19:57:09",
            "updated_at": "2025-04-09T19:57:09"
        },
        {
            "job_master_id": 2,
            "unit_effectivity_number": "665438",
            "customer_name": "ASIAN PAINTS",
            "customer_logo": null,
            "item_code": null,
            "brand_description": "20 LTR_AP_NDTS_L.WT <APEX ULTIMA PROTEK >ADVANCED (IML) ASIAN PAINTS",
            "jar_cap": "101",
            "structure": null,
            "label_type": "SURFACE PRINTED & LAMINATED WITH TRANSPARENT FILM",
            "repeat_length": 635,
            "ups": 3,
            "tracks": 4,
            "labels_per_meter": 150,
            "version_no": 1,
            "created_at": "2025-04-09T19:57:09",
            "updated_at": "2025-04-09T19:57:09"
        },
        {
            "job_master_id": 7,
            "unit_effectivity_number": null,
            "customer_name": null,
            "customer_logo": null,
            "item_code": null,
            "brand_description": null,
            "jar_cap": null,
            "structure": "PET + Foil",
            "label_type": null,
            "repeat_length": null,
            "ups": 200,
            "tracks": 100,
            "labels_per_meter": null,
            "version_no": 3,
            "created_at": null,
            "updated_at": null
        },
        {
            "job_master_id": 21,
            "unit_effectivity_number": "20240801",
            "customer_name": "Nestle",
            "customer_logo": "url",
            "item_code": "KK-50G-123",
            "brand_description": "0_LTR_AP_DTS_LWT <APEX ULTIMA PROTEK TOPCOAT> [CODE:P34779J] (IML) ASIAN PAINTS",
            "jar_cap": "N/A (For flexible packaging)",
            "structure": "PET",
            "label_type": "Mono Layer",
            "repeat_length": 53,
            "ups": 273,
            "tracks": 246,
            "labels_per_meter": 1267130,
            "version_no": 12,
            "created_at": null,
            "updated_at": "2025-04-14T09:43:15"
        }
    ]
}

    export const listOfLables = [
        {
            "labelTypeId": 1,
            "labelTypeName": " SURFACE PRINTED & LAMINATED WITH TRANSPARENT FILM"
        },
        {
            "labelTypeId": 2,
            "labelTypeName": "Mono Layer"
        },
        {
            "labelTypeId": 3,
            "labelTypeName": "WHITE SURFACE PRINTED & LAMINATED WITH TRANSPARENT FILM"}]
    
  

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
      "label_type": "Mono Layer",
      "repeat_length": 927,
      "ups": 1,
      "tracks": 1,
      "labels_per_meter": 200
  },
  "masterDataPrinting": {
      "printingDetails": {
          "machine_settings_id": 1,
          "job_master_id": 1,
          "printing_machine_name": "Medium 0.38MM",
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
export const labelTypesData =[
    {
        "labelTypeId": 1,
        "labelTypeName": " SURFACE PRINTED & LAMINATED WITH TRANSPARENT FILM"
    },
    {
        "labelTypeId": 2,
        "labelTypeName": "Mono Layer"
    },
    {
        "labelTypeId": 3,
        "labelTypeName": "WHITE SURFACE PRINTED & LAMINATED WITH TRANSPARENT FILM"}]

        export const customersSelectData =    [
            { customerId: 1, firstName: 'Aarafh', lastName: 'Foods', fullName: 'Aarafh Foods' },
            { customerId: 2, firstName: 'Asian', lastName: 'Paints', fullName: 'Asian Paints' }
          ];