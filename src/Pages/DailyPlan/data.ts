export const stats = [
    { title: "Total Jobs", value: 2000 },
    { title: "Lamination Jobs", value: 1140 },
    { title: "Non-Lamination Jobs", value: 860 },
    { title: "New Jobs Added", value: 674 },
];

export const dailyJobmetricsResponse = {
    "statusCode": 200,
    "message": "Data Successfully Fetched",
    "payload": null,
    "data": {
        "totalJobs": 2,
        "nonLaminationJobs": 1,
        "laminationJobs": 1,
        "totalCustomers": null,
        "newJobs": 0
    }
}

export const dailyJobsListMockResp= {
    "statusCode": 200,
    "statusMessage": "Fetched data successfully",
    "totalRecords": 2,
    "data": [
        {
            "unitEffectivityNumber": "20240801",
            "jobRunDate": "2025-04-13T05:30:00",
            "createdAt": "2025-04-13T05:30:00",
            "updatedAt": "2025-04-15T12:57:06",
            "masterVersionNo": 1,
            "jobType": "Repeat",
            "labelType": "Thin Walls",
            "status": "Completed",
            "indentNumber": "1962",
            "customerName": null,
            "brandNamePack": null,
            "ppcIndentQty": null,
            "targetLabelsQty": 5437,
            "targetFilmMtrs": null,
            "filmRequiredForPrinting": null,
            "jarCap": null,
            "date": null,
            "shift": "Morning",
            "workOrderNumber": null,
            "jobMasterId": null
        },
        {
            "unitEffectivityNumber": "20240801",
            "jobRunDate": "2025-04-15T05:30:00",
            "createdAt": "2025-04-15T08:13:37",
            "updatedAt": "2025-04-15T12:57:07",
            "masterVersionNo": 2,
            "jobType": "Repeat",
            "labelType": "Lamination",
            "status": "In progress",
            "indentNumber": "1962/A",
            "customerName": null,
            "brandNamePack": null,
            "ppcIndentQty": null,
            "targetLabelsQty": 2738,
            "targetFilmMtrs": null,
            "filmRequiredForPrinting": null,
            "jarCap": null,
            "date": null,
            "shift": "Morning",
            "workOrderNumber": null,
            "jobMasterId": null
        }
    ]
}

export const data = [
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d1',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 21",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d2',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 22",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d3',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 23",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d4',
        uen: "UEN-20240802",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 24",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d5',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 25",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d6',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 26",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d7',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 27",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d8',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 28",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5d9',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 29",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5da',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 30",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5db',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 31",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5dc',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 32",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5dd',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 33",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5de',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 34",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5df',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 35",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e0',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 36",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e1',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 37",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e2',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 38",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e3',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 39",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e4',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 40",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e5',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 41",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e6',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 42",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e7',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 43",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e8',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 44",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5e9',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Hero - Hero Corporation" },
        version: 8861,
        masterDataVersion: "version 45",
        segment: "LB",
        createdOn: "28/10/2012",
        lastUpdated: "1 hour ago",
        lastExecuted: "28/10/2012",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5ea',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Tech - Technologies Co." },
        version: 9151,
        masterDataVersion: "version 46",
        segment: "TW",
        createdOn: "18/09/2016",
        lastUpdated: "3 hours ago",
        lastExecuted: "18/09/2016",
    },
    {
        _id: '65f8a1b2e4b1a3d9a8f3c5eb',
        uen: "UEN-20240801",
        customer: { image: "", customer: "Gen - General Enterprise" },
        version: 5626,
        masterDataVersion: "version 47",
        segment: "QP",
        createdOn: "07/05/2016",
        lastUpdated: "2 hours ago",
        lastExecuted: "07/05/2016",
    },
];

export const tapeColumns = [
    { id: "stationNo", label: "Station No" },
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
    { id: "5", label: "5" },
    { id: "6", label: "6" },
    { id: "7", label: "7" },
    { id: "8", label: "8" },
    { id: "9", label: "9" },
    { id: "10", label: "10" },
];

