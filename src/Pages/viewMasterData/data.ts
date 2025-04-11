export const mockData = {
    "masterDataDetails": {
        "job_master_id": 1,
        "unit_effectivity_number": "UEN-20240801",
        "customer_name": "Nestle",
        "customer_logo": "url",
        "item_code": "KK-50G-123",
        "brand_description": "0_LTR_AP_DTS_LWT <APEX ULTIMA PROTEK TOPCOAT> [CODE:P34779J] (IML) ASIAN PAINTS",
        "jar_cap": "N/A (For flexible packaging)",
        "structure": "PET",
        "brand_name": "KitKat 50g Wrapper",
        "repeat_length": 53,
        "ups": 273,
        "tracks": 246,
        "labels_per_meter": 121
    },
    "masterDataPrinting": {
        "printingDetails": {
            "machine_settings_id": 1,
            "job_master_id": 1,
            "mounting_tape": "Standard",
            "cylinder_teeth": 500,
            "tension": 31,
            "unwinder": 456,
            "rewinder": 456,
            "infeed": 54,
            "outfeed": 54,
            "static_charge": 54,
            "format_correct": 54
        },
        "printingSubstrateSettings": {
            "print_substrate_id": 1,
            "machine_settings_id": 1,
            "substrate_type": "PET",
            "supplier": "UFlex Ltd.",
            "dyne_level": "42 Dynes",
            "width": 1200,
            "thickness": 12,
            "density": 1.37,
            "gsm": 16
        },
        "stationWiseMetrics": [
            {
                "station_id": 1,
                "station_no": 1,
                "color_pantone": "Pantone Red 032C",
                "lf_value": 65,
                "ink_supplier": "Siegwerk",
                "lpcm": 65,
                "volume": "460ml",
                "uv_led": "LED",
                "uv_led_intensity": ""
            },
            {
                "station_id": 2,
                "station_no": 2,
                "color_pantone": "Pantone Black C",
                "lf_value": 65,
                "ink_supplier": "Flint Group",
                "lpcm": 65,
                "volume": "550ml",
                "uv_led": "UV",
                "uv_led_intensity": ""
            }
        ]
    },
    "masterDataLamination": {
        "laminationConditions": {
            "lamination_id": 1,
            "job_master_id": 1,
            "zone1_temp": 110,
            "zone2_temp": 120,
            "nip_pressure_bar": 3.5,
            "speed": 80,
            "last_set_tension": "2.5 n/mm",
            "rewinder_tension": "",
            "printed_film_tension": "2.5 n/mm",
            "laminate_film_tension": "",
            "viscosity_range": "ADH123",
            "adhesive_gsm": "1.2",
            "composite_gsm": "1.2"
        },
        "laminationSubstrate": {
            "substrate_id": 1,
            "lamination_id": 1,
            "substrate_type": "ALU Foil",
            "supplier": "Huhtamaki",
            "dyne_level": "38 Dynes",
            "width": 1200,
            "thickness": 7,
            "density": 2.11,
            "gsm": 15.8
        },
        "bondingMaterials": [
            {
                "bonding_id": 1,
                "lamination_id": 1,
                "type": "Adhesive",
                "code": "ADH123",
                "brand": "Henkel",
                "ratio": 1.2
            },
            {
                "bonding_id": 2,
                "lamination_id": 1,
                "type": "Hardener",
                "code": "ADH123",
                "brand": "Henkel",
                "ratio": 1.2
            },
            {
                "bonding_id": 3,
                "lamination_id": 1,
                "type": "Ethyl Acetate",
                "code": "ADH123",
                "brand": "Henkel",
                "ratio": 1.2
            }
        ]
    },
    "masterDataDyeCutting": {
        "dye_cutting_id": 1,
        "job_master_id": 1,
        "machine_type": "Rotary Dye",
        "machine_name": "Bobst Flexo",
        "dye_code": "Dye-56789",
        "run_speed": 100
    }
}