export const tapeRows = [
    {
        stationNo: "soft",
        1: "--",
        2: "--",
        3: "--",
        4: "--",
        5: "--",
        6: "--",
        7: "--",
        8: "--",
        9: "--",
        10: "--",
    },
    {
        stationNo: "Medium",
        1: "--",
        2: "--",
        3: "--",
        4: "--",
        5: "--",
        6: "--",
        7: "--",
        8: "--",
        9: "--",
        10: "--",
    },
    {
        stationNo: "Hard",
        1: "--",
        2: "--",
        3: "--",
        4: "--",
        5: "--",
        6: "--",
        7: "--",
        8: "--",
        9: "--",
        10: "--",
    }
]


export const analoxColumns = [
    { id: "parameter", label: "Parameter" },
    { id: "station1", label: "Station 1" },
    { id: "station2", label: "Station 2" },
    { id: "station3", label: "Station 3" },
    { id: "station4", label: "Station 4" },
    { id: "station5", label: "Station 5" },
    { id: "station6", label: "Station 6" },
    { id: "station7", label: "Station 7" },
    { id: "station8", label: "Station 8" },
    { id: "station9", label: "Station 9" },
    { id: "station10", label: "Station 10" },
];

export const analoxData = [
    {
        parameter: "LPCM",
        station1: 23,
        station2: 23,
        station3: 23,
        station4: 23,
        station5: 23,
        station6: 23,
        station7: 23,
        station8: 23,
        station9: 23,
        station10: 23,
    },
    {
        parameter: "Vol.",
        station1: 36,
        station2: 36,
        station3: 36,
        station4: 36,
        station5: 36,
        station6: 36,
        station7: 36,
        station8: 36,
        station9: 36,
        station10: 36,
    },
];

export const materialColumns = [
    { id: "widthMm", label: "Width(mm)" },
    { id: "thicknessMicrons", label: "Thickness(Microns)" },
    { id: "gsm", label: "GSM" },
    { id: "dyne", label: "DYNE" },
];

export const materialData = [
    {
        widthMm: "623",
        thicknessMicrons: "623",
        gsm: "623",
        dyne: "623",
    },
];

export const plateMountingReport = [
    { label: "Plates Inspection", value: "721" },
    { label: "Mounter", value: "21426152" },
    { label: "Approver", value: "564" },
    { label: "Ink Kitchen Supervisor", value: "--" },
    { label: "Shift Supervisor Report", value: "--" },
    { label: "Shift QC Incharge", value: "-" }
];



export const printingMCData = [
    { label: "Plain Film Weight Per Repeat", value: "12112" },
    { label: "Printed Film Weight Per Repeat", value: "21426152" },
    { label: "Ink Weight Per Repeat", value: "564" },
    { label: "Printing M/C Name", value: "--" },
    { label: "Left Over Roll Meters", value: "3267" },
    { label: "Left Over Roll Kg’s", value: "JAR" },
    { label: "Operator", value: "--" },
    { label: "Shift Qc", value: "-" },
    { label: "Supervisor", value: "--" },
    { label: "Remarks", value: "--" }
];

export const printingColumns = [
    { id: "category", label: "Category",edit: false },
    { id: "target", label: "Target" , edit: true},
    { id: "actuals", label: "Actuals",edit: true },
];

export const printingData = [
    {
        category: "Total Printing",
        target: "23",
        actuals: "23"
    },
    {
        category: "Total Printing Process Waste",
        target: "23",
        actuals: "23"
    },
    {
        category: "Inspection Wastage",
        target: "--",
        actuals: "--"
    },
    {
        category: "Printed Film Issued For Next Process",
        target: "23",
        actuals: "23"
    }
];

export const jobDetails = [
    { label: "Job Starting Time", value: "21-Sep-2025" },
    { label: "Completion Time", value: "--" },
    { label: "Total Printing Time", value: "5234" },
    { label: "Operator", value: "Nick" },
    { label: "Supervisor", value: "John" },
    { label: "HOD", value: "Peter" },

];

export const laminationColumns = [
    { id: "category", label: "Category" , edit:false},
    { id: "target", label: "Target", edit:true },
    { id: "actuals", label: "Actuals", edit:true },
];

export const laminationData = [
    {
        category: "Total Laminate",
        target: "23",
        actuals: "23"
    },
    {
        category: "Lamination Process Waste",
        target: "23",
        actuals: "23"
    },
    {
        category: "Inspection Wastage",
        target: "--",
        actuals: "--"
    },
    {
        category: "Laminate Film Issued For Next Process",
        target: "23",
        actuals: "23"
    }
];

export const labelCuttingColumns = [
    { id: "category", label: "Category", edit:false },
    { id: "target", label: "Target" ,edit:false},
    { id: "actuals", label: "Actuals", edit:true },
];

export const labelCuttingData = [
    {
        category: "Printed Film Issued For Label Cutting",
        target: "23",
        actuals: "23"
    },
    {
        category: "Total Cutting Process Waste",
        target: "23",
        actuals: "23"
    },
    {
        category: "Output Labels Qty",
        target: "--",
        actuals: "--"
    }
];

export const jobMetadata = [
    { label: "Effectivity Unit Number", value: "UEN-20240801" },
    { label: "Indent Number", value: "21426152" },
    { label: "Customer Name", value: "Nestlé" },
    { label: "Brand Name and Pack Size", value: "KitKat 50g Wrapper" },
    { label: "PPC Indent Qty", value: "6123512" },
    { label: "Target Labels Qty", value: "6123512" },
    { label: "Target Film Mtrs", value: "5234" },
    { label: "Film Required For Printing", value: "3267" },
    { label: "JAR/CAP", value: "JAR" },
    { label: "Date", value: "8-Sep-2025" },
    { label: "Shift", value: "Morning" },
    { label: "Work Order Number", value: "233443" }
];

export const labelDispatchColums = [
    { id: "requiredLabelsForDispatch", label: "REQUIRED LABELS FOR DISPATCH", edit:true },
    { id: "dispatchedLabels", label: "DISPATCHED LABELS" , edit:true},
    { id: "balanceLabels", label: "BALANCE LABELS", edit:true },
    { id: "hodComments", label:"HOD Comments", edit:true}
]

export const labelDispatchRows = [
    {
        required: '--',
        dispatched: '--',
        balance: '--',
        HODcomments:'--'
    }
]

export const machineSpecsColumns = [
    { id: "machineName", label: "Machine Name" , edit: false},
    { id: "dieToolCode", label: "Die tool Code", edit: false },
    { id: "machineSpeed", label: "Machine Speed", edit: false },
]

export const machineSpecsRows = [
    { machineName:"--",
      dieToolCode:"NCP091",
      machineSpeed:"290 revolutions/min"
    },
    { machineName:"--",
        dieToolCode:"NCP091",
        machineSpeed:"290 revolutions/min"
      },
      { machineName:"--",
        dieToolCode:"NCP091",
        machineSpeed:"290 revolutions/min"
      },
]

export const productionColumns = [
    { id: 'particular', label: 'Particular' ,edit:false },
    { id: 'target', label: 'Target' ,edit:true},
    { id: 'actual', label: 'Actual' , edit:true},
  ];



  export const productionData = [
    { category: "STARTING TIME", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "COMPLETION TIME", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "TOTAL TIME", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "INPUT FILM LAMINATED", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "SET UP WASTAGE Mtrs", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "IN-PROCESS WASTAGE Mtrs", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "TOTAL CUTTING WASTAGE Mtrs", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "LEFT OVER LAMINATE LABELS Mtrs", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "OUTPUT LABELS Qty", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) },
    { category: "OPERATOR", target: Math.floor(Math.random() * 100), actual: Math.floor(Math.random() * 100) }
];

  export const approvalColumns = [
    { id: "supervisorApproval", label: "SUPERVISOR APPROVAL" , edit: true},
    { id: "qcApproval", label: "QC APPROVAL", edit: true },
    { id: "inchargeComments", label: "INCHARGE COMMENTS", edit: true },
    { id: "remarks", label: "REMARKS", edit: true} // Added new column at the end
  ];
  
  export const approvalData = [
    {
      supervisorApproval: "John doe",
      qcApproval: "0.5",
      inchargeComments: "0.4",
      remarks: "" // Empty remarks field
    },
  ];